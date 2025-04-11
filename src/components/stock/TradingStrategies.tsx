
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from "lucide-react";

interface TradingStrategiesProps {
  stockSymbol: string;
}

const TradingStrategies = ({ stockSymbol }: TradingStrategiesProps) => {
  return (
    <Tabs defaultValue="intraday">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="intraday">Intraday</TabsTrigger>
        <TabsTrigger value="swing">Swing Trading</TabsTrigger>
        <TabsTrigger value="options">Options</TabsTrigger>
        <TabsTrigger value="backtested">Backtested Results</TabsTrigger>
      </TabsList>
      
      <TabsContent value="intraday" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Recommended Intraday Strategy</CardTitle>
            <CardDescription>Based on technical indicators and market sentiment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-accent p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-profit" />
                  <h3 className="text-lg font-semibold">Buy {stockSymbol}</h3>
                </div>
                <div className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  Confidence: High
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p>Enter on market breakout above ₹2,890 with strict stop loss at ₹2,870.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Entry Price</p>
                    <p className="font-medium">₹2,890.00</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Stop Loss</p>
                    <p className="font-medium text-loss">₹2,870.00 (-0.69%)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Target 1</p>
                    <p className="font-medium text-profit">₹2,920.00 (+1.04%)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Target 2</p>
                    <p className="font-medium text-profit">₹2,950.00 (+2.08%)</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-muted-foreground">Strategy Rationale:</p>
                  <p>The stock is showing strong momentum with increasing volumes. A breakout above the ₹2,890 resistance level with volume confirmation would indicate further upside potential. The risk-to-reward ratio is favorable at 1:2 for the first target.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button className="flex-1">Test in Paper Trading</Button>
              <Button variant="outline" className="flex-1">Save Strategy</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Technical Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">RSI (14)</p>
                <p className="font-medium">58.3</p>
                <p className="text-xs text-muted-foreground">Neutral</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">MACD</p>
                <p className="font-medium text-profit">Bullish</p>
                <p className="text-xs text-muted-foreground">Crossover</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">ADX</p>
                <p className="font-medium">24.2</p>
                <p className="text-xs text-muted-foreground">Moderate Trend</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Bollinger Bands</p>
                <p className="font-medium">Middle Band</p>
                <p className="text-xs text-muted-foreground">Low Volatility</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-medium">Above Avg.</p>
                <p className="text-xs text-profit text-xs">+25% vs 10-day</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Support/Resistance</p>
                <p className="font-medium">Near Resistance</p>
                <p className="text-xs text-muted-foreground">Breakout Potential</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="swing" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Swing Trading Strategy</CardTitle>
            <CardDescription>Hold period: 3-5 trading days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md bg-accent p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-profit" />
                    <h3 className="text-lg font-semibold">Buy {stockSymbol}</h3>
                  </div>
                  <div className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>3-5 Days</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p>Enter on bullish chart pattern completion with strong support levels.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Entry Range</p>
                      <p className="font-medium">₹2,870 - ₹2,890</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Stop Loss</p>
                      <p className="font-medium text-loss">₹2,810 (-2.6%)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Target 1</p>
                      <p className="font-medium text-profit">₹2,950 (+2.4%)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Target 2</p>
                      <p className="font-medium text-profit">₹3,050 (+5.7%)</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-muted-foreground">Upcoming Catalysts:</p>
                    <p>Quarterly results due next week could provide momentum. The stock has historically moved 4-6% on earnings announcements.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button className="flex-1">Test in Paper Trading</Button>
                <Button variant="outline" className="flex-1">Save Strategy</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="options" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Options Strategies</CardTitle>
            <CardDescription>Leverage with managed risk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border p-4 text-center">
              <p className="mb-2 text-muted-foreground">Options strategies for {stockSymbol} will be available soon.</p>
              <Button variant="outline">Notify Me When Available</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="backtested" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Backtested Strategy Performance</CardTitle>
            <CardDescription>Historical performance of AI-recommended strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Strategy</th>
                      <th className="pb-2 text-left font-medium">Period</th>
                      <th className="pb-2 text-right font-medium">Win Rate</th>
                      <th className="pb-2 text-right font-medium">Avg. Return</th>
                      <th className="pb-2 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3">Momentum Breakout</td>
                      <td className="py-3">Intraday</td>
                      <td className="py-3 text-right">68%</td>
                      <td className="py-3 text-right text-profit">+2.3%</td>
                      <td className="py-3 text-right">
                        <CheckCircle className="ml-auto h-4 w-4 text-profit" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Support Bounce</td>
                      <td className="py-3">Swing (3-5d)</td>
                      <td className="py-3 text-right">62%</td>
                      <td className="py-3 text-right text-profit">+3.8%</td>
                      <td className="py-3 text-right">
                        <CheckCircle className="ml-auto h-4 w-4 text-profit" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Earnings Play</td>
                      <td className="py-3">Event</td>
                      <td className="py-3 text-right">45%</td>
                      <td className="py-3 text-right text-loss">-1.2%</td>
                      <td className="py-3 text-right">
                        <XCircle className="ml-auto h-4 w-4 text-loss" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Trend Following</td>
                      <td className="py-3">Swing (7-10d)</td>
                      <td className="py-3 text-right">72%</td>
                      <td className="py-3 text-right text-profit">+5.2%</td>
                      <td className="py-3 text-right">
                        <CheckCircle className="ml-auto h-4 w-4 text-profit" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">
                * Backtested over 12 months of historical data. Past performance does not guarantee future results.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TradingStrategies;
