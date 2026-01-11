import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ArrowDownUpIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { transactionsColumns } from "./_columns";
import { DataTable } from "../_components/data-table";
import { getTransactions } from "@/data/transactions";

export default async function TransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const transactions = await getTransactions();

  return (
    <div className="p-6 space-y-6">
      {/* Titulo */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="font-bold rounded-full">
          Adicionar Transação
          <ArrowDownUpIcon className="size-4" />
        </Button>
      </div>
      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
}
