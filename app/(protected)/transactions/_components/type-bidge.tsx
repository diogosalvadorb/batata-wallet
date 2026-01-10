import { Badge } from "@/components/ui/badge";
import { Transaction, TransactionType } from "@/types/transaction";

import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

export default function TransactionTypeBadge({
  transaction,
}: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="text-success bg-success/10 font-bold">
        <CircleIcon className="fill-success mr-2" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="text-danger bg-danger/10 font-bold">
        <CircleIcon className="fill-danger mr-2" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-foreground/10 font-bold text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
}
