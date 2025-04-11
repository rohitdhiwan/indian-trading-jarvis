
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, ArrowDown, Info, Brain, Trash, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Local storage key for conversation history
const CHAT_HISTORY_KEY = "assistant_chat_history";
const MAX_MEMORY_ENTRIES = 20;

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

type Memory = {
  key: string;
  value: string;
  timestamp: Date;
};

const Assistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        id: 1,
        content: "👋 Hello! I'm your AI Trading Assistant with memory capabilities. How can I help you today? You can ask me about stocks, trading strategies, market analysis, or specific companies. I'll remember our conversations to provide more personalized assistance.",
        sender: "ai",
        timestamp: new Date(),
      },
    ];
  });
  
  const [memory, setMemory] = useState<Memory[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showMemory, setShowMemory] = useState(false);

  // Save messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

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

    // Process the message and update memory
    const processedInput = processInputForMemory(input);
    
    // Simulate AI response with consideration of memory
    setTimeout(() => {
      const aiResponse = generateResponse(input, memory);
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

  // Process input for memory storage
  const processInputForMemory = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Extract potential memory items
    if (lowerInput.includes("remember") || lowerInput.includes("note") || lowerInput.includes("save")) {
      // Extract what to remember (simple implementation)
      let memoryContent = userInput;
      
      if (lowerInput.includes("remember that")) {
        memoryContent = userInput.split("remember that")[1].trim();
      } else if (lowerInput.includes("remember")) {
        memoryContent = userInput.split("remember")[1].trim();
      }
      
      // Add to memory if it has content
      if (memoryContent) {
        const newMemory: Memory = {
          key: `memory-${Date.now()}`,
          value: memoryContent,
          timestamp: new Date(),
        };
        
        setMemory(prev => {
          const updated = [newMemory, ...prev].slice(0, MAX_MEMORY_ENTRIES);
          return updated;
        });
        
        return memoryContent;
      }
    }
    
    return null;
  };

  // Clear all chat history
  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        content: "Chat history has been cleared. How can I help you today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat history cleared successfully");
  };

  // Clear memory
  const handleClearMemory = () => {
    setMemory([]);
    toast.success("Memory has been cleared");
  };

  // Enhanced response generation with memory
  const generateResponse = (userInput: string, memoryItems: Memory[]): string => {
    const input = userInput.toLowerCase();
    
    // Check if the query is about memory
    if (input.includes("what do you remember") || input.includes("show memory") || input.includes("what's in your memory")) {
      if (memoryItems.length === 0) {
        return "I don't have anything stored in my memory yet. You can ask me to remember important information by saying 'remember that...' or similar phrases.";
      }
      
      return `Here's what I remember from our previous conversations:\n\n${memoryItems.map((item, index) => `${index + 1}. ${item.value}`).join('\n\n')}`;
    }
    
    // Look for relevant memories to include in the response
    const relevantMemories = findRelevantMemories(input, memoryItems);
    
    // Basic response generation based on input keywords
    if (input.includes("reliance") || input.includes("ril")) {
      let response = "Reliance Industries (RELIANCE) is currently showing a bullish trend on daily charts. The stock is trading above its 50-day moving average with increasing volumes. Based on technical indicators, there's a potential for a breakout above ₹2,890.";
      
      if (relevantMemories.length > 0) {
        response += "\n\nBased on what I remember: " + relevantMemories[0].value;
      }
      
      return response;
    } 
    else if (input.includes("nifty") || input.includes("market")) {
      let response = "The NIFTY 50 is currently in an uptrend, trading at 22,523.65 with a gain of 0.68% today. The index is showing strength above the 22,400 support level. The majority of technical indicators suggest a positive outlook in the short term.";
      
      if (relevantMemories.length > 0) {
        response += "\n\nRecalling from our previous conversation: " + relevantMemories[0].value;
      }
      
      return response;
    }
    else if (input.includes("strategy") || input.includes("trade")) {
      return "Based on current market conditions and my memory of your preferences, here are a few trading strategies to consider:\n\n1. **Momentum Strategy**: Look for stocks that have broken out of consolidation patterns with increasing volume.\n\n2. **Gap Trading**: Identify stocks with opening gaps and trade in the direction of the gap if supported by market trend.\n\n3. **Moving Average Strategy**: Buy when the 9-day EMA crosses above the 21-day EMA, sell when it crosses below.\n\nFor each strategy, it's crucial to maintain proper risk management with position sizing of 1-2% of your capital per trade.";
    }
    else if (input.includes("paper trading") || input.includes("simulation")) {
      return "Our paper trading platform allows you to practice strategies without risking real money. You can now reset your balance to any amount you choose through the 'Reset Balance' button on the Paper Trading page. This lets you simulate various starting capital scenarios. Try different strategies and track your performance metrics including win rate, profit factor, and drawdown to evaluate your trading approach before using real funds.";
    }
    else if (input.includes("remember") || input.includes("note") || input.includes("save")) {
      return "I've stored this information in my memory. I'll use it to provide more personalized responses in our future conversations.";
    }
    else if (input.includes("thank")) {
      return "You're welcome! I'm happy to help with your trading questions and strategies. Let me know if you need anything else!";
    }
    else {
      return "I'm here to help with your trading questions and remember our conversations! You can ask me about specific stocks, market analysis, trading strategies, or paper trading. You can also ask me to remember information by saying 'remember that...' or ask 'what do you remember' to see my memory contents.";
    }
  };

  // Find memories relevant to the current query
  const findRelevantMemories = (query: string, memoryItems: Memory[]): Memory[] => {
    if (memoryItems.length === 0) return [];
    
    // Simple relevance matching (keyword based)
    const queryWords = query.toLowerCase().split(/\s+/);
    
    return memoryItems.filter(item => {
      const memoryText = item.value.toLowerCase();
      return queryWords.some(word => word.length > 3 && memoryText.includes(word));
    }).slice(0, 2); // Return up to 2 relevant memories
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Trading Assistant</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-1 ${showMemory ? 'border-primary' : ''}`}
            onClick={() => setShowMemory(!showMemory)}
          >
            <Brain className="h-4 w-4" />
            <span>Memory</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ChevronDown className="h-4 w-4" />
                <span>Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Assistant Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClearChat} className="cursor-pointer">
                <Trash className="mr-2 h-4 w-4" />
                <span>Clear Chat History</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClearMemory} className="cursor-pointer">
                <Trash className="mr-2 h-4 w-4" />
                <span>Clear Memory</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Info className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid flex-1 gap-4 grid-cols-1">
        {showMemory && (
          <Card className="col-span-1 md:col-span-1 md:row-span-full overflow-hidden">
            <CardContent className="p-4 h-full overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Assistant Memory
                </h3>
                <Button variant="ghost" size="sm" onClick={handleClearMemory}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              {memory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No memories stored yet.</p>
                  <p className="text-xs mt-1">Ask me to remember information by saying "remember that..."</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {memory.map((item) => (
                    <div key={item.key} className="p-2 rounded-md bg-muted/50 text-sm">
                      <p>{item.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="flex flex-1 flex-col col-span-1 backdrop-blur-sm bg-card/95 border shadow-md">
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
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-accent text-accent-foreground shadow"
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
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-accent p-3 text-accent-foreground shadow">
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
                  className="flex-1 shadow-sm border transition-all focus:ring-2 focus:ring-primary/30"
                />
                <Button type="submit" disabled={isThinking} className="shadow-sm">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assistant;
