"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpsertTransactionDialog } from "../../_components/upsert-transaction-dialog";
import { Transaction } from "@/types/transaction";

interface EditTransactionButtonProps {
  transaction?: Transaction;
}

export function EditTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon className="h-4 w-4" />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={transaction}
      />
    </div>
  );
}
