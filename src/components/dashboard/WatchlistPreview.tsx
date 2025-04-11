
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Sample watchlist data
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

const WatchlistPreview = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Watchlist</CardTitle>
            <CardDescription>Your tracked stocks</CardDescription>
          </div>
          <Link 
            to="/watchlist" 
            className="flex items-center gap-1 text-xs text-primary"
          >
            <span>View All</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {watchlistData.map((stock) => (
          <Link 
            key={stock.symbol} 
            to={`/stock/${stock.symbol}`}
            className="flex items-center justify-between rounded-md p-2 hover:bg-accent transition-colors"
          >
            <div>
              <p className="font-medium">{stock.symbol}</p>
              <p className="text-xs text-muted-foreground">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">₹{stock.price}</p>
              <div className="flex items-center justify-end gap-1">
                {stock.isPositive ? (
                  <TrendingUp className="h-3 w-3 text-profit" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-loss" />
                )}
                <p className={`text-xs ${stock.isPositive ? "text-profit" : "text-loss"}`}>
                  {stock.change}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default WatchlistPreview;
