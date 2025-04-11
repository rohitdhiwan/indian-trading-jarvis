
import { toast } from "sonner";

// Types for market data
export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
}

export interface StockQuote {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  percentChange: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
}

export interface StockHistoricalData {
  date: string;
  time?: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Alpha Vantage free API for market data (limited to 25 requests per day)
const API_KEY = "demo"; // Replace with your Alpha Vantage API key
const BASE_URL = "https://www.alphavantage.co/query";

// Get real-time quote for a stock
export const getStockQuote = async (symbol: string): Promise<StockQuote | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=NSE:${symbol}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch stock data");
    }
    
    const data = await response.json();
    
    // Check if we have valid data
    if (data["Global Quote"] && Object.keys(data["Global Quote"]).length > 0) {
      const quote = data["Global Quote"];
      
      return {
        symbol: symbol,
        companyName: symbol, // Alpha Vantage doesn't provide company name in GLOBAL_QUOTE
        currentPrice: parseFloat(quote["05. price"]),
        change: parseFloat(quote["09. change"]),
        percentChange: parseFloat(quote["10. change percent"].replace("%", "")),
        volume: parseInt(quote["06. volume"]),
        high: parseFloat(quote["03. high"]),
        low: parseFloat(quote["04. low"]),
        open: parseFloat(quote["02. open"]),
        previousClose: parseFloat(quote["08. previous close"]),
      };
    }
    
    // Handle API limit exceeded or symbol not found
    if (data.Note) {
      toast.error("API call frequency limit reached. Please try again later.");
      console.error("API limit exceeded:", data.Note);
      return null;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    toast.error("Failed to fetch stock data. Please try again.");
    return null;
  }
};

// Get major Indian market indices
export const getMarketIndices = async (): Promise<MarketIndex[]> => {
  try {
    // In a real implementation, you would fetch this from an API
    // Since Alpha Vantage free tier is limited, we'll simulate real-time data
    // by adding small random changes to the mock data
    
    const mockIndices = [
      { symbol: "^NSEI", name: "NIFTY 50", price: 22523.65, change: 152.35, percentChange: 0.68 },
      { symbol: "^BSESN", name: "SENSEX", price: 73954.83, change: 529.9, percentChange: 0.72 },
      { symbol: "^NSEBANK", name: "NIFTY BANK", price: 48235.10, change: -112.35, percentChange: -0.23 },
      { symbol: "INR=X", name: "USD/INR", price: 83.20, change: -0.12, percentChange: -0.15 },
    ];
    
    // Add small random changes to simulate real-time data
    return mockIndices.map(index => {
      const randomChange = (Math.random() - 0.5) * 20; // Random change between -10 and +10
      const newPrice = index.price + randomChange;
      const newChange = index.change + randomChange;
      const newPercentChange = (newChange / (newPrice - newChange)) * 100;
      
      return {
        ...index,
        price: parseFloat(newPrice.toFixed(2)),
        change: parseFloat(newChange.toFixed(2)),
        percentChange: parseFloat(newPercentChange.toFixed(2)),
      };
    });
  } catch (error) {
    console.error("Error fetching market indices:", error);
    toast.error("Failed to fetch market data. Please try again.");
    return [];
  }
};

// Get historical data for a stock or index
export const getHistoricalData = async (symbol: string, interval: 'daily' | 'intraday' = 'daily'): Promise<StockHistoricalData[]> => {
  try {
    let function_name = interval === 'intraday' ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY';
    let interval_param = interval === 'intraday' ? '&interval=5min' : '';
    
    const response = await fetch(
      `${BASE_URL}?function=${function_name}&symbol=NSE:${symbol}${interval_param}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch historical data");
    }
    
    const data = await response.json();
    
    // Check for API limit or error messages
    if (data.Note) {
      toast.error("API call frequency limit reached. Please try again later.");
      console.error("API limit exceeded:", data.Note);
      return [];
    }
    
    if (data["Error Message"]) {
      toast.error("Failed to fetch historical data for this symbol.");
      console.error("API error:", data["Error Message"]);
      return [];
    }
    
    // Parse the historical data
    const timeSeriesKey = interval === 'intraday' ? 'Time Series (5min)' : 'Time Series (Daily)';
    const timeSeries = data[timeSeriesKey];
    
    if (!timeSeries) {
      return [];
    }
    
    return Object.keys(timeSeries).map(date => {
      const entry = timeSeries[date];
      return {
        date: date.split(' ')[0], // Extract date part
        time: date.includes(' ') ? date.split(' ')[1] : undefined, // Extract time part if present
        open: parseFloat(entry["1. open"]),
        high: parseFloat(entry["2. high"]),
        low: parseFloat(entry["3. low"]),
        close: parseFloat(entry["4. close"]),
        volume: parseInt(entry["5. volume"]),
      };
    }).slice(0, 30); // Get the most recent 30 data points
  } catch (error) {
    console.error("Error fetching historical data:", error);
    toast.error("Failed to fetch historical data. Please try again.");
    return [];
  }
};

// Check if market is open (Indian markets: 9:15 AM to 3:30 PM IST, Monday to Friday)
export const isMarketOpen = (): boolean => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + istOffset);
  
  const day = istTime.getUTCDay();
  const hours = istTime.getUTCHours();
  const minutes = istTime.getUTCMinutes();
  
  // Convert to minutes since midnight
  const timeInMinutes = hours * 60 + minutes;
  
  // Market hours: 9:15 AM to 3:30 PM IST (555 to 930 minutes)
  const marketOpen = 9 * 60 + 15;
  const marketClose = 15 * 60 + 30;
  
  // Check if it's a weekday and within market hours
  return day >= 1 && day <= 5 && timeInMinutes >= marketOpen && timeInMinutes <= marketClose;
};
