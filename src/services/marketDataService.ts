
import { toast } from "sonner";

// Types for market data
export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
}

export interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  marketCap?: number;
  volume24h?: number;
  image?: string;
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

// CoinGecko API for cryptocurrency data
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

// Cache durations in milliseconds
const CACHE_DURATION = {
  CRYPTO: 60 * 1000, // 1 minute for crypto data
  STOCK: 5 * 60 * 1000, // 5 minutes for stock data
  INDICES: 5 * 60 * 1000, // 5 minutes for indices
  HISTORICAL: 30 * 60 * 1000, // 30 minutes for historical data
};

// Simple in-memory cache
const dataCache: Record<string, { data: any; timestamp: number }> = {};

// Cache helper functions
const getCachedData = (key: string) => {
  const cachedItem = dataCache[key];
  if (cachedItem) {
    const now = Date.now();
    // Check if key format indicates what type of data it is
    let cacheDuration = CACHE_DURATION.STOCK;
    if (key.startsWith('crypto_')) {
      cacheDuration = CACHE_DURATION.CRYPTO;
    } else if (key.startsWith('indices')) {
      cacheDuration = CACHE_DURATION.INDICES;
    } else if (key.startsWith('history_')) {
      cacheDuration = CACHE_DURATION.HISTORICAL;
    }
    
    // Return cached data if it's still valid
    if (now - cachedItem.timestamp < cacheDuration) {
      console.log(`Using cached data for ${key}`);
      return cachedItem.data;
    }
  }
  return null;
};

const cacheData = (key: string, data: any) => {
  dataCache[key] = { data, timestamp: Date.now() };
};

