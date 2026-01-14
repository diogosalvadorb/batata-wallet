import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { TransactionChart } from "./_components/transaction-chart";
import { getDashBoardData } from "@/data/transactions";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { Transaction } from "@/types/transaction";
import AiReportButton from "./_components/ai-report-button";

interface DashboardPageProps {
  searchParams: Promise<{ month?: string; }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const { month } = await searchParams;
  const currentMonth = month || new Date().toISOString().slice(5, 7);
  const monthIsValid = !month || !isMatch(currentMonth, "MM");

  if (monthIsValid) {
    redirect("/dashboard?month=01");
  }

  const dashboard = await getDashBoardData(currentMonth, session.user.id);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
         <div className="flex items-center gap-3">
         <AiReportButton  month={currentMonth} />
         <TimeSelect />
         </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <SummaryCards month={currentMonth} {...dashboard} />

          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            <TransactionChart {...dashboard} />
            <ExpensesPerCategory totalExpensePerCategory={dashboard.totalExpensePerCategory} />
          </div>
        </div>

        <div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </div>
  );
}