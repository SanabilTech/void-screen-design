
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocalization } from "@/context/LocalizationContext";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { CTASection } from "@/components/landing/CTASection";

const LandingPage: React.FC = () => {
  const { direction, isArabic } = useLocalization();
  const { trackFunnelStep } = useFunnelTracking();
  
  useEffect(() => {
    // Track with the correct ID that matches the URL path - "/" or empty string
    trackFunnelStep('/');
  }, [trackFunnelStep]);
  
  return (
    <div className="flex flex-col min-h-screen" style={{ direction }}>
      <Helmet>
        <title>Jihazi - Smartphone & Laptop Leasing in Saudi Arabia | جهازي للإيجار</title>
        <meta name="description" content="Rent the latest smartphones and laptops with flexible lease terms. Get exactly what you need, when you need it." />
        <link rel="canonical" href="https://jihazi.co" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
