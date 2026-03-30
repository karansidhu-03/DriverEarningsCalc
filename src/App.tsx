import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UberEarningsCalculator from "./pages/UberEarningsCalculator";
import LyftEarningsCalculator from "./pages/LyftEarningsCalculator";
import DoorDashEarningsCalculator from "./pages/DoorDashEarningsCalculator";
import DeliveryDriverCalculator from "./pages/DeliveryDriverCalculator";
import Blog from "./pages/Blog";
import BlogUberWorthIt from "./pages/BlogUberWorthIt";
import BlogUberCalgary from "./pages/BlogUberCalgary";
import BlogUberVsDoordash from "./pages/BlogUberVsDoordash";
import MortgageCalculator from "./pages/MortgageCalculator";

const queryClient = new QueryClient();

// Senior Dev Tip: This wrapper ensures every page enters the screen with a "playful" fade-up
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="fade-in-up min-h-screen bg-background">
    {children}
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
      <Route path="/mortgage-calculator" element={<PageWrapper><MortgageCalculator /></PageWrapper>} />
      <Route path="/uber-earnings-calculator" element={<PageWrapper><UberEarningsCalculator /></PageWrapper>} />
      <Route path="/lyft-earnings-calculator" element={<PageWrapper><LyftEarningsCalculator /></PageWrapper>} />
      <Route path="/doordash-earnings-calculator" element={<PageWrapper><DoorDashEarningsCalculator /></PageWrapper>} />
      <Route path="/delivery-driver-calculator" element={<PageWrapper><DeliveryDriverCalculator /></PageWrapper>} />
      <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
      <Route path="/blog/is-uber-worth-it-canada-2026" element={<PageWrapper><BlogUberWorthIt /></PageWrapper>} />
      <Route path="/blog/how-much-uber-drivers-make-calgary" element={<PageWrapper><BlogUberCalgary /></PageWrapper>} />
      <Route path="/blog/uber-vs-doordash" element={<PageWrapper><BlogUberVsDoordash /></PageWrapper>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
