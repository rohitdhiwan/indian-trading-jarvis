
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storeFyersCredentials, isFyersAuthenticated, clearFyersCredentials } from "@/services/fyersApi";
import { toast } from "sonner";

const FyersSetup = () => {
  const [clientId, setClientId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(isFyersAuthenticated());

  const handleSaveCredentials = () => {
    if (!clientId || !accessToken) {
      toast.error("Please enter both Client ID and Access Token");
      return;
    }

    storeFyersCredentials({
      client_id: clientId,
      access_token: accessToken
    });

    setIsAuthenticated(true);
    setClientId("");
    setAccessToken("");
    toast.success("Fyers credentials saved successfully");
  };

  const handleLogout = () => {
    clearFyersCredentials();
    setIsAuthenticated(false);
    toast.success("Fyers credentials cleared");
  };

  const handlePasteFyersToken = () => {
    // This function would parse the token from clipboard
    // For now, we'll just prompt the user to enter it manually
    navigator.clipboard.readText()
      .then(text => {
        if (text && text.trim().length > 0) {
          setAccessToken(text.trim());
          toast.success("Access token pasted from clipboard");
        } else {
          toast.error("No valid token found in clipboard");
        }
      })
      .catch(err => {
        console.error("Failed to read clipboard:", err);
        toast.error("Failed to read from clipboard. Please paste manually.");
      });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fyers API Setup</CardTitle>
        <CardDescription>
          Connect to your Fyers trading account for real-time Indian market data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Connected to Fyers API
                  </p>
                </div>
              </div>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              Disconnect Fyers Account
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID (APP_ID)</Label>
              <Input
                id="client-id"
                placeholder="e.g., XR03873-100"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your Fyers App ID in the format APPID-100
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-token">Access Token</Label>
              <div className="flex gap-2">
                <Input
                  id="access-token"
                  placeholder="Paste your access token here"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  type="password"
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={handlePasteFyersToken}
                  title="Paste from clipboard"
                >
                  Paste
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Generate this from the Fyers API dashboard or during the login process
              </p>
            </div>
            <div className="pt-2">
              <Button onClick={handleSaveCredentials}>
                Connect Fyers Account
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-medium">How to get your Fyers access token:</h3>
          <ol className="mt-2 text-sm text-muted-foreground list-decimal pl-5 space-y-1">
            <li>Log in to your Fyers account at <a href="https://trade.fyers.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">trade.fyers.in</a></li>
            <li>Go to Settings and create a new API app if you haven't already</li>
            <li>Generate the authorization code using your app's redirect URI</li>
            <li>Exchange that code for an access token using the Fyers API</li>
            <li>Enter your APP_ID and access token here</li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Note: This is a simplified implementation for demonstration purposes.
            In a production app, you would handle auth through a secure backend.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FyersSetup;
