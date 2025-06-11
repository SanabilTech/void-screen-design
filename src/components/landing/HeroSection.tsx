
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalization } from "@/context/LocalizationContext";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { t, direction, isArabic } = useLocalization();
  
  // Conditionally render the title based on language
  const heroTitle = isArabic 
    ? "أجهزة مميزة، بدون التزام" 
    : t("hero.title");

  return (
    <section className={`hero-section bg-gradient-to-b from-secondary/5 to-background pt-16 md:pt-24 ${className}`}>
      <div className="container-wide flex flex-col md:flex-row md:items-center gap-12 md:gap-8">
        <div className="md:w-1/2 space-y-6 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              {isArabic 
                ? heroTitle 
                : (
                  <>
                    {t("hero.title").split(",")[0]}, <br />
                    <span className="text-primary">{t("hero.title").split(",")[1]}</span>
                  </>
                )
              }
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-md">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              id="hero_click"
              asChild 
              size="lg" 
              className="premium-button"
            >
              <Link to="/products">
                {t("hero.exploreDevices")}
                <ArrowRight className={direction === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>{t("hero.features.freeDelivery")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>{t("hero.features.cancelAnytime")}</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end animate-fade-in animate-delay-200">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50"></div>
            <img 
              src="/lovable-uploads/e0b05975-506a-45bc-99f1-31a6d591cc8e.png" 
              alt={t("hero.tagline")}
              className="w-full max-w-md h-auto object-cover rounded-xl animate-float" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
