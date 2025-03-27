
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider, RequireAuth } from "./context/AuthContext";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const SellItem = lazy(() => import("./pages/SellItem"));
const Favorites = lazy(() => import("./pages/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Notifications = lazy(() => import("./pages/Notifications"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ChatWithSeller = lazy(() => import("./pages/ChatWithSeller"));
const SellerProfile = lazy(() => import("./pages/SellerProfile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Index = lazy(() => import("./pages/Index"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            <Toaster />
            <Sonner />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Index />} />
                
                <Route 
                  path="/home" 
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/product/:id" 
                  element={
                    <RequireAuth>
                      <ProductDetail />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/sell" 
                  element={
                    <RequireAuth>
                      <SellItem />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <RequireAuth>
                      <Favorites />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/notifications" 
                  element={
                    <RequireAuth>
                      <Notifications />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/chat/:sellerId/product/:productId" 
                  element={
                    <RequireAuth>
                      <ChatWithSeller />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/seller/:sellerId" 
                  element={
                    <RequireAuth>
                      <SellerProfile />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <RequireAuth>
                      <AdminDashboard />
                    </RequireAuth>
                  } 
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
