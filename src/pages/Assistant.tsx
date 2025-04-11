
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, ArrowDown, Info } from "lucide-react";

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

const Assistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "👋 Hello! I'm your AI Trading Assistant. How can I help you today? You can ask me about stocks, trading strategies, market analysis, or specific companies.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setIsThinking(false);
    }, 1500);
  };

  // Simple response generation based on input keywords
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("reliance") || input.includes("ril")) {
      return "Reliance Industries (RELIANCE) is currently showing a bullish trend on daily charts. The stock is trading above its 50-day moving average with increasing volumes. Based on technical indicators, there's a potential for a breakout above ₹2,890. For intraday trading, consider a buy strategy with a stop loss at ₹2,870 and targets at ₹2,920 and ₹2,950.";
    } 
    else if (input.includes("nifty") || input.includes("market")) {
      return "The NIFTY 50 is currently in an uptrend, trading at 22,523.65 with a gain of 0.68% today. The index is showing strength above the 22,400 support level. The majority of technical indicators suggest a positive outlook in the short term, with resistance levels at 22,600 and 22,750. For trading strategies, consider buying on dips with strict stop losses.";
    }
    else if (input.includes("strategy") || input.includes("trade")) {
      return "Based on current market conditions, here are a few trading strategies to consider:\n\n1. **Momentum Strategy**: Look for stocks that have broken out of consolidation patterns with increasing volume. Set a stop loss at the breakout level.\n\n2. **Gap Trading**: Identify stocks with opening gaps and trade in the direction of the gap if supported by market trend.\n\n3. **Moving Average Strategy**: Buy when the 9-day EMA crosses above the 21-day EMA, sell when it crosses below.\n\nFor each strategy, it's crucial to maintain proper risk management with position sizing of 1-2% of your capital per trade.";
    }
    else if (input.includes("backtest") || input.includes("performance")) {
      return "Backtesting is an essential step in validating trading strategies. Our system shows that for the Indian market, momentum strategies have performed well with a 68% win rate over the past year. Mean reversion strategies work better in sideways markets with a 62% success rate. The key to successful backtesting is to include sufficient historical data covering various market conditions and to account for execution costs and slippage.";
    }
    else if (input.includes("recommend") || input.includes("suggestion")) {
      return "Based on current market analysis, here are a few stock recommendations:\n\n1. **HDFC Bank (HDFCBANK)**: Showing strong support at ₹1,620. Swing trade opportunity with 3-5 day holding period. Target: ₹1,720\n\n2. **Tata Motors (TATAMOTORS)**: Potential for intraday short on breaking ₹940 level. Target: ₹920\n\n3. **Infosys (INFY)**: Accumulate on dips for long-term portfolio. Strong fundamentals and technical support visible at ₹1,480.\n\nAlways use stop losses and size positions according to your risk tolerance.";
    }
    else if (input.includes("paper trading") || input.includes("simulation")) {
      return "Paper trading is a great way to practice strategies without risking real money. Our platform offers paper trading with real-time market data, allowing you to simulate your trades accurately. To start paper trading, go to the Paper Trading section from the sidebar, set your virtual capital amount, and begin executing trades. The system will track your performance metrics including win rate, profit factor, and drawdown to help you evaluate your strategies.";
    }
    else {
      return "I'm here to help with your trading questions! You can ask me about specific stocks, market analysis, trading strategies, backtesting results, or request recommendations based on current market conditions. What specific aspect of trading would you like to explore?";
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Trading Assistant</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span>Help</span>
        </Button>
      </div>

      <Card className="flex flex-1 flex-col">
        <CardContent className="flex h-full flex-col gap-4 p-4">
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      {message.sender === "ai" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === "ai" ? "AI Assistant" : "You"}
                      </span>
                    </div>
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                    <p className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg bg-accent p-3 text-accent-foreground">
                    <div className="mb-1 flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-current"></div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-current" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-current" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-full right-0 mb-2"
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                placeholder="Ask about stocks, strategies, or market analysis..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistant;
