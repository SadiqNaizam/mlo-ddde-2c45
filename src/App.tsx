import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Assetdetailpage from "./pages/Assetdetailpage";
import Maindashboard from "./pages/Maindashboard";
import Portfoliopage from "./pages/Portfoliopage";
import Settingspage from "./pages/Settingspage";
import Watchlistpage from "./pages/Watchlistpage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Maindashboard />} />
          <Route path="/assetdetailpage" element={<Assetdetailpage />} />
          <Route path="/portfoliopage" element={<Portfoliopage />} />
          <Route path="/settingspage" element={<Settingspage />} />
          <Route path="/watchlistpage" element={<Watchlistpage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
