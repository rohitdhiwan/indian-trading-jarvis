
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Wallet, CircleDollarSign, BarChart3, History, Trash2 } from "lucide-react";

// Mock portfolio data
const portfolioData = {
  capital: 100000,
  currentValue: 103200,
  profitLoss: 3200,
  profitLossPercent: 3.2,
  holdings: [
    {
      id: 1,
      symbol: "RELIANCE",
      name: "Reliance Industries",
      quantity: 10,
      buyPrice: 2840,
      currentPrice: 2885.2,
      profitLoss: 452.0,
      profitLossPercent: 1.59,
    },
    {
      id: 2,
      symbol: "HDFCBANK",
      name: "HDFC Bank",
      quantity: 15,
      buyPrice: 1610.5,
      currentPrice: 1642.75,
      profitLoss: 483.75,
      profitLossPercent: 2.00,
    },
    {
      id: 3,
      symbol: "INFY",
      name: "Infosys Ltd",
      quantity: 20,
      buyPrice: 1480.75,
      currentPrice: 1520.45,
      profitLoss: 794.0,
      profitLossPercent: 2.68,
    },
  ],
  transactions: [
    {
      id: 1,
      date: "2024-04-11",
      time: "10:15",
      symbol: "RELIANCE",
      type: "buy",
      quantity: 10,
      price: 2840,
      value: 28400,
    },
    {
      id: 2,
      date: "2024-04-10",
      time: "11:30",
      symbol: "HDFCBANK",
      type: "buy",
      quantity: 15,
      price: 1610.5,
      value: 24157.5,
    },
    {
      id: 3,
      date: "2024-04-09",
      time: "14:45",
      symbol: "INFY",
      type: "buy",
      quantity: 20,
      price: 1480.75,
      value: 29615,
    },
  ],
};

const PaperTrading = () => {
  const [stock, setStock] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [orderType, setOrderType] = useState("market");
  const [tradeType, setTradeType] = useState("buy");
  
  // Calculate portfolio metrics
  const cashBalance = portfolioData.capital - portfolioData.holdings.reduce(
    (total, holding) => total + holding.buyPrice * holding.quantity, 
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Paper Trading</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span>Add Funds</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
              <p className="text-2xl font-bold">₹{portfolioData.currentValue.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-profit" />
                <p className="text-xs text-profit">
                  +₹{portfolioData.profitLoss.toLocaleString()} ({portfolioData.profitLossPercent.toFixed(2)}%)
                </p>
              </div>
            </div>
            <div className="rounded-md bg-accent p-2">
              <CircleDollarSign className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Cash Balance</p>
              <p className="text-2xl font-bold">₹{cashBalance.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Available for trading</p>
            </div>
            <div className="rounded-md bg-accent p-2">
              <Wallet className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Invested Amount</p>
              <p className="text-2xl font-bold">₹{(portfolioData.currentValue - cashBalance).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Across {portfolioData.holdings.length} stocks</p>
            </div>
            <div className="rounded-md bg-accent p-2">
              <BarChart3 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Day's P&L</p>
              <p className="text-2xl font-bold">₹1,245.75</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-profit" />
                <p className="text-xs text-profit">+1.22%</p>
              </div>
            </div>
            <div className="rounded-md bg-accent p-2">
              <TrendingUp className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <Tabs defaultValue="holdings">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Portfolio</CardTitle>
                <TabsList>
                  <TabsTrigger value="holdings">Holdings</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <TabsContent value="holdings" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">Stock</th>
                        <th className="pb-2 text-right font-medium">Qty</th>
                        <th className="pb-2 text-right font-medium">Avg Price</th>
                        <th className="pb-2 text-right font-medium">Current</th>
                        <th className="pb-2 text-right font-medium">P&L</th>
                        <th className="pb-2 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {portfolioData.holdings.map((holding) => (
                        <tr key={holding.id}>
                          <td className="py-3">
                            <div>
                              <p className="font-medium">{holding.symbol}</p>
                              <p className="text-xs text-muted-foreground">{holding.name}</p>
                            </div>
                          </td>
                          <td className="py-3 text-right">{holding.quantity}</td>
                          <td className="py-3 text-right">₹{holding.buyPrice.toFixed(2)}</td>
                          <td className="py-3 text-right">₹{holding.currentPrice.toFixed(2)}</td>
                          <td className="py-3 text-right">
                            <div>
                              <div className={`flex items-center justify-end gap-1 ${holding.profitLoss >= 0 ? "text-profit" : "text-loss"}`}>
                                {holding.profitLoss >= 0 ? (
                                  <TrendingUp className="h-3 w-3" />
                                ) : (
                                  <TrendingDown className="h-3 w-3" />
                                )}
                                <p>₹{holding.profitLoss.toFixed(2)}</p>
                              </div>
                              <p className={`text-xs ${holding.profitLoss >= 0 ? "text-profit" : "text-loss"}`}>
                                {holding.profitLoss >= 0 ? "+" : ""}
                                {holding.profitLossPercent.toFixed(2)}%
                              </p>
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <Button size="sm" variant="outline">Sell</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="transactions" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">Date & Time</th>
                        <th className="pb-2 text-left font-medium">Stock</th>
                        <th className="pb-2 text-right font-medium">Type</th>
                        <th className="pb-2 text-right font-medium">Qty</th>
                        <th className="pb-2 text-right font-medium">Price</th>
                        <th className="pb-2 text-right font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {portfolioData.transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="py-3">
                            <div>
                              <p className="font-medium">{transaction.date}</p>
                              <p className="text-xs text-muted-foreground">{transaction.time}</p>
                            </div>
                          </td>
                          <td className="py-3">{transaction.symbol}</td>
                          <td className="py-3 text-right">
                            <div className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              transaction.type === "buy" ? "bg-accent-foreground/10 text-accent-foreground" : "bg-loss/10 text-loss"
                            }`}>
                              {transaction.type.toUpperCase()}
                            </div>
                          </td>
                          <td className="py-3 text-right">{transaction.quantity}</td>
                          <td className="py-3 text-right">₹{transaction.price.toFixed(2)}</td>
                          <td className="py-3 text-right">₹{transaction.value.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Place Order</CardTitle>
            <CardDescription>Execute paper trades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                variant={tradeType === "buy" ? "default" : "outline"} 
                className={`flex-1 ${tradeType === "buy" ? "bg-profit hover:bg-profit/90" : ""}`}
                onClick={() => setTradeType("buy")}
              >
                Buy
              </Button>
              <Button 
                variant={tradeType === "sell" ? "default" : "outline"} 
                className={`flex-1 ${tradeType === "sell" ? "bg-loss hover:bg-loss/90" : ""}`}
                onClick={() => setTradeType("sell")}
              >
                Sell
              </Button>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Stock Symbol</label>
              <Input 
                placeholder="e.g. RELIANCE, INFY" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Quantity</label>
              <Input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Order Type</label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                  <SelectItem value="stop">Stop Loss</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {orderType !== "market" && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Price</label>
                <Input type="number" placeholder="Enter price" />
              </div>
            )}
            
            <Button className="w-full">
              {tradeType === "buy" ? "Buy" : "Sell"} {stock || "Stock"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaperTrading;
