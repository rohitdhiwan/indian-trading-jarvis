
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Globe, TrendingUp, Clock, Briefcase, Users, Building, Phone } from "lucide-react";

interface StockCompanyInfoProps {
  stockSymbol: string;
}

const StockCompanyInfo = ({ stockSymbol }: StockCompanyInfoProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Reliance Industries Limited is India's largest private sector company operating across energy, petrochemicals, retail, telecommunications, and digital services. Founded by Dhirubhai Ambani in 1966, the company has grown to become one of India's most valuable companies by market capitalization.
          </p>
          <p className="text-sm">
            The company's Jio Platforms subsidiary has revolutionized India's telecom sector, while Reliance Retail is one of the country's largest retail businesses. The oil-to-chemicals (O2C) business continues to be a significant revenue generator. Under the leadership of Mukesh Ambani, Reliance has embarked on an ambitious transition toward renewable energy.
          </p>
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent p-2">
                <Building className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Headquarters</p>
                <p className="text-sm">Mumbai, Maharashtra, India</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent p-2">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Founded</p>
                <p className="text-sm">1966</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent p-2">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Employees</p>
                <p className="text-sm">~236,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent p-2">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Industry</p>
                <p className="text-sm">Conglomerate (Energy, Retail, Telecom)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent p-2">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Website</p>
                <p className="text-sm">
                  <a href="https://www.ril.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    www.ril.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-accent p-2">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contact</p>
                <p className="text-sm">+91-22-3555-5000</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="font-medium">₹19.55L Cr</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">P/E Ratio</p>
              <p className="font-medium">22.8</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">EPS (TTM)</p>
              <p className="font-medium">₹126.50</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Dividend Yield</p>
              <p className="font-medium">0.68%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">52-Week High</p>
              <p className="font-medium">₹2,950.00</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">52-Week Low</p>
              <p className="font-medium">₹2,195.00</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Beta</p>
              <p className="font-medium">0.92</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">ROE</p>
              <p className="font-medium">9.8%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-accent p-2">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Q2 Earnings Release</p>
                  <p className="text-xs text-muted-foreground">Financial announcement for Q2 FY 2024-25</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">Oct 22, 2024</p>
                <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>In 14 days</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-accent p-2">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Annual General Meeting</p>
                  <p className="text-xs text-muted-foreground">Annual shareholder meeting</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">Dec 15, 2024</p>
                <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>In 68 days</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockCompanyInfo;
