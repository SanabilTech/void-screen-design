
import React, { useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalization } from "@/context/LocalizationContext";
import TranslatableText from "@/components/ui/TranslatableText";

interface ProductsHeaderProps {
  typeParam: string;
  searchQuery: string;
  clearSearch: () => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ 
  typeParam, 
  searchQuery, 
  clearSearch 
}) => {
  const { t } = useLocalization();
  
  const pageTitle = useMemo(() => {
    if (typeParam === "smartphone") return t("navigation.smartphones");
    if (typeParam === "laptop") return t("navigation.laptops");
    return t("navigation.allProducts");
  }, [typeParam, t]);

  const pageDescription = useMemo(() => {
    if (typeParam === "smartphone") {
      return t("categories.smartphones.description");
    } else if (typeParam === "laptop") {
      return t("categories.laptops.description");
    } else {
      return t("categories.description");
    }
  }, [typeParam, t]);

  return (
    <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight animate-fade-in">
        {pageTitle}
      </h1>
      <p className="text-sm md:text-base text-muted-foreground max-w-3xl animate-fade-in animate-delay-100">
        {pageDescription}
      </p>
      
      {searchQuery && (
        <div className="mb-4 md:mb-6 flex items-center animate-fade-in">
          <p className="text-xs sm:text-sm text-muted-foreground mr-2">
            <TranslatableText text="Search results for:" />
            <span className="font-medium text-foreground ml-1">"{searchQuery}"</span>
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearSearch}
            className="h-6 md:h-7 px-1 md:px-2"
          >
            <X className="h-3 w-3 mr-0.5 md:mr-1" />
            <TranslatableText text="Clear" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsHeader;
