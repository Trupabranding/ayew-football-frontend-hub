
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

// Panel Pages
import AdminDashboard from "./pages/panels/admin/Dashboard";
import InvestorDashboard from "./pages/panels/investor/Dashboard";
import PlayerDashboard from "./pages/panels/player/Dashboard";
import PartnerDashboard from "./pages/panels/partner/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth/*" element={<Auth />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="admin">
                  <DashboardLayout role="admin">
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      {/* Add more admin routes here */}
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Investor Routes */}
            <Route
              path="/investor/*"
              element={
                <ProtectedRoute requiredRole="investor">
                  <DashboardLayout role="investor">
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<InvestorDashboard />} />
                      {/* Add more investor routes here */}
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Player Routes */}
            <Route
              path="/player/*"
              element={
                <ProtectedRoute requiredRole="player">
                  <DashboardLayout role="player">
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<PlayerDashboard />} />
                      {/* Add more player routes here */}
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Partner Routes */}
            <Route
              path="/partner/*"
              element={
                <ProtectedRoute requiredRole="partner">
                  <DashboardLayout role="partner">
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<PartnerDashboard />} />
                      {/* Add more partner routes here */}
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* 404 - Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
