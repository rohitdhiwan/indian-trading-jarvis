
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Laptop, Moon, Sun, Save, Trash, RefreshCw } from "lucide-react";
import FyersSetup from "@/components/settings/FyersSetup";
import { toast } from "sonner";

const Settings = () => {
  // Appearance settings
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(16);
  const [chartStyle, setChartStyle] = useState("candlestick");
  const [compactMode, setCompactMode] = useState(false);
  
  // Preferences
  const [defaultPage, setDefaultPage] = useState("dashboard");
  const [refreshInterval, setRefreshInterval] = useState("30");
  const [showPnlNotifications, setShowPnlNotifications] = useState(true);
  const [marketClosingAlert, setMarketClosingAlert] = useState(true);

  // Handle saving appearance settings
  const handleSaveAppearance = () => {
    // In a real app, this would save to localStorage or a database
    localStorage.setItem("userAppearance", JSON.stringify({
      theme,
      fontSize,
      chartStyle,
      compactMode
    }));
    toast.success("Appearance settings saved successfully");
  };

  // Handle saving preferences
  const handleSavePreferences = () => {
    // In a real app, this would save to localStorage or a database
    localStorage.setItem("userPreferences", JSON.stringify({
      defaultPage,
      refreshInterval,
      showPnlNotifications,
      marketClosingAlert
    }));
    toast.success("Preferences saved successfully");
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="api" className="space-y-4">
        <TabsList className="mb-4 p-1 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="api">API Connections</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api" className="space-y-4">
          <FyersSetup />
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/95 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="mb-4">
                  <Label className="text-base">Theme</Label>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <button 
                          className={`p-2 rounded-md ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-5 w-5" />
                        </button>
                        <span>Light</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          className={`p-2 rounded-md ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-5 w-5" />
                        </button>
                        <span>Dark</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          className={`p-2 rounded-md ${theme === 'system' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
                          onClick={() => setTheme('system')}
                        >
                          <Laptop className="h-5 w-5" />
                        </button>
                        <span>System</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="fontSize" className="text-base">Font Size</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm">Small</span>
                    <Slider 
                      id="fontSize"
                      value={[fontSize]} 
                      min={12} 
                      max={20} 
                      step={1} 
                      onValueChange={(value) => setFontSize(value[0])}
                      className="flex-1" 
                    />
                    <span className="text-sm">Large</span>
                    <span className="ml-2 text-muted-foreground w-8 text-right">{fontSize}px</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="chartStyle" className="text-base">Chart Style</Label>
                  <Select value={chartStyle} onValueChange={setChartStyle}>
                    <SelectTrigger id="chartStyle" className="mt-2">
                      <SelectValue placeholder="Select chart style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candlestick">Candlestick</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="compactMode" className="text-base">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce padding and spacing throughout the UI</p>
                  </div>
                  <Switch 
                    id="compactMode" 
                    checked={compactMode}
                    onCheckedChange={setCompactMode}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveAppearance} className="w-full sm:w-auto flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/95 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">User Preferences</CardTitle>
              <CardDescription>Customize your trading experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="mb-4">
                  <Label htmlFor="defaultPage" className="text-base">Default Landing Page</Label>
                  <Select value={defaultPage} onValueChange={setDefaultPage}>
                    <SelectTrigger id="defaultPage" className="mt-2">
                      <SelectValue placeholder="Select default page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="watchlist">Watchlist</SelectItem>
                      <SelectItem value="paper-trading">Paper Trading</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="refreshInterval" className="text-base">Data Refresh Interval</Label>
                  <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                    <SelectTrigger id="refreshInterval" className="mt-2">
                      <SelectValue placeholder="Select refresh interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="paperTradingReset" className="text-base">Paper Trading Initial Balance</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input 
                      id="paperTradingReset" 
                      type="number" 
                      defaultValue="100000" 
                      min="1000"
                      className="w-48" 
                    />
                    <Button variant="outline" className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can also reset your portfolio balance from the Paper Trading page
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="showPnlNotifications" className="text-base">P&L Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for significant P&L changes</p>
                  </div>
                  <Switch 
                    id="showPnlNotifications" 
                    checked={showPnlNotifications}
                    onCheckedChange={setShowPnlNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="marketClosingAlert" className="text-base">Market Closing Alert</Label>
                    <p className="text-sm text-muted-foreground">Get notified 15 minutes before market close</p>
                  </div>
                  <Switch 
                    id="marketClosingAlert" 
                    checked={marketClosingAlert}
                    onCheckedChange={setMarketClosingAlert}
                  />
                </div>
              </div>
              
              <Button onClick={handleSavePreferences} className="w-full sm:w-auto flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
