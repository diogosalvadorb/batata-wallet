"use server";

import { z } from "zod";
import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { isMatch } from "date-fns";

const inputSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
  apiKey: z.string().optional(),
});

export const generateAiReport = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { month, apiKey } = parsedInput;

    // Usa a API key do servidor se disponível, caso contrário usa a do cliente
    const finalApiKey = process.env.OPENAI_API_KEY || apiKey;

    if (!finalApiKey) {
      throw new Error(
        "API key não configurada. Por favor, configure sua API key do OpenAI nas configurações.",
      );
    }

    const openAi = new OpenAI({
      apiKey: finalApiKey,
    });

    const year = new Date().getFullYear();
    const monthNum = parseInt(month, 10);
    const firstDay = new Date(year, monthNum - 1, 1);
    const lastDay = new Date(year, monthNum, 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: firstDay,
          lt: lastDay,
        },
      },
    });

    const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${Number(transaction.amount)}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

    const completion = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
        },
        {
          role: "user",
          content,
        },
      ],
    });

    return completion.choices[0].message.content || "";
  });
