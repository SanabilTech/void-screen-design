
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalization } from "@/context/LocalizationContext";

interface CTASectionProps {
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ className }) => {
  const { t, direction } = useLocalization();
  
  return (
    <section className={`section ${className}`}>
      <div className="container-tight">
        <div className="relative bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]"></div>
          <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">{t("cta.title")}</h2>
            <p className="text-primary-foreground/80">
              {t("cta.description")}
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="secondary" 
              className="shadow-xl hover:shadow-2xl bg-white text-primary hover:bg-white/90"
            >
              <Link to="/products">
                {t("cta.browseDevices")}
                <ArrowRight className={direction === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
