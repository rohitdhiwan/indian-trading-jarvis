
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from "lucide-react";
import { getMarketIndices, MarketIndex, isMarketOpen } from "@/services/marketDataService";
import { useQuery } from "@tanstack/react-query";

const MarketSummary = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Fetch market indices with automatic refetching if market is open
  const { data: marketIndices = [], isLoading, refetch } = useQuery({
    queryKey: ['marketIndices'],
    queryFn: getMarketIndices,
    refetchInterval: isMarketOpen() ? 60000 : false, // Refresh every minute if market is open
    staleTime: 30000,
  });

  // Manually refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Set up refresh timer if market is open
  useEffect(() => {
    if (isMarketOpen()) {
      const interval = setInterval(() => {
        refetch();
      }, 60000); // Refresh every minute
      
      return () => clearInterval(interval);
    }
  }, [refetch]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {isMarketOpen() ? (
            <span className="flex items-center">
              <span className="text-profit mr-1">Market Open</span>
              <span className="h-2 w-2 rounded-full bg-profit animate-pulse"></span>
            </span>
          ) : (
            <span className="flex items-center">
              <span className="text-loss mr-1">Market Closed</span>
              <span className="h-2 w-2 rounded-full bg-loss"></span>
            </span>
          )}
        </p>
        <button 
          onClick={handleRefresh} 
          className="text-xs text-primary hover:underline flex items-center"
          disabled={isLoading || isRefreshing}
        >
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {isLoading ? (
          // Loading states
          Array(4).fill(0).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded"></div>
                  <div className="h-6 w-20 bg-muted rounded"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
                <div className="rounded-md bg-muted p-2 h-10 w-10"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual data
          marketIndices.map((index) => (
            <SummaryCard
              key={index.symbol}
              title={index.name}
              value={index.price.toLocaleString('en-IN', { 
                style: index.symbol === "INR=X" ? 'decimal' : 'currency', 
                currency: 'INR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              }).replace('₹', '₹')}
              change={`${index.change >= 0 ? '+' : ''}${index.change.toFixed(2)} (${index.percentChange.toFixed(2)}%)`}
              isPositive={index.change >= 0}
              icon={getIconForIndex(index.symbol)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Helper function to get the appropriate icon for each index
const getIconForIndex = (symbol: string) => {
  switch (symbol) {
    case "^NSEI":
      return <Activity className="h-5 w-5" />;
    case "^BSESN":
      return <BarChart3 className="h-5 w-5" />;
    case "^NSEBANK":
      return <BarChart3 className="h-5 w-5" />;
    case "INR=X":
      return <DollarSign className="h-5 w-5" />;
    default:
      return <Activity className="h-5 w-5" />;
  }
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
