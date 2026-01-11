"use server";

import { z } from "zod";
import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

const inputSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date(),
});

export const createTransaction = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { name, amount, type, category, paymentMethod, date } = parsedInput;

    const transaction = await prisma.transaction.create({
      data: {
        name,
        type,
        amount,
        category,
        paymentMethod,
        date,
        userId: user.id,
      },
    });

    revalidatePath("/transactions");

    return {
      ...transaction,
      amount: transaction.amount.toNumber(),
    };
  });
