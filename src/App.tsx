
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import FAQPage from "./pages/FAQPage";
import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { LocalizationProvider } from "./context/LocalizationContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminAuthPage from "./pages/AdminAuthPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminAddProductPage from "./pages/AdminAddProductPage";
import AdminEditProductPage from "./pages/AdminEditProductPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminFunnelAnalyticsPage from "./pages/AdminFunnelAnalyticsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocalizationProvider>
        <ShoppingCartProvider>
          <AdminAuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    {/* Admin routes */}
                    <Route path="/admin" element={<AdminAuthPage />} />
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/orders" element={<AdminOrdersPage />} />
                    <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                    <Route path="/admin/products" element={<AdminProductsPage />} />
                    <Route path="/admin/products/new" element={<AdminAddProductPage />} />
                    <Route path="/admin/products/edit/:slug" element={<AdminEditProductPage />} />
                    <Route path="/admin/funnel-analytics" element={<AdminFunnelAnalyticsPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </AdminAuthProvider>
        </ShoppingCartProvider>
      </LocalizationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
