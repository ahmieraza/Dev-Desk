import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import FAQ from "./pages/FAQ";

// Admin Panel Imports
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import HeaderSettings from "./admin/pages/HeaderSettings";
import HeroSettings from "./admin/pages/HeroSettings";
import ServicesManagement from "./admin/pages/ServicesManagement";
import PricingManagement from "./admin/pages/PricingManagement";
import AcademicSection from "./admin/pages/AcademicSection";
import BrandingSection from "./admin/pages/BrandingSection";
import ContactSettings from "./admin/pages/ContactSettings";
import SEOSettings from "./admin/pages/SEOSettings";
import FooterSettings from "./admin/pages/FooterSettings";
import ChangeCredentials from "./admin/pages/ChangeCredentials";
import { ThemeProvider } from "./admin/context/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<ThemeProvider><Login /></ThemeProvider>} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ThemeProvider><ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/header" element={<ThemeProvider><ProtectedRoute><AdminLayout><HeaderSettings /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/hero" element={<ThemeProvider><ProtectedRoute><AdminLayout><HeroSettings /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/services" element={<ThemeProvider><ProtectedRoute><AdminLayout><ServicesManagement /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/pricing" element={<ThemeProvider><ProtectedRoute><AdminLayout><PricingManagement /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/academic" element={<ThemeProvider><ProtectedRoute><AdminLayout><AcademicSection /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/branding" element={<ThemeProvider><ProtectedRoute><AdminLayout><BrandingSection /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/contact" element={<ThemeProvider><ProtectedRoute><AdminLayout><ContactSettings /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/seo" element={<ThemeProvider><ProtectedRoute><AdminLayout><SEOSettings /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/footer" element={<ThemeProvider><ProtectedRoute><AdminLayout><FooterSettings /></AdminLayout></ProtectedRoute></ThemeProvider>} />
          <Route path="/admin/credentials" element={<ThemeProvider><ProtectedRoute><AdminLayout><ChangeCredentials /></AdminLayout></ProtectedRoute></ThemeProvider>} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
