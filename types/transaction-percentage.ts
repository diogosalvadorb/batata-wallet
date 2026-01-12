import { TransactionType } from "./transaction";

export type TransactionPercentage = {
    [key in TransactionType]: number;

}