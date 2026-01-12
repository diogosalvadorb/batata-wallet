"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Transaction } from "@/types/transaction";
import { deleteTransaction } from "@/actions/delete-transaction";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transaction: Transaction;
}

export function DeleteTransactionButton({
  transaction,
}: DeleteTransactionButtonProps) {
  const [open, setOpen] = useState(false);
  const { executeAsync: executeDeleteTransaction, isPending } = useAction(
    deleteTransaction,
    {
      onSuccess: () => {
        toast.success("Transação excluída com sucesso");
        setOpen(false);
      },
      onError: ({ error }) => {
        if (error.serverError) {
          toast.error(error.serverError);
        } else {
          toast.error("Erro ao excluir transação");
        }
      },
    },
  );

  const handleDelete = async () => {
    await executeDeleteTransaction({ id: transaction.id });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Transação</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a transação "{transaction.name}"? Esta
            ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-500 text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
