
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart3, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getHistoricalData, StockHistoricalData, isMarketOpen } from "@/services/marketDataService";
import { useQuery } from "@tanstack/react-query";

const MarketOverview = () => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Fetch NIFTY 50 historical data
  const { data: marketData = [], isLoading, refetch } = useQuery({
    queryKey: ['niftyHistorical'],
    queryFn: async () => {
      const data = await getHistoricalData("NIFTY", isMarketOpen() ? 'intraday' : 'daily');
      
      // Transform the data for the chart
      return data.map(item => ({
        date: item.time || item.date,
        value: item.close
      })).reverse(); // Reverse to get chronological order
    },
    refetchInterval: isMarketOpen() ? 300000 : false, // Refresh every 5 minutes if market is open
    staleTime: 60000,
  });

  // Manually refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Market Overview</CardTitle>
          <CardDescription>NIFTY 50 • {isMarketOpen() ? 'Today (Intraday)' : 'Recent Days'}</CardDescription>
        </div>
        <button 
          onClick={handleRefresh} 
          className="text-xs text-primary hover:underline flex items-center"
          disabled={isLoading || isRefreshing}
        >
          {isRefreshing ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-1" />
          ) : null}
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </CardHeader>
      <CardContent className="h-72">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : marketData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={false}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#9ca3af' }}
                labelStyle={{ color: '#f9fafb', fontWeight: 'bold' }}
                formatter={(value: number) => [`${value.toFixed(2)}`, 'NIFTY']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#22c55e" 
                strokeWidth={2}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No market data available. Please try again later.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
