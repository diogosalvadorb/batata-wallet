"use client";

import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-bidge";
import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@/types/transaction";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import { TRANSACTION_PAYMENT_METHOD_LABELS, TRANSACTIONS_CATEGORY_LABELS } from "@/app/_constants/transactions";



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
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
