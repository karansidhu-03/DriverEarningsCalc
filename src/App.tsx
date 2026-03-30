import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UberEarningsCalculator from "./pages/UberEarningsCalculator";
import LyftEarningsCalculator from "./pages/LyftEarningsCalculator";
import DoorDashEarningsCalculator from "./pages/DoorDashEarningsCalculator";
import DeliveryDriverCalculator from "./pages/DeliveryDriverCalculator";
import Blog from "./pages/Blog";
import BlogUberWorthIt from "./pages/BlogUberWorthIt";
import BlogUberCalgary from "./pages/BlogUberCalgary";
import BlogUberVsDoordash from "./pages/BlogUberVsDoordash";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uber-earnings-calculator" element={<UberEarningsCalculator />} />
          <Route path="/lyft-earnings-calculator" element={<LyftEarningsCalculator />} />
          <Route path="/doordash-earnings-calculator" element={<DoorDashEarningsCalculator />} />
          <Route path="/delivery-driver-calculator" element={<DeliveryDriverCalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/is-uber-worth-it-canada-2026" element={<BlogUberWorthIt />} />
          <Route path="/blog/how-much-uber-drivers-make-calgary" element={<BlogUberCalgary />} />
          <Route path="/blog/uber-vs-doordash" element={<BlogUberVsDoordash />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
