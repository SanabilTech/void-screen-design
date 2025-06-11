
import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

interface ProductsContentProps {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
}

const ProductsContent: React.FC<ProductsContentProps> = ({
  products,
  isLoading,
  error,
  searchQuery
}) => {
  const { t } = useLocalization();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 md:py-12">
        <RefreshCw className="h-6 md:h-8 w-6 md:w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 md:py-12">
        <h3 className="text-base md:text-lg font-medium mb-2">
          <TranslatableText text="Error loading products" />
        </h3>
        <p className="text-sm text-muted-foreground mb-4 md:mb-6">
          {error.message}
        </p>
        <Button onClick={() => window.location.reload()}>
          <TranslatableText text="Try Again" />
        </Button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <h3 className="text-base md:text-lg font-medium mb-2">
          <TranslatableText text="No products found" />
        </h3>
        <p className="text-sm text-muted-foreground mb-4 md:mb-6">
          {searchQuery ? (
            <TranslatableText text="We couldn't find any products matching your search." />
          ) : (
            <TranslatableText text="We couldn't find any products matching your criteria." />
          )}
        </p>
        <Button asChild>
          <a href="/products">
            <TranslatableText text="View all products" translateKey="navigation.allProducts" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
        />
      ))}
    </div>
  );
};

export default ProductsContent;
