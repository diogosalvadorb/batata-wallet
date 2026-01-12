"use server";

import { prisma } from "@/lib/prisma";
import {
  Transaction,
  TransactionCategory,
  TransactionType,
} from "@/types/transaction";
import {
  TotalExpensePerCategory,
  TransactionPercentage,
} from "@/types/transaction-percentage";

export const getTransactions = async (
  userId: string,
): Promise<Transaction[]> => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
  });

  return transactions.map((transaction) => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));
};

export const getDashBoardData = async (month: string, userId: string) => {
  const year = new Date().getFullYear();
  const monthNum = parseInt(month, 10);

  const firstDay = new Date(year, monthNum - 1, 1);
  const lastDay = new Date(year, monthNum, 1);

  const where = {
    userId,
    date: {
      gte: firstDay,
      lt: lastDay,
    },
  };
  const depositsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const investmentsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const expensesTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );

  const typesPercentage: TransactionPercentage = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[]  = (
    await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: { amount: true },
    })
  ).map((item) => ({
    category: item.category as TransactionCategory,
    totalAmount: Number(item._sum.amount || 0),
    percentageOfTotal: Math.round(
      (Number(item._sum.amount || 0) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
    take: 10,
  });

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: lastTransactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
    })),
  };
};
