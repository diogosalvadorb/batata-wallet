"use server";

import { z } from "zod";
import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const inputSchema = z.object({
  id: z.string(),
});

export const deleteTransaction = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { id } = parsedInput;

    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingTransaction) {
      throw new Error("Transação não encontrada ou não autorizada");
    }

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/transactions");
    revalidatePath("/dashboard");

    return { success: true };
  });
