
import { useState } from "react";
import { Search, Bell, RefreshCw, Menu, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getStockQuote } from "@/services/marketDataService";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<"stocks" | "crypto">("stocks");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: `Please enter a valid ${searchType === "stocks" ? "stock symbol" : "cryptocurrency symbol"}`,
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    const symbol = searchQuery.trim().toUpperCase();
    
    try {
      if (searchType === "stocks") {
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
      } else {
        // For now, just navigate to crypto page
        // In a full implementation, you would validate the crypto symbol first
        navigate(`/crypto/${symbol}`);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: `Failed to search for the ${searchType === "stocks" ? "stock" : "cryptocurrency"}. Please try again.`,
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
            <div className="flex flex-col gap-2">
              <Tabs 
                defaultValue="stocks" 
                value={searchType} 
                onValueChange={(value) => setSearchType(value as "stocks" | "crypto")}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="stocks">Stocks</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative">
                {searchType === "stocks" ? (
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                ) : (
                  <Bitcoin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  placeholder={searchType === "stocks" 
                    ? "Search stocks... (e.g. RELIANCE, TATASTEEL)" 
                    : "Search crypto... (e.g. BTC, ETH)"
                  }
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
                {isSearching && (
                  <RefreshCw className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </div>
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
