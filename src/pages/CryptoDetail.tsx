
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Info, BarChart3, LineChart, Calendar, RefreshCw, Bitcoin } from "lucide-react";
import CryptoChart from "@/components/crypto/CryptoChart";
import { getCryptoData, CryptoData } from "@/services/marketDataService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const CryptoDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chartDays, setChartDays] = useState<number>(30);
  
  // Get crypto data with React Query for automatic refreshing
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cryptoDetail', symbol],
    queryFn: async () => {
      const allCryptos = await getCryptoData();
      // Filter to find the specific crypto
      const crypto = allCryptos.find(crypto => 
        crypto.symbol === symbol || 
        `${crypto.symbol}-USD` === symbol
      );
      
      if (crypto) {
        setCryptoData(crypto);
      } else {
        toast.error(`No data found for ${symbol}`);
      }
      
      return crypto || null;
    },
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000,
  });

  // Manual refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const displaySymbol = symbol || '';
  const isPositive = cryptoData?.change ? cryptoData.change > 0 : false;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          {cryptoData?.image ? (
            <img src={cryptoData.image} alt={cryptoData.name} className="h-8 w-8 rounded-full" />
          ) : (
            <Bitcoin className="h-6 w-6 text-primary" />
          )}
          <div>
            <h1 className="text-2xl font-bold">{cryptoData?.name || 'Loading...'}</h1>
            <p className="text-muted-foreground">Crypto: {displaySymbol}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold">
            {isLoading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
            ) : (
              `$${cryptoData?.price.toFixed(2) || '0.00'}`
            )}
          </div>
          <div className="flex items-center gap-1">
            {isLoading ? (
              <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
            ) : (
              <>
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
                  {cryptoData?.change.toFixed(2) || '0.00'} ({cryptoData?.percentChange.toFixed(2) || '0.00'}%)
                </span>
              </>
            )}
          </div>
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
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="font-medium">
              {isLoading ? (
                <div className="h-5 w-16 animate-pulse rounded bg-muted"></div>
              ) : (
                `$${(cryptoData?.marketCap || 0).toLocaleString()}`
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="font-medium">
              {isLoading ? (
                <div className="h-5 w-16 animate-pulse rounded bg-muted"></div>
              ) : (
                `$${(cryptoData?.volume24h || 0).toLocaleString()}`
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Change (24h)</p>
            <p className={`font-medium ${isPositive ? "text-profit" : "text-loss"}`}>
              {isLoading ? (
                <div className="h-5 w-16 animate-pulse rounded bg-muted"></div>
              ) : (
                `${isPositive ? "+" : ""}${cryptoData?.percentChange.toFixed(2) || '0.00'}%`
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Updated</p>
            <p className="font-medium text-sm">
              {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="chart" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>Chart</span>
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>Info</span>
          </TabsTrigger>
          <TabsTrigger value="markets" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Markets</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant={chartDays === 1 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartDays(1)}
                  >
                    1D
                  </Button>
                  <Button 
                    variant={chartDays === 7 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartDays(7)}
                  >
                    1W
                  </Button>
                  <Button 
                    variant={chartDays === 30 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartDays(30)}
                  >
                    1M
                  </Button>
                  <Button 
                    variant={chartDays === 90 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartDays(90)}
                  >
                    3M
                  </Button>
                  <Button 
                    variant={chartDays === 365 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartDays(365)}
                  >
                    1Y
                  </Button>
                </div>
              </div>
              <CryptoChart symbol={displaySymbol} days={chartDays} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="info" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>About {cryptoData?.name}</CardTitle>
              <CardDescription>Cryptocurrency Information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Information about {cryptoData?.name} will be displayed here.
                This can include whitepaper details, use cases, technology, and more.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="markets" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Markets</CardTitle>
              <CardDescription>Where to buy or sell {cryptoData?.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Exchange</th>
                      <th className="pb-2 text-right font-medium">Pair</th>
                      <th className="pb-2 text-right font-medium">Price</th>
                      <th className="pb-2 text-right font-medium">24h Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3">Binance</td>
                      <td className="py-3 text-right">{cryptoData?.symbol}/USDT</td>
                      <td className="py-3 text-right">${cryptoData?.price.toFixed(2)}</td>
                      <td className="py-3 text-right">$10,245,678</td>
                    </tr>
                    <tr>
                      <td className="py-3">Coinbase</td>
                      <td className="py-3 text-right">{cryptoData?.symbol}/USD</td>
                      <td className="py-3 text-right">${(cryptoData?.price || 0) * 0.99}</td>
                      <td className="py-3 text-right">$8,765,432</td>
                    </tr>
                    <tr>
                      <td className="py-3">Kraken</td>
                      <td className="py-3 text-right">{cryptoData?.symbol}/EUR</td>
                      <td className="py-3 text-right">€{((cryptoData?.price || 0) * 0.92).toFixed(2)}</td>
                      <td className="py-3 text-right">$5,643,789</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CryptoDetail;
