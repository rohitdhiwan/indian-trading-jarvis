
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from "lucide-react";

const MarketSummary = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <SummaryCard
        title="NIFTY 50"
        value="22,523.65"
        change="+0.68%"
        isPositive={true}
        icon={<Activity className="h-5 w-5" />}
      />
      <SummaryCard
        title="SENSEX"
        value="73,954.83"
        change="+0.72%"
        isPositive={true}
        icon={<BarChart3 className="h-5 w-5" />}
      />
      <SummaryCard
        title="NIFTY BANK"
        value="48,235.10"
        change="-0.23%"
        isPositive={false}
        icon={<DollarSign className="h-5 w-5" />}
      />
      <SummaryCard
        title="USD/INR"
        value="83.20"
        change="-0.15%"
        isPositive={false}
        icon={<DollarSign className="h-5 w-5" />}
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const SummaryCard = ({ title, value, change, isPositive, icon }: SummaryCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xl font-bold">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-profit" />
            ) : (
              <TrendingDown className="h-3 w-3 text-loss" />
            )}
            <p className={`text-xs ${isPositive ? "text-profit" : "text-loss"}`}>
              {change}
            </p>
          </div>
        </div>
        <div className="rounded-md bg-accent p-2">{icon}</div>
      </CardContent>
    </Card>
  );
};

export default MarketSummary;
