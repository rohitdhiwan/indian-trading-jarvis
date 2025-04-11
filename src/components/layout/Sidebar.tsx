import React from "react";
import {
  BarChart3,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isMobile?: boolean;
}

const items = [
  {
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    name: "Dashboard",
  },
  {
    href: "/watchlist",
    icon: <ListChecks className="h-4 w-4" />,
    name: "Watchlist",
  },
  {
    href: "/paper-trading",
    icon: <BarChart3 className="h-4 w-4" />,
    name: "Paper Trading",
  },
];

const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-background",
        isMobile ? "w-full" : "w-72"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          <span className="text-lg font-semibold">TradeSmart</span>
        </div>
      </div>
      <nav className="flex-1 overflow-auto py-2">
        <ul className="grid gap-1 px-2">
          {items.map((item, index) => (
            <li key={index}>
              <button
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  location.pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => navigate(item.href)}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        
        <div className="px-3 py-2">
          <h3 className="px-2 text-xs font-medium text-muted-foreground">Settings</h3>
          <ul className="grid gap-1 p-1">
            <li>
              <button
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  location.pathname === "/settings"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="mt-auto p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary p-2">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-medium">AI Assistant</h4>
                <p className="text-xs text-muted-foreground">
                  Get help with your trading
                </p>
              </div>
            </div>
            <Button
              className="mt-4 w-full"
              size="sm"
              onClick={() => navigate("/assistant")}
            >
              Ask AI
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
