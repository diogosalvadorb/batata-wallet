"use server";

import { prisma } from "@/lib/prisma";
import { Transaction } from "@/types/transaction";

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await prisma.transaction.findMany({});

  return transactions.map(transaction => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));
}