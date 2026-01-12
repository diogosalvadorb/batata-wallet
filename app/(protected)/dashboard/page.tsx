import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { TransactionChart } from "./_components/transaction-chart";
import { getDashBoardData } from "@/data/transactions";

interface DashboardPageProps {
  searchParams: Promise<{
    month?: string;
  }>;
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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid grid-cols-[2fr,1fr] gap-6 max-w-[1280px]">
        <div className="flex flex-col gap-6">
          <SummaryCards month={currentMonth} {...dashboard} />
          <div className="grid grid-cols-3 gap-6">
            <TransactionChart {...dashboard} />
          </div>
        </div>
      </div>
    </div>
  );
}
