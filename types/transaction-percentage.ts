import { TransactionCategory, TransactionType } from "./transaction";

export type TransactionPercentage = {
    [key in TransactionType]: number;

}

export interface TotalExpensePerCategory {
    category: TransactionCategory
    totalAmount: number;
    percentageOfTotal: number;
}