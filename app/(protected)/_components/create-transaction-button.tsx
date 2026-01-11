"use client";

import { useState } from "react";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";

export function CreateTransactionButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div className="inline-flex">
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar Transação
        <ArrowDownUpIcon className="size-4" />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </div>
  );
}
