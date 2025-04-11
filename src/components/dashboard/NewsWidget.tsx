
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Clock } from "lucide-react";

// Mock news data
const newsItems = [
  {
    id: 1,
    title: "RBI maintains repo rate at 6.5% for 8th consecutive time",
    source: "Economic Times",
    time: "1h ago",
    url: "#",
  },
  {
    id: 2,
    title: "Reliance Industries reports Q4 net profit up 17%",
    source: "Business Standard",
    time: "3h ago",
    url: "#",
  },
  {
    id: 3,
    title: "SEBI introduces new regulations for derivatives trading",
    source: "Moneycontrol",
    time: "5h ago",
    url: "#",
  },
];

const NewsWidget = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Market News</CardTitle>
        <CardDescription>Latest updates from Indian markets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {newsItems.map((news) => (
          <a 
            key={news.id}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md p-2 hover:bg-accent transition-colors"
          >
            <p className="font-medium line-clamp-2">{news.title}</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{news.source}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{news.time}</span>
              </div>
            </div>
          </a>
        ))}
        <div className="flex justify-center pt-2">
          <a href="/news" className="flex items-center gap-1 text-sm text-primary">
            <span>More news</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsWidget;
