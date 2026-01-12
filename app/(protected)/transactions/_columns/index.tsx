"use client";

import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-bidge";
import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@/types/transaction";
import {
  TRANSACTION_PAYMENT_METHOD_LABELS,
  TRANSACTIONS_CATEGORY_LABELS,
} from "@/app/_constants/transactions";
import { EditTransactionButton } from "../_components/edit-transaction-button";
import { DeleteTransactionButton } from "../_components/delete-transaction-button";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => TRANSACTIONS_CATEGORY_LABELS[row.original.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[row.original.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) =>
      row.original.date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(transaction.amount),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <EditTransactionButton transaction={row.original} />
          <DeleteTransactionButton transaction={row.original} />
        </div>
      );
    },
  },
];
