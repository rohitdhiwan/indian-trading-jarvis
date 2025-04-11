
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Info, BarChart3, LineChart, Calendar, Clock, RefreshCw } from "lucide-react";
import StockChart from "@/components/stock/StockChart";
import StockCompanyInfo from "@/components/stock/StockCompanyInfo";
import StockFinancials from "@/components/stock/StockFinancials";
import StockNews from "@/components/stock/StockNews";
import TradingStrategies from "@/components/stock/TradingStrategies";
import { getStockQuote, isMarketOpen } from "@/services/marketDataService";
import { useQuery } from "@tanstack/react-query";

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const displaySymbol = symbol || '';
  
  // Fetch real-time stock data using React Query
  const { data: stockData, isLoading, refetch } = useQuery({
    queryKey: ['stockDetail', displaySymbol],
    queryFn: async () => {
      // First try to get real data from API
      const realData = await getStockQuote(displaySymbol);
      
      if (realData) {
        return {
          symbol: realData.symbol,
          name: realData.companyName,
          price: realData.currentPrice,
          change: realData.change,
          changePercent: realData.percentChange,
          open: realData.open,
          high: realData.high,
          low: realData.low,
          volume: `${(realData.volume / 1000000).toFixed(2)}M`,
          pe: 22.8, // Mock data for fields not provided by API
          marketCap: "19.55L Cr",
          yearHigh: realData.high,
          yearLow: realData.low,
        };
      }
      
      // Fallback to mock data if API fails
      return {
        symbol: displaySymbol,
        name: `${displaySymbol} Stock`,
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
    },
    refetchInterval: isMarketOpen() ? 60000 : false, // Refresh every minute if market is open
    staleTime: 30000,
  });
  
  // Manual refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  
  const isPositive = stockData?.change ? stockData.change > 0 : false;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {isLoading ? (
            <>
              <div className="h-8 w-48 animate-pulse rounded bg-muted mb-2"></div>
              <div className="h-5 w-32 animate-pulse rounded bg-muted"></div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{stockData?.name}</h1>
              <p className="text-muted-foreground">NSE: {displaySymbol}</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-end">
          {isLoading ? (
            <>
              <div className="h-8 w-24 animate-pulse rounded bg-muted mb-2"></div>
              <div className="h-5 w-32 animate-pulse rounded bg-muted"></div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">₹{stockData?.price.toFixed(2)}</div>
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
                  {stockData?.change.toFixed(2)} ({stockData?.changePercent.toFixed(2)}%)
                </span>
              </div>
            </>
          )}
          <button 
            onClick={handleRefresh} 
            className="text-xs text-primary hover:underline flex items-center mt-2"
            disabled={isLoading || isRefreshing}
          >
            {isRefreshing ? (
              <RefreshCw className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <RefreshCw className="h-3 w-3 mr-1" />
            )}
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {isLoading ? (
          // Loading state for cards
          Array(4).fill(0).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">Loading...</p>
                <div className="h-5 w-16 animate-pulse rounded bg-muted mt-1"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual data
          <>
            <Card>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">Open</p>
                <p className="font-medium">₹{stockData?.open.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">High</p>
                <p className="font-medium">₹{stockData?.high.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">Low</p>
                <p className="font-medium">₹{stockData?.low.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-medium">{stockData?.volume}</p>
              </CardContent>
            </Card>
          </>
        )}
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
