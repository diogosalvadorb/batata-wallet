import {
  PrismaClient,
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "crypto";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function seedDatabase() {
  try {
    const userId = "XFK6HhSj15GIdJHXEYZWrwvx5GMfe1XJ";

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado no banco");
    }

    const existingAccount = await prisma.account.findFirst({
      where: {
        accountId: "credentials-diogo",
        providerId: "credentials",
        userId,
      },
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          id: randomUUID(),
          accountId: "credentials-diogo",
          providerId: "credentials",
          scope: "email",
          userId,
        },
      });
    }

    const transactions = [
      {
        name: "Salário",
        type: TransactionType.DEPOSIT,
        category: TransactionCategory.SALARY,
        paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
        amount: 9500.0,
        date: new Date("2026-01-05"),
      },
      {
        name: "Aluguel",
        type: TransactionType.EXPENSE,
        category: TransactionCategory.HOUSING,
        paymentMethod: TransactionPaymentMethod.PIX,
        amount: 2500.0,
        date: new Date("2026-01-06"),
      },
      {
        name: "Supermercado",
        type: TransactionType.EXPENSE,
        category: TransactionCategory.FOOD,
        paymentMethod: TransactionPaymentMethod.DEBIT_CARD,
        amount: 720.35,
        date: new Date("2026-01-08"),
      },
      {
        name: "Internet + Energia",
        type: TransactionType.EXPENSE,
        category: TransactionCategory.UTILITY,
        paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
        amount: 310.9,
        date: new Date("2026-01-10"),
      },
      {
        name: "Academia",
        type: TransactionType.EXPENSE,
        category: TransactionCategory.HEALTH,
        paymentMethod: TransactionPaymentMethod.PIX,
        amount: 139.9,
        date: new Date("2026-01-11"),
      },
      {
        name: "Aporte ETF (IVVB11)",
        type: TransactionType.INVESTMENT,
        category: TransactionCategory.OTHER,
        paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
        amount: 1500.0,
        date: new Date("2026-01-15"),
      },
      {
        name: "Uber/Transporte",
        type: TransactionType.EXPENSE,
        category: TransactionCategory.TRANSPORTATION,
        paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
        amount: 85.5,
        date: new Date("2026-01-18"),
      },
      {
        name: "Cinema + Pipoca",
        type: TransactionType.EXPENSE,
        category: TransactionCategory.ENTERTAINMENT,
        paymentMethod: TransactionPaymentMethod.DEBIT_CARD,
        amount: 45.0,
        date: new Date("2026-01-20"),
      },
      {
        name: "Curso Online",
        type: TransactionType.EXPENSE,
        category: TransactionCategory.EDUCATION,
        paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
        amount: 299.0,
        date: new Date("2026-01-22"),
      },
      {
        name: "Freelance - Projeto Web",
        type: TransactionType.DEPOSIT,
        category: TransactionCategory.SALARY,
        paymentMethod: TransactionPaymentMethod.PIX,
        amount: 2000.0,
        date: new Date("2026-01-25"),
      },
    ];

    await prisma.transaction.createMany({
      data: transactions.map((t) => ({
        ...t,
        userId,
      })),
    });

    console.log("Seed executado com sucesso!");
  } catch (error) {
    console.error("Erro no seed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
