
import { toast } from "sonner";

// Fyers API integration types
export interface FyersCredentials {
  client_id: string;
  access_token: string;
}

// Store credentials in localStorage (temporary solution)
// Note: In production, you should use a more secure approach with a backend
export const storeFyersCredentials = (credentials: FyersCredentials): void => {
  localStorage.setItem('fyers_credentials', JSON.stringify(credentials));
  toast.success("Fyers credentials saved successfully");
};

export const getFyersCredentials = (): FyersCredentials | null => {
  const stored = localStorage.getItem('fyers_credentials');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as FyersCredentials;
  } catch (error) {
    console.error("Error parsing Fyers credentials:", error);
    return null;
  }
};

// Check if the user is authenticated with Fyers
export const isFyersAuthenticated = (): boolean => {
  const credentials = getFyersCredentials();
  return credentials !== null;
};

// Clear Fyers credentials (logout)
export const clearFyersCredentials = (): void => {
  localStorage.removeItem('fyers_credentials');
  toast.success("Fyers credentials cleared");
};

// Fetch quotes from Fyers API
export const fetchQuotes = async (symbols: string[]): Promise<any> => {
  const credentials = getFyersCredentials();
  
  if (!credentials) {
    toast.error("Fyers credentials not found. Please authenticate first.");
    return null;
  }
  
  try {
    // This is a simplified version - in a real implementation,
    // you would make the actual API call to Fyers
    const response = await fetch("https://api.fyers.in/data-rest/v2/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${credentials.client_id}:${credentials.access_token}`
      },
      body: JSON.stringify({
        symbols: symbols.join(",")
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch quotes: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching quotes from Fyers:", error);
    toast.error("Failed to fetch market data from Fyers");
    return null;
  }
};

// Fetch historical data from Fyers API
export const fetchHistoricalData = async (
  symbol: string, 
  resolution: string = "D", 
  dateFormat: string = "1", 
  range: string = "1m"
): Promise<any> => {
  const credentials = getFyersCredentials();
  
  if (!credentials) {
    toast.error("Fyers credentials not found. Please authenticate first.");
    return null;
  }
  
  try {
    // Calculate dates for the range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (range) {
      case "1d":
        startDate.setDate(startDate.getDate() - 1);
        break;
      case "1w":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "1m":
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "3m":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "1y":
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case "5y":
        startDate.setFullYear(startDate.getFullYear() - 5);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }
    
    // Format dates as UNIX timestamps
    const from = Math.floor(startDate.getTime() / 1000);
    const to = Math.floor(endDate.getTime() / 1000);
    
    // This is a simplified version - in a real implementation,
    // you would make the actual API call to Fyers
    const response = await fetch("https://api.fyers.in/data-rest/v2/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${credentials.client_id}:${credentials.access_token}`
      },
      body: JSON.stringify({
        symbol: symbol,
        resolution: resolution,
        date_format: dateFormat,
        range_from: from,
        range_to: to,
        cont_flag: "1"
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching historical data from Fyers:", error);
    toast.error("Failed to fetch historical data from Fyers");
    return null;
  }
};
