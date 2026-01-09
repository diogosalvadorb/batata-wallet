"use server";

import { z } from "zod";
import { actionClient } from "@/lib/action-client";
import { returnValidationErrors } from "next-safe-action";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Schema de validação para o registro
const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const register = actionClient
  .inputSchema(registerSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, password } = parsedInput;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      returnValidationErrors(registerSchema, {
        _errors: ["Este email já está cadastrado."],
      });
    }

    // Criar usuário usando better-auth
    try {
      const result = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
        headers: await headers(),
      });

      if (!result) {
        returnValidationErrors(registerSchema, {
          _errors: ["Erro ao criar conta."],
        });
      }

      // implemente a verificação de email posteriormente
      if (result.user?.id) {
        await prisma.user.update({
          where: { id: result.user.id },
          data: { emailVerified: true },
        });
      }

      return {
        success: true,
        message: "Conta criada com sucesso!",
        user: result.user,
      };
    } catch (error) {
      returnValidationErrors(registerSchema, {
        _errors: [
          error instanceof Error
            ? error.message
            : "Erro ao criar conta. Tente novamente.",
        ],
      });
    }
  });
