
import React from "react";
import { Link } from "react-router-dom";
import { Product, ProductCondition } from "../../types/product";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import SARSymbol from "./SARSymbol";
import ProductCertificationBadge from "./ProductCertificationBadge";
import TranslatableText from "./TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { direction, isArabic } = useLocalization();
  
  const { data: dbPrice } = useQuery({
    queryKey: ['productCardPrice', product.id],
    queryFn: async () => {
      const { data: productRecord } = await supabase
        .from('products')
        .select('id')
        .eq('id', product.id)
        .maybeSingle();
      
      if (!productRecord) {
        return null;
      }

      const defaultStorage = product.availableStorage[0]?.id;
      const defaultColor = product.availableColors[0]?.id;
      
      if (!defaultStorage || !defaultColor) {
        return null;
      }

      const { data } = await supabase
        .from('product_pricing')
        .select('price')
        .eq('product_id', product.id)
        .eq('storage_id', defaultStorage)
        .eq('color_id', defaultColor)
        .eq('condition', 'new')
        .eq('lease_term_id', '12month')
        .maybeSingle();

      return data?.price;
    }
  });

  const { data: conditions } = useQuery({
    queryKey: ['productCardConditions', product.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_conditions')
        .select('condition, is_available')
        .eq('product_id', product.id);
        
      if (error) {
        console.error("Error fetching product conditions:", error);
        return [];
      }
      
      return data.map(item => ({
        condition: item.condition,
        isAvailable: item.is_available
      })) as ProductCondition[];
    }
  });

  const displayPrice = dbPrice !== null && dbPrice !== undefined ? dbPrice : product.basePrice;
  
  return (
    <Link 
      to={`/products/${product.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full animate-fade-in"
      style={{ direction }} // Apply direction from context
    >
      <div className="aspect-square overflow-hidden bg-gray-50 p-6 flex flex-col items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain h-48 w-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="mt-2">
          <ProductCertificationBadge />
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col" style={{ textAlign: isArabic ? 'right' : 'left' }}>
        <div className="mb-4 flex items-center gap-2 flex-wrap" style={{ justifyContent: isArabic ? 'flex-end' : 'flex-start' }}>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs">
            <TranslatableText text={product.brand} />
          </Badge>
          
          <Badge variant="outline" className="px-2 py-0.5 text-xs flex items-center gap-1">
            {product.type === "smartphone" ? (
              <>
                <Smartphone className="h-3 w-3" />
                <TranslatableText text="Phone" translateKey="navigation.smartphones" />
              </>
            ) : (
              <>
                <Laptop className="h-3 w-3" />
                <TranslatableText text="Laptop" translateKey="navigation.laptops" />
              </>
            )}
          </Badge>

          {conditions?.map(condition => 
            condition.isAvailable && (
              <Badge 
                key={condition.condition}
                variant={condition.condition === "new" ? "success" : "warning"}
                className="px-2 py-0.5 text-xs"
              >
                <TranslatableText 
                  text={condition.condition === "new" ? "New" : "Refurbished"} 
                  translateKey={`product.condition.${condition.condition}`}
                />
              </Badge>
            )
          )}
        </div>
        
        <h3 className="text-base md:text-lg font-medium text-balance line-clamp-1 mb-1">
          <TranslatableText text={product.name} name_ar={product.name_ar} />
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          <TranslatableText text={product.description} description_ar={product.description_ar} />
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center" style={{ justifyContent: isArabic ? 'flex-end' : 'flex-start' }}>
            {isArabic ? (
              <p className="text-xl font-semibold flex items-center">
                <span className="mx-1">شهريًا</span>
                <SARSymbol />
                {displayPrice}
              </p>
            ) : (
              <p className="text-xl font-semibold flex items-center">
                <SARSymbol />
                {displayPrice}
              </p>
            )}
            <span className="text-sm text-muted-foreground ml-1">
              {isArabic ? "" : "/mo"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {isArabic ? `من ${product.availableStorage[0].capacity}` : `From ${product.availableStorage[0].capacity}`}
          </p>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </Link>
  );
};

export default ProductCard;
