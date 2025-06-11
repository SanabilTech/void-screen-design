
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Laptop, Smartphone } from "lucide-react";
import { useLocalization } from "@/context/LocalizationContext";

interface CategoriesSectionProps {
  className?: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ className }) => {
  const { t, direction } = useLocalization();
  
  return (
    <section className={`section bg-secondary/5 ${className}`}>
      <div className="container-wide">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t("categories.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("categories.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/products?type=smartphone" 
            className="relative group overflow-hidden rounded-2xl h-80 shadow-lg animate-fade-in"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 z-10"></div>
            <img
              src="/lovable-uploads/f16fbb97-c380-4733-9cf6-e95456484135.png"
              alt={t("categories.smartphones.title")}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="h-5 w-5 text-white" />
                <h3 className="text-2xl font-bold text-white">{t("categories.smartphones.title")}</h3>
              </div>
              <p className="text-white/80 mb-4">
                {t("categories.smartphones.description")}
              </p>
              <span className="inline-flex items-center text-gray-300 font-medium">
                {t("categories.smartphones.cta")}
                <ArrowRight className={direction === "rtl" ? "mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" : "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"} />
              </span>
            </div>
          </Link>

          <Link 
            to="/products?type=laptop" 
            className="relative group overflow-hidden rounded-2xl h-80 shadow-lg animate-fade-in animate-delay-200"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 z-10"></div>
            <img
              src="/lovable-uploads/a7b622dd-e18a-4521-b992-eb74aa512ea3.png"
              alt={t("categories.laptops.title")}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
              <div className="flex items-center gap-2 mb-2">
                <Laptop className="h-5 w-5 text-white" />
                <h3 className="text-2xl font-bold text-white">{t("categories.laptops.title")}</h3>
              </div>
              <p className="text-white/80 mb-4">
                {t("categories.laptops.description")}
              </p>
              <span className="inline-flex items-center text-gray-300 font-medium">
                {t("categories.laptops.cta")}
                <ArrowRight className={direction === "rtl" ? "mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" : "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
