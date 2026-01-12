import { TRANSACTIONS_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TotalExpensePerCategory } from "@/types/transaction-percentage";

interface ExpensesPerCategoryProps {
  totalExpensePerCategory: TotalExpensePerCategory[];
}

export default function ExpensesPerCategory({ totalExpensePerCategory }: ExpensesPerCategoryProps) {
  return (
    <>
    <ScrollArea className="col-span-2 rounded-md border p-6 h-full">
      <CardHeader>
        <CardTitle>
          Gastos por Categoria
        </CardTitle>

        <CardContent className="space-y-6">
        {totalExpensePerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTIONS_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
      </CardHeader>
    </ScrollArea>
    </>
  );
}