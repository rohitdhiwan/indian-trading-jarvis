
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Wallet, CircleDollarSign, BarChart3, History, Trash2, RefreshCw, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Local storage keys
const PAPER_TRADING_KEY = "paper_trading_data";

// Default portfolio data
const defaultPortfolioData = {
  capital: 100000,
  currentValue: 100000,
  profitLoss: 0,
  profitLossPercent: 0,
  holdings: [],
  transactions: [],
};

const PaperTrading = () => {
  // Load portfolio data from localStorage or use default
  const [portfolioData, setPortfolioData] = useState(() => {
    const savedData = localStorage.getItem(PAPER_TRADING_KEY);
    return savedData ? JSON.parse(savedData) : defaultPortfolioData;
  });
  
  const [stock, setStock] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [orderType, setOrderType] = useState("market");
  const [tradeType, setTradeType] = useState("buy");
  const [resetAmount, setResetAmount] = useState("100000");
  
  // Save portfolio data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(PAPER_TRADING_KEY, JSON.stringify(portfolioData));
  }, [portfolioData]);
  
  // Calculate portfolio metrics
  const cashBalance = portfolioData.capital - portfolioData.holdings.reduce(
    (total, holding) => total + holding.buyPrice * holding.quantity, 
    0
  );

  // Reset portfolio balance to user-specified amount
  const handleResetBalance = () => {
    const newAmount = parseFloat(resetAmount);
    
    if (isNaN(newAmount) || newAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const newPortfolioData = {
      ...defaultPortfolioData,
      capital: newAmount,
      currentValue: newAmount,
    };
    
    setPortfolioData(newPortfolioData);
    toast.success(`Portfolio balance reset to ₹${newAmount.toLocaleString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Paper Trading</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Reset Balance</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Portfolio Balance</DialogTitle>
                <DialogDescription>
                  This will reset your portfolio, removing all holdings and transactions. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Balance Amount (₹)</label>
                  <Input
                    type="number"
                    min="1000"
                    value={resetAmount}
                    onChange={(e) => setResetAmount(e.target.value)}
                    placeholder="Enter new balance amount"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => resetAmount}>Cancel</Button>
                <Button 
                  onClick={handleResetBalance}
                  className="bg-profit hover:bg-profit/90 text-white"
                >
                  Reset Portfolio
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Add Funds</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-primary transition-all hover:shadow-md">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
              <p className="text-2xl font-bold">₹{portfolioData.currentValue.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                {portfolioData.profitLoss >= 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-profit" />
                    <p className="text-xs text-profit">
                      +₹{portfolioData.profitLoss.toLocaleString()} ({portfolioData.profitLossPercent.toFixed(2)}%)
                    </p>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 text-loss" />
                    <p className="text-xs text-loss">
                      -₹{Math.abs(portfolioData.profitLoss).toLocaleString()} ({Math.abs(portfolioData.profitLossPercent).toFixed(2)}%)
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="rounded-md bg-primary/10 p-2">
              <CircleDollarSign className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-accent transition-all hover:shadow-md">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Cash Balance</p>
              <p className="text-2xl font-bold">₹{cashBalance.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Available for trading</p>
            </div>
            <div className="rounded-md bg-accent/10 p-2">
              <Wallet className="h-6 w-6 text-accent-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-muted transition-all hover:shadow-md">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Invested Amount</p>
              <p className="text-2xl font-bold">₹{(portfolioData.currentValue - cashBalance).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Across {portfolioData.holdings.length} stocks</p>
            </div>
            <div className="rounded-md bg-muted/10 p-2">
              <BarChart3 className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-secondary transition-all hover:shadow-md">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Day's P&L</p>
              <p className="text-2xl font-bold">₹1,245.75</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-profit" />
                <p className="text-xs text-profit">+1.22%</p>
              </div>
            </div>
            <div className="rounded-md bg-secondary/10 p-2">
              <TrendingUp className="h-6 w-6 text-secondary-foreground" />
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
                {portfolioData.holdings.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                    <Wallet className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Holdings Yet</h3>
                    <p className="text-sm text-muted-foreground">Your portfolio holdings will appear here after you make your first purchase.</p>
                  </div>
                ) : (
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
                          <tr key={holding.id} className="group transition-colors hover:bg-muted/30">
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
                                  <p>₹{Math.abs(holding.profitLoss).toFixed(2)}</p>
                                </div>
                                <p className={`text-xs ${holding.profitLoss >= 0 ? "text-profit" : "text-loss"}`}>
                                  {holding.profitLoss >= 0 ? "+" : "-"}
                                  {Math.abs(holding.profitLossPercent).toFixed(2)}%
                                </p>
                              </div>
                            </td>
                            <td className="py-3 text-right">
                              <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">Sell</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="transactions" className="mt-0">
                {portfolioData.transactions.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                    <History className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Transaction History</h3>
                    <p className="text-sm text-muted-foreground">Your transaction history will appear here after you make your first trade.</p>
                  </div>
                ) : (
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
                          <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
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
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card className="backdrop-blur-sm bg-card/95 border shadow-lg">
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
                className="transition-all focus:ring-2 focus:ring-primary/30"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Quantity</label>
              <Input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                className="transition-all focus:ring-2 focus:ring-primary/30"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Order Type</label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="w-full">
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
                <Input 
                  type="number" 
                  placeholder="Enter price" 
                  className="transition-all focus:ring-2 focus:ring-primary/30"
                />
              </div>
            )}
            
            <Button className={`w-full mt-2 ${tradeType === "buy" ? "bg-profit hover:bg-profit/90" : "bg-loss hover:bg-loss/90"}`}>
              {tradeType === "buy" ? "Buy" : "Sell"} {stock || "Stock"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaperTrading;
