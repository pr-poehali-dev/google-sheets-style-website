import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Data from "./pages/Data";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Data />} />
            <Route path="main" element={<Index />} />
            <Route path="templates" element={<Templates />} />
            <Route
              path="schedule"
              element={
                <div className="p-8 text-center text-gray-500">
                  Раздел в разработке
                </div>
              }
            />
            <Route
              path="drivers"
              element={
                <div className="p-8 text-center text-gray-500">
                  Раздел в разработке
                </div>
              }
            />
            <Route
              path="legal-entities"
              element={
                <div className="p-8 text-center text-gray-500">
                  Раздел в разработке
                </div>
              }
            />
            <Route
              path="warehouses"
              element={
                <div className="p-8 text-center text-gray-500">
                  Раздел в разработке
                </div>
              }
            />
            <Route
              path="tariffs"
              element={
                <div className="p-8 text-center text-gray-500">
                  Раздел в разработке
                </div>
              }
            />
            <Route
              path="help"
              element={
                <div className="p-8 text-center text-gray-500">
                  Раздел в разработке
                </div>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
