import { 
  TransactionType, 
  TransactionCategory, 
  TransactionPaymentMethod 
} from "../generated/prisma/enums";

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

export { TransactionType, TransactionCategory, TransactionPaymentMethod };