// Get real-time quote for a stock
export const getStockQuote = async (symbol: string): Promise<StockQuote | null> => {
  const cacheKey = `stock_${symbol}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
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
      
      const stockData = {
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
      
      cacheData(cacheKey, stockData);
      return stockData;
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
  const cacheKey = 'indices';
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
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
    const indices = mockIndices.map(index => {
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
    
    cacheData(cacheKey, indices);
    return indices;
  } catch (error) {
    console.error("Error fetching market indices:", error);
    toast.error("Failed to fetch market data. Please try again.");
    return [];
  }
};

// Get historical data for a stock or index
export const getHistoricalData = async (symbol: string, interval: 'daily' | 'intraday' = 'daily'): Promise<StockHistoricalData[]> => {
  const cacheKey = `history_${symbol}_${interval}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
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
    
    const historicalData = Object.keys(timeSeries).map(date => {
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
    
    cacheData(cacheKey, historicalData);
    return historicalData;
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

// Get cryptocurrency data from CoinGecko API
export const getCryptoData = async (): Promise<CryptoData[]> => {
  const cacheKey = 'crypto_list';
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    // Fetch real data from CoinGecko API with retry logic
    const fetchWithRetry = async (retries = 3, delay = 1000): Promise<CryptoData[]> => {
      try {
        const response = await fetch(
          `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
          { headers: { 'Accept': 'application/json' } }
        );
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded");
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch cryptocurrency data: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform CoinGecko data to our CryptoData format
        const cryptoData = data.map((crypto: any) => ({
          symbol: crypto.symbol.toUpperCase(),
          name: crypto.name,
          price: crypto.current_price,
          change: crypto.price_change_24h,
          percentChange: crypto.price_change_percentage_24h,
          marketCap: crypto.market_cap,
          volume24h: crypto.total_volume,
          image: crypto.image
        }));
        
        cacheData(cacheKey, cryptoData);
        return cryptoData;
      } catch (error: any) {
        console.error(`Attempt failed: ${error.message}`);
        
        if (error.message.includes("Rate limit") && retries > 0) {
          console.log(`Retrying... ${retries} attempts left`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        
        throw error;
      }
    };
    
    return await fetchWithRetry();
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    toast.error("Failed to fetch cryptocurrency data. Using fallback data.");
    
    // Fallback to mock data if API fails
    const mockCryptoData = [
      { symbol: "BTC", name: "Bitcoin", price: 63254.32, change: 1254.21, percentChange: 2.03, marketCap: 1243000000000, volume24h: 32546000000 },
      { symbol: "ETH", name: "Ethereum", price: 3126.45, change: -42.65, percentChange: -1.34, marketCap: 375200000000, volume24h: 14325000000 },
      { symbol: "BNB", name: "Binance Coin", price: 563.21, change: 12.43, percentChange: 2.26, marketCap: 85600000000, volume24h: 3421000000 },
      { symbol: "SOL", name: "Solana", price: 143.56, change: 5.21, percentChange: 3.76, marketCap: 62400000000, volume24h: 2765000000 },
      { symbol: "XRP", name: "XRP", price: 0.532, change: -0.021, percentChange: -3.79, marketCap: 29300000000, volume24h: 1254000000 },
    ];
    
    return mockCryptoData;
  }
};

// Get historical data for a cryptocurrency with improved error handling
export const getCryptoHistoricalData = async (coinId: string, days: number = 30): Promise<StockHistoricalData[]> => {
  const cacheKey = `crypto_history_${coinId}_${days}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    // For symbols like BTC, we need to map to coingecko's coin IDs
    const coinIdMap: {[key: string]: string} = {
      'BTC': 'bitcoin',
      'BTC-USD': 'bitcoin',
      'ETH': 'ethereum',
      'ETH-USD': 'ethereum',
      'BNB': 'binancecoin',
      'BNB-USD': 'binancecoin',
      'SOL': 'solana',
      'SOL-USD': 'solana',
      'XRP': 'ripple',
      'XRP-USD': 'ripple',
      'DOGE': 'dogecoin',
      'DOGE-USD': 'dogecoin',
      'ADA': 'cardano',
      'ADA-USD': 'cardano',
      'DOT': 'polkadot',
      'DOT-USD': 'polkadot',
      'LTC': 'litecoin',
      'LTC-USD': 'litecoin',
      'MATIC': 'matic-network',
      'MATIC-USD': 'matic-network'
    };
    
    // Use the mapped ID or fallback to lowercase version of the symbol
    const geckoId = coinIdMap[coinId] || (coinId.includes('-') ? coinId.split('-')[0].toLowerCase() : coinId.toLowerCase());
    
    // Use a retry mechanism for rate-limited APIs
    const fetchWithRetry = async (retries = 3, delay = 1000): Promise<StockHistoricalData[]> => {
      try {
        const response = await fetch(
          `${COINGECKO_API_URL}/coins/${geckoId}/market_chart?vs_currency=usd&days=${days}`,
          { headers: { 'Accept': 'application/json' } }
        );
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded");
        }
        
        if (response.status === 404) {
          console.error(`Coin not found: ${geckoId}`);
          throw new Error(`Coin not found: ${geckoId}`);
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch historical data: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform CoinGecko data to our StockHistoricalData format
        // CoinGecko returns data as [timestamp, price] pairs
        if (data.prices && Array.isArray(data.prices)) {
          const historicalData = data.prices.map((item: [number, number]) => {
            const date = new Date(item[0]);
            return {
              date: date.toISOString().split('T')[0],
              time: date.toISOString().split('T')[1].substring(0, 5),
              open: item[1], // CoinGecko doesn't provide OHLC so we use the price for all
              high: item[1],
              low: item[1],
              close: item[1],
              volume: 0 // We don't have volume data per timestamp
            };
          });
          
          cacheData(cacheKey, historicalData);
          return historicalData;
        }
        
        return [];
      } catch (error: any) {
        console.error(`Attempt failed: ${error.message}`);
        
        if (error.message.includes("Rate limit") && retries > 0) {
          console.log(`Retrying... ${retries} attempts left`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        
        if (error.message.includes("Coin not found")) {
          // If coin not found, return empty data
          return [];
        }
        
        throw error;
      }
    };
    
    return await fetchWithRetry();
  } catch (error) {
    console.error(`Error fetching historical data for ${coinId}:`, error);
    toast.error("Failed to fetch cryptocurrency historical data.");
    return [];
  }
};

// Check if crypto market is open (24/7)
export const isCryptoMarketOpen = (): boolean => {
  // Crypto markets are always open
  return true;
};
