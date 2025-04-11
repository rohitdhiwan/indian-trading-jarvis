
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  LineChart,
  Home,
  Briefcase,
  MessageSquare,
  Settings,
  Info,
  TrendingUp,
  ScrollText,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Watchlist", icon: <BarChart3 size={20} />, path: "/watchlist" },
    { name: "Strategies", icon: <TrendingUp size={20} />, path: "/strategies" },
    { name: "Paper Trading", icon: <Briefcase size={20} />, path: "/paper-trading" },
    { name: "AI Assistant", icon: <MessageSquare size={20} />, path: "/assistant" },
    { name: "Market News", icon: <ScrollText size={20} />, path: "/news" },
  ];

  const bottomNavItems = [
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "About", icon: <Info size={20} />, path: "/about" },
  ];

  const NavItem = ({
    name,
    icon,
    path,
  }: {
    name: string;
    icon: React.ReactNode;
    path: string;
  }) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {icon}
        {!isCollapsed && <span>{name}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex h-16 items-center justify-between px-3 py-4">
        <div className="flex items-center gap-2 font-bold text-primary">
          {!isCollapsed && <span>TRADE JARVIS</span>}
          {isCollapsed && <LineChart size={24} />}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <TrendingUp className="h-4 w-4 rotate-0" />
          ) : (
            <TrendingUp className="h-4 w-4 -rotate-90" />
          )}
        </Button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navigationItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </nav>
      <div className="border-t border-border px-3 py-2">
        {bottomNavItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
