import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { transactionsColumns } from "./_columns";
import { DataTable } from "../_components/data-table";
import { getTransactions } from "@/data/transactions";
import { CreateTransactionButton } from "../_components/create-transaction-button";

export default async function TransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const transactions = await getTransactions(session.user.id);

  return (
    <div className="space-y-6 p-6">
      {/* Titulo */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <CreateTransactionButton />
      </div>
      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
}
