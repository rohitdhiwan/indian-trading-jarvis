
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Info, BarChart3, LineChart, Calendar, Clock } from "lucide-react";
import StockChart from "@/components/stock/StockChart";
import StockCompanyInfo from "@/components/stock/StockCompanyInfo";
import StockFinancials from "@/components/stock/StockFinancials";
import StockNews from "@/components/stock/StockNews";
import TradingStrategies from "@/components/stock/TradingStrategies";

// Mock stock data
const stockData = {
  symbol: "RELIANCE",
  name: "Reliance Industries Ltd",
  price: 2885.20,
  change: 48.75,
  changePercent: 1.72,
  open: 2840.00,
  high: 2895.50,
  low: 2835.25,
  volume: "3.24M",
  pe: 22.8,
  marketCap: "19.55L Cr",
  yearHigh: 2950.00,
  yearLow: 2195.00,
};

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const displaySymbol = symbol || stockData.symbol;
  
  // In a real app, we would fetch stock data based on the symbol parameter
  const isPositive = stockData.change > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{stockData.name}</h1>
          <p className="text-muted-foreground">NSE: {displaySymbol}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold">₹{stockData.price.toFixed(2)}</div>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-profit" />
            ) : (
              <TrendingDown className="h-4 w-4 text-loss" />
            )}
            <span
              className={`font-medium ${
                isPositive ? "text-profit" : "text-loss"
              }`}
            >
              {isPositive ? "+" : ""}
              {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Open</p>
            <p className="font-medium">₹{stockData.open.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">High</p>
            <p className="font-medium">₹{stockData.high.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Low</p>
            <p className="font-medium">₹{stockData.low.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="font-medium">{stockData.volume}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="chart" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>Chart</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="company-info" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>Company Info</span>
          </TabsTrigger>
          <TabsTrigger value="financials" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Financials</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>News</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">1D</Button>
                  <Button variant="outline" size="sm">1W</Button>
                  <Button variant="outline" size="sm">1M</Button>
                  <Button variant="outline" size="sm">3M</Button>
                  <Button variant="outline" size="sm">1Y</Button>
                  <Button variant="outline" size="sm">5Y</Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Custom</span>
                  </Button>
                </div>
              </div>
              <StockChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies" className="mt-4">
          <TradingStrategies stockSymbol={displaySymbol} />
        </TabsContent>
        
        <TabsContent value="company-info" className="mt-4">
          <StockCompanyInfo stockSymbol={displaySymbol} />
        </TabsContent>
        
        <TabsContent value="financials" className="mt-4">
          <StockFinancials stockSymbol={displaySymbol} />
        </TabsContent>
        
        <TabsContent value="news" className="mt-4">
          <StockNews stockSymbol={displaySymbol} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetail;
