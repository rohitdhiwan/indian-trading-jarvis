
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { isMarketOpen, isCryptoMarketOpen } from "@/services/marketDataService";
import { Bitcoin } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="bg-muted/50 border-b border-border">
          <div className="container flex items-center justify-between py-1 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">NSE Market:</span>
                {isMarketOpen() ? (
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-profit">Open</span>
                    <div className="h-2 w-2 rounded-full bg-profit animate-pulse"></div>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-muted-foreground">Closed</span>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Bitcoin size={14} />
                  Crypto:
                </span>
                {isCryptoMarketOpen() ? (
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-profit">Open</span>
                    <div className="h-2 w-2 rounded-full bg-profit animate-pulse"></div>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-muted-foreground">Closed</span>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                  </span>
                )}
              </div>
            </div>
            <div className="text-muted-foreground">
              <span>{currentTime.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span> • </span>
              <span>{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
