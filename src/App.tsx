
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import StockDetail from "./pages/StockDetail";
import CryptoDetail from "./pages/CryptoDetail";
import Assistant from "./pages/Assistant";
import PaperTrading from "./pages/PaperTrading";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/stock/:symbol" element={<AppLayout><StockDetail /></AppLayout>} />
          <Route path="/crypto/:symbol" element={<AppLayout><CryptoDetail /></AppLayout>} />
          <Route path="/assistant" element={<AppLayout><Assistant /></AppLayout>} />
          <Route path="/paper-trading" element={<AppLayout><PaperTrading /></AppLayout>} />
          {/* These routes will be implemented later */}
          <Route path="/watchlist" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/strategies" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/news" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/about" element={<AppLayout><Dashboard /></AppLayout>} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
