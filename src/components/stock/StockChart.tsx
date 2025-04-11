
import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Mock data for the chart
const generateDailyData = () => {
  const data = [];
  const basePrice = 2840;
  let currentPrice = basePrice;
  
  // Generate data for a full trading day (9:15 AM to 3:30 PM)
  const times = [
    "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00",
    "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00",
    "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", 
    "15:15", "15:30"
  ];
  
  times.forEach(time => {
    // Random price movement with some trend
    const change = (Math.random() - 0.48) * 10;
    currentPrice += change;
    data.push({
      time,
      price: currentPrice.toFixed(2)
    });
  });
  
  return data;
};

const stockChartData = generateDailyData();

const StockChart = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={stockChartData} 
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            tickLine={false}
          />
          <YAxis 
            domain={['dataMin - 20', 'dataMax + 20']} 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: 'none', borderRadius: '4px' }}
            itemStyle={{ color: '#9ca3af' }}
            labelStyle={{ color: '#f9fafb', fontWeight: 'bold' }}
            formatter={(value: string) => [`₹${value}`, 'Price']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#22c55e" 
            strokeWidth={2}
            fill="url(#colorPrice)" 
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
