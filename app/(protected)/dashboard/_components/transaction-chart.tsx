"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { TransactionType } from "@/types/transaction"
import { TransactionPercentage } from "@/types/transaction-percentage"
import PercentageItem from "./percentage-item"
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

const chartConfig = {
  [TransactionType.DEPOSIT]: { label: "Depósito", color:"#55B02E" },
  [TransactionType.EXPENSE]: { label: "Despesa", color:"E93030" },
  [TransactionType.INVESTMENT]: { label: "Investimento", color: "#FFFFFF" },
} satisfies ChartConfig

interface TransactionChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentage;
}

export function TransactionChart({ depositsTotal, investmentsTotal, expensesTotal, typesPercentage }: TransactionChartProps) {
  const chartData = [{
    type: TransactionType.DEPOSIT,
    amount: depositsTotal,
    fill: "#55B02E",
  }, 
  {
    type: TransactionType.INVESTMENT,
    amount: investmentsTotal,
    fill: "#FFFFFF",
  }, 
  {
    type: TransactionType.EXPENSE,
    amount: expensesTotal,
    fill: "#E93030",
  }]
  
  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        
        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-green-500" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  )
}
