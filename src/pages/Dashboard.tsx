
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LineChart, Activity, BarChart3, Info } from "lucide-react";
import MarketOverview from "@/components/dashboard/MarketOverview";
import MarketSummary from "@/components/dashboard/MarketSummary";
import WatchlistPreview from "@/components/dashboard/WatchlistPreview";
import RecentStrategies from "@/components/dashboard/RecentStrategies";
import NewsWidget from "@/components/dashboard/NewsWidget";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trading Dashboard</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">NSE Market:</span>
          <span className="font-semibold text-profit">Open</span>
          <div className="h-2 w-2 rounded-full bg-profit animate-pulse"></div>
        </div>
      </div>

      <MarketSummary />
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MarketOverview />
        <WatchlistPreview />
        <NewsWidget />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RecentStrategies />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Trade Recommendations</CardTitle>
            <CardDescription>Based on your preferences and market analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-accent p-1.5">
                    <TrendingUp className="h-4 w-4 text-profit" />
                  </div>
                  <div>
                    <p className="font-medium">HDFC Bank</p>
                    <p className="text-xs text-muted-foreground">NSE: HDFCBANK</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹1,642.75</p>
                  <p className="text-xs text-profit">+2.15%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Swing Trade • 3-5 days • Target: ₹1,720</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-accent p-1.5">
                    <TrendingDown className="h-4 w-4 text-loss" />
                  </div>
                  <div>
                    <p className="font-medium">Tata Motors</p>
                    <p className="text-xs text-muted-foreground">NSE: TATAMOTORS</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹952.50</p>
                  <p className="text-xs text-loss">-1.32%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Intraday • Sell • Target: ₹940</p>
            </div>
            
            <div className="flex justify-center pt-2">
              <a href="/assistant" className="text-sm text-primary underline">View all recommendations</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
