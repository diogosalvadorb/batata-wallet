export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  EXPENSE = "EXPENSE",
  INVESTMENT = "INVESTMENT",
}

export enum TransactionCategory {
  HOUSING = "HOUSING",
  TRANSPORTATION = "TRANSPORTATION",
  FOOD = "FOOD",
  ENTERTAINMENT = "ENTERTAINMENT",
  HEALTH = "HEALTH",
  UTILITY = "UTILITY",
  SALARY = "SALARY",
  EDUCATION = "EDUCATION",
  OTHER = "OTHER",
}

export enum TransactionPaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  BANK_SLIP = "BANK_SLIP",
  CASH = "CASH",
  PIX = "PIX",
  OTHER = "OTHER",
}

export interface Transaction {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CreateTransactionInput {
  name: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  userId: string;
}

export interface UpdateTransactionInput {
  name?: string;
  type?: TransactionType;
  amount?: number;
  category?: TransactionCategory;
  paymentMethod?: TransactionPaymentMethod;
  date?: Date;
}