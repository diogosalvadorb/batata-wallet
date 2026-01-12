import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";
import { CreateTransactionButton } from "../../_components/create-transaction-button";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

export default function SummaryCard({ icon, title, amount, size = "small" }: SummaryCardProps) {
  return (
    <Card className={size === "large" ? "bg-white/15" : ""}>
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && <CreateTransactionButton />}
      </CardContent>
    </Card>
  );
}
