"use server";

import { prisma } from "@/lib/prisma";

export async function getTransactions() {
  const transactions = await prisma.transaction.findMany({});

  return transactions;
}
