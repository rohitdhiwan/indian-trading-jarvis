
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { isMarketOpen, isCryptoMarketOpen } from "@/services/marketDataService";
import { Bitcoin, BellRing } from "lucide-react";
import { toast } from "sonner";

const AppLayout = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotification, setShowNotification] = useState(false);
  
  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Check for market open/close transitions and notify
  useEffect(() => {
    const checkMarketStatus = () => {
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      
      // NSE Market opens at 9:15 AM
      if (currentHour === 9 && currentMinute === 15) {
        toast.success("NSE Market is now open for trading", {
          duration: 5000,
          icon: "🔔",
        });
      }
      
      // NSE Market closes at 3:30 PM
      if (currentHour === 15 && currentMinute === 30) {
        toast.info("NSE Market has closed for the day", {
          duration: 5000,
          icon: "🔔",
        });
      }
    };
    
    checkMarketStatus();
    // Run the check every minute
    const statusTimer = setInterval(checkMarketStatus, 60000);
    
    return () => clearInterval(statusTimer);
  }, [currentTime]);

  // Handle notification click
  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    if (!showNotification) {
      toast("Market updates will appear here", {
        description: "You'll receive notifications about market events and updates",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Notification dismissed"),
        },
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="bg-accent/30 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="container flex items-center justify-between py-1.5 text-xs">
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
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleNotificationClick}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <BellRing size={14} className="mr-1" />
                <span>Updates</span>
              </button>
              
              <div className="text-muted-foreground">
                <span>{currentTime.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span> • </span>
                <span>{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4 bg-background/90 backdrop-blur-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
