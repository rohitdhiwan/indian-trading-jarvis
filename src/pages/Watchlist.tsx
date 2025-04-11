
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

// Sample watchlist data (same as in WatchlistPreview component)
const watchlistData = [
  { 
    symbol: "RELIANCE", 
    name: "Reliance Industries", 
    price: "2,885.20", 
    change: "+1.72%", 
    isPositive: true 
  },
  { 
    symbol: "INFY", 
    name: "Infosys Ltd", 
    price: "1,520.45", 
    change: "+2.14%", 
    isPositive: true 
  },
  { 
    symbol: "TCS", 
    name: "Tata Consultancy", 
    price: "3,945.30", 
    change: "-0.48%", 
    isPositive: false 
  },
  { 
    symbol: "HDFCBANK", 
    name: "HDFC Bank", 
    price: "1,642.75", 
    change: "+2.15%", 
    isPositive: true 
  },
  { 
    symbol: "TATAMOTORS", 
    name: "Tata Motors", 
    price: "952.50", 
    change: "-1.32%", 
    isPositive: false 
  },
];

const Watchlist = () => {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Tracked Stocks</CardTitle>
          <CardDescription>
            Monitor your favorite stocks and keep track of their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {watchlistData.map((stock) => (
              <Link 
                key={stock.symbol} 
                to={`/stock/${stock.symbol}`}
                className="flex items-center justify-between rounded-md border p-4 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{stock.price}</p>
                  <div className="flex items-center justify-end gap-1">
                    {stock.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-profit" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-loss" />
                    )}
                    <p className={`text-sm ${stock.isPositive ? "text-profit" : "text-loss"}`}>
                      {stock.change}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 rounded-md bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              This is currently using mock data. Connect your Fyers account in Settings to get real-time data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Watchlist;
