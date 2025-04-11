
import { useState } from "react";
import { Search, Bell, RefreshCw, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getStockQuote } from "@/services/marketDataService";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a valid stock symbol",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    const symbol = searchQuery.trim().toUpperCase();
    
    try {
      // Validate if the stock exists before navigating
      const stockData = await getStockQuote(symbol);
      
      if (stockData) {
        // Stock exists, navigate to its detail page
        navigate(`/stock/${symbol}`);
      } else {
        // Stock not found
        toast({
          title: "Stock Not Found",
          description: `No data found for ${symbol}. Please check the symbol and try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to search for the stock. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="border-b border-border bg-card px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <form onSubmit={handleSearch} className="relative w-64 md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks... (e.g. RELIANCE, TATASTEEL)"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
            {isSearching && (
              <RefreshCw className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </form>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              AI
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
