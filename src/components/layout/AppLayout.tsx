
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { isMarketOpen } from "@/services/marketDataService";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="bg-muted/50 border-b border-border">
          <div className="container flex items-center justify-between py-1 text-xs">
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
            <div className="text-muted-foreground">
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span> • </span>
              <span>{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
