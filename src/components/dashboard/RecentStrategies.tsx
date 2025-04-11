
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for recent strategies
const strategies = [
  {
    id: 1,
    name: "HDFC Bank Swing Trade",
    type: "Swing Trading",
    success: true,
    period: "3-5 days",
    return: "+8.2%",
  },
  {
    id: 2,
    name: "Reliance Breakout Strategy",
    type: "Intraday",
    success: true,
    period: "Same day",
    return: "+2.3%",
  },
  {
    id: 3,
    name: "TCS Earnings Strategy",
    type: "Swing Trading",
    success: false,
    period: "5 days",
    return: "-1.8%",
  },
];

const RecentStrategies = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Strategies</CardTitle>
        <CardDescription>Performance of your recent trading strategies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {strategies.map((strategy) => (
          <div 
            key={strategy.id}
            className="flex items-center justify-between rounded-md border border-border p-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {strategy.success ? (
                  <CheckCircle className="h-4 w-4 text-profit" />
                ) : (
                  <XCircle className="h-4 w-4 text-loss" />
                )}
                <p className="font-medium">{strategy.name}</p>
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>{strategy.type}</span>
                <span>•</span>
                <span>{strategy.period}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className={`font-medium ${strategy.success ? "text-profit" : "text-loss"}`}>
                {strategy.return}
              </p>
              <Link to={`/strategies/${strategy.id}`}>
                <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        ))}
        <div className="flex justify-center pt-2">
          <Link to="/strategies" className="text-sm text-primary underline">View all strategies</Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentStrategies;
