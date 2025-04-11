
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface StockFinancialsProps {
  stockSymbol: string;
}

// Mock financial data
const quarterlyRevenue = [
  { quarter: "Q1 FY23", revenue: 2219, profit: 160 },
  { quarter: "Q2 FY23", revenue: 2278, profit: 156 },
  { quarter: "Q3 FY23", revenue: 2402, profit: 172 },
  { quarter: "Q4 FY23", revenue: 2390, profit: 178 },
  { quarter: "Q1 FY24", revenue: 2521, profit: 192 },
  { quarter: "Q2 FY24", revenue: 2398, profit: 175 },
  { quarter: "Q3 FY24", revenue: 2647, profit: 204 },
  { quarter: "Q4 FY24", revenue: 2760, profit: 221 },
];

const incomeStatement = [
  { item: "Revenue", value: "₹9,328.66 Cr" },
  { item: "EBITDA", value: "₹1,475.43 Cr" },
  { item: "Net Income", value: "₹792.28 Cr" },
  { item: "EPS", value: "₹126.50" },
  { item: "Gross Margin", value: "36.5%" },
  { item: "Operating Margin", value: "18.6%" },
  { item: "Net Profit Margin", value: "8.5%" },
];

const balanceSheet = [
  { item: "Total Assets", value: "₹14,526.32 Cr" },
  { item: "Total Liabilities", value: "₹5,234.51 Cr" },
  { item: "Shareholder's Equity", value: "₹9,291.81 Cr" },
  { item: "Debt to Equity", value: "0.32" },
  { item: "Current Ratio", value: "1.86" },
  { item: "Return on Equity", value: "9.8%" },
  { item: "Return on Assets", value: "6.2%" },
];

const cashFlow = [
  { item: "Operating Cash Flow", value: "₹1,256.78 Cr" },
  { item: "Capital Expenditure", value: "₹-425.36 Cr" },
  { item: "Free Cash Flow", value: "₹831.42 Cr" },
  { item: "Dividends Paid", value: "₹-187.25 Cr" },
  { item: "Cash Flow from Financing", value: "₹-312.45 Cr" },
  { item: "Net Change in Cash", value: "₹331.72 Cr" },
  { item: "Cash Flow Margin", value: "13.5%" },
];

const StockFinancials = ({ stockSymbol }: StockFinancialsProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quarterly Performance</CardTitle>
          <CardDescription>Revenue and profit trends over the last 8 quarters</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={quarterlyRevenue}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis 
                dataKey="quarter" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.95)', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#9ca3af' }}
                labelStyle={{ color: '#f9fafb', fontWeight: 'bold' }}
                formatter={(value: number) => [`₹${value} Cr`, '']}
              />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="revenue" 
                name="Revenue" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                yAxisId="right" 
                dataKey="profit" 
                name="Profit" 
                fill="#22c55e" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="income">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="income">Income Statement</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash">Cash Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="income" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income Statement (TTM)</CardTitle>
              <CardDescription>Trailing Twelve Months Financial Performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {incomeStatement.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <p className="text-sm font-medium">{item.item}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Balance Sheet</CardTitle>
              <CardDescription>Latest quarterly financial position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {balanceSheet.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <p className="text-sm font-medium">{item.item}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cash" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cash Flow Statement (TTM)</CardTitle>
              <CardDescription>Trailing Twelve Months Cash Flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {cashFlow.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <p className="text-sm font-medium">{item.item}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockFinancials;
