
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ExternalLink } from "lucide-react";

interface StockNewsProps {
  stockSymbol: string;
}

// Mock news data
const newsData = [
  {
    id: 1,
    title: "Reliance Industries reports strong Q4 results, beats market expectations",
    summary: "Reliance Industries Ltd reported a 17% year-on-year increase in its consolidated net profit for the quarter ended March 2024, exceeding analyst estimates. The conglomerate's digital and retail segments continue to show robust growth.",
    source: "Economic Times",
    date: "2024-04-10",
    time: "14:30",
    url: "#",
  },
  {
    id: 2,
    title: "Reliance to invest ₹75,000 crore in green energy initiatives",
    summary: "Chairman Mukesh Ambani announced that Reliance Industries will invest ₹75,000 crore over the next three years to expand its renewable energy capabilities, including solar manufacturing, hydrogen production, and energy storage solutions.",
    source: "Business Standard",
    date: "2024-04-08",
    time: "09:15",
    url: "#",
  },
  {
    id: 3,
    title: "Reliance Retail expands footprint with acquisition of fashion brand",
    summary: "Reliance Retail, a subsidiary of Reliance Industries, has acquired a popular Indian fashion brand to strengthen its presence in the premium apparel segment. The move is part of the company's strategy to expand its retail ecosystem.",
    source: "Mint",
    date: "2024-04-05",
    time: "16:45",
    url: "#",
  },
  {
    id: 4,
    title: "Jio Platforms partners with global tech firm for AI initiatives",
    summary: "Reliance's digital arm Jio Platforms has announced a strategic partnership with a leading global technology company to develop artificial intelligence solutions for the Indian market, focusing on language processing and computer vision applications.",
    source: "Financial Express",
    date: "2024-04-02",
    time: "11:20",
    url: "#",
  },
  {
    id: 5,
    title: "Analysts remain bullish on Reliance Industries, see 15% upside potential",
    summary: "Several brokerage firms have maintained their 'buy' ratings on Reliance Industries shares following the company's recent business updates and growth projections. The consensus target price indicates a potential upside of 15% from current levels.",
    source: "CNBC-TV18",
    date: "2024-03-30",
    time: "13:10",
    url: "#",
  },
];

const StockNews = ({ stockSymbol }: StockNewsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent News</CardTitle>
        <CardDescription>Latest news and developments about {stockSymbol}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {newsData.map((news) => (
          <div key={news.id} className="rounded-md border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{news.source}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{news.date}, {news.time}</span>
              </div>
            </div>
            <h3 className="mt-2 font-medium">{news.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{news.summary}</p>
            <div className="mt-3 flex justify-end">
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <span>Read Full Article</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StockNews;
