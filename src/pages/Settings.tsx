
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FyersSetup from "@/components/settings/FyersSetup";

const Settings = () => {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="api">
        <TabsList className="mb-4">
          <TabsTrigger value="api">API Connections</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api" className="space-y-4">
          <FyersSetup />
        </TabsContent>
        
        <TabsContent value="appearance">
          <div className="rounded-md border p-6">
            <h3 className="text-lg font-medium">Appearance Settings</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="preferences">
          <div className="rounded-md border p-6">
            <h3 className="text-lg font-medium">User Preferences</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
