
import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getCryptoHistoricalData } from "@/services/marketDataService";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

interface CryptoChartProps {
  symbol: string;
  days?: number;
}

const CryptoChart = ({ symbol, days = 30 }: CryptoChartProps) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['cryptoHistory', symbol, days],
    queryFn: () => getCryptoHistoricalData(symbol, days),
    enabled: !!symbol,
    staleTime: 300000, // 5 minutes
  });

  // Transform data for the chart
  const chartData = data.map(item => ({
    date: item.time ? `${item.date} ${item.time}` : item.date,
    value: item.close
  }));

  return (
    <div className="h-72">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: 'none', borderRadius: '4px' }}
              itemStyle={{ color: '#9ca3af' }}
              labelStyle={{ color: '#f9fafb', fontWeight: 'bold' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, symbol]}
              labelFormatter={(label) => `Date: ${label}`}
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
          No historical data available for {symbol}. Please try again later.
        </div>
      )}
    </div>
  );
};

export default CryptoChart;
