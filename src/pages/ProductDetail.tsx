
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { leaseTerms } from "../data/leaseTerms";
import { 
  StorageOption, 
  ColorOption, 
  DeviceCondition, 
  LeaseTerm,
  Product,
  ProductCondition,
  DeviceType
} from "../types/product";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useLocalization } from "@/context/LocalizationContext";
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

import ProductImageDisplay from "@/components/product/ProductImageDisplay";
import ProductHeader from "@/components/product/ProductHeader";
import ProductConfiguration from "@/components/product/ProductConfiguration";
import ProductPriceSection from "@/components/product/ProductPriceSection";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductLoadingState from "@/components/product/ProductLoadingState";
import ProductNotFound from "@/components/product/ProductNotFound";
import { getProductBySlug, calculateProductPrice } from "@/data/products";

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useShoppingCart();
  const { t } = useLocalization();
  const { trackFunnelStep } = useFunnelTracking();
  
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition>("new");
  const [selectedLeaseTerm, setSelectedLeaseTerm] = useState<LeaseTerm | null>(leaseTerms[1]);
  const [databasePrice, setDatabasePrice] = useState<number | undefined>(undefined);
  const [availableConditions, setAvailableConditions] = useState<ProductCondition[]>([]);

  // Track funnel step on component mount
  useEffect(() => {
    trackFunnelStep('details');
  }, [trackFunnelStep]);

  // Use a single query to fetch product data
  const { 
    data: product, 
    isLoading: isLoadingProduct, 
    error: productError 
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (!slug) return null;
      try {
        // Use the existing utility function that performs the fetch
        const productData = await getProductBySlug(slug);
        return productData;
      } catch (error) {
        console.error("Error fetching product:", error);
        return null;
      }
    },
    staleTime: 300000, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });

  // Fetch product conditions only when product is available
  const { data: conditionsData, isLoading: isLoadingConditions } = useQuery({
    queryKey: ['productConditions', product?.id],
    queryFn: async () => {
      if (!product?.id) return [];
      
      const { data, error } = await supabase
        .from('product_conditions')
        .select('condition, is_available')
        .eq('product_id', product.id);
        
      if (error) {
        console.error("Error fetching product conditions:", error);
        return [];
      }
      
      return data.map(item => ({
        condition: item.condition as DeviceCondition,
        isAvailable: item.is_available
      }));
    },
    enabled: !!product?.id,
    staleTime: 300000, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });

  // Set initial values when product data is loaded
  useEffect(() => {
    if (product) {
      if (product.availableStorage.length > 0) {
        setSelectedStorage(product.availableStorage[0]);
      }
      
      if (product.availableColors.length > 0) {
        setSelectedColor(product.availableColors[0]);
      }
    }
  }, [product]);

  // Update available conditions when conditions data is loaded
  useEffect(() => {
    if (conditionsData && conditionsData.length > 0) {
      setAvailableConditions(conditionsData);
      
      const currentIsAvailable = conditionsData.some(
        c => c.condition === selectedCondition && c.isAvailable
      );
      
      if (!currentIsAvailable) {
        const firstAvailable = conditionsData.find(c => c.isAvailable);
        if (firstAvailable) {
          setSelectedCondition(firstAvailable.condition);
        }
      }
    }
  }, [conditionsData, selectedCondition]);

  // Fetch product price efficiently
  const { isLoading: isPriceLoading, data: priceData } = useQuery({
    queryKey: ['productPrice', product?.id, selectedStorage?.id, selectedColor?.id, selectedCondition, selectedLeaseTerm?.id],
    queryFn: async () => {
      if (!product?.id || !selectedStorage?.id || !selectedColor?.id || !selectedLeaseTerm?.id) {
        return null;
      }

      const { data, error } = await supabase
        .from('product_pricing')
        .select('price')
        .eq('product_id', product.id)
        .eq('storage_id', selectedStorage.id)
        .eq('color_id', selectedColor.id)
        .eq('condition', selectedCondition)
        .eq('lease_term_id', selectedLeaseTerm.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching price:', error);
        return null;
      }

      return data?.price;
    },
    enabled: !!product?.id && !!selectedStorage?.id && !!selectedColor?.id && !!selectedLeaseTerm?.id,
    staleTime: 60000, // Cache for 1 minute
    refetchOnWindowFocus: false
  });

  // Update database price when price data is loaded
  useEffect(() => {
    if (priceData !== undefined) {
      setDatabasePrice(priceData || undefined);
    }
  }, [priceData]);

  const handleAddToCart = () => {
    if (!product || !selectedStorage || !selectedColor || !selectedLeaseTerm) return;
    
    addItem(product, {
      productId: product.id,
      selectedStorage,
      selectedColor,
      selectedCondition,
      selectedLeaseTerm,
    });
  };

  const handleCheckout = () => {
    if (!product || !selectedStorage || !selectedColor || !selectedLeaseTerm) return;
    
    const checkoutConfig = {
      productId: product.id,
      productName: product.name,
      productImageUrl: selectedColor?.imageUrl || product.imageUrl,
      selectedStorage,
      selectedColor,
      selectedCondition,
      selectedLeaseTerm,
      price: databasePrice !== undefined ? databasePrice : 
        calculateProductPrice(
          product.basePrice,
          selectedStorage,
          selectedColor,
          selectedCondition
        )
    };
    
    sessionStorage.setItem('checkoutConfig', JSON.stringify(checkoutConfig));
    navigate('/checkout');
  };

  if (isLoadingProduct || isLoadingConditions) {
    return <ProductLoadingState />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const filteredConditions = availableConditions.filter(c => c.isAvailable).map(c => c.condition);
  const displayImageUrl = selectedColor?.imageUrl || product?.imageUrl || "/placeholder.svg";
  
  return (
    <div className="flex flex-col min-h-screen pt-24 md:pt-28">
      <div className="container-wide py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('product.back')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
          <ProductImageDisplay 
            imageUrl={displayImageUrl} 
            productName={product.name} 
          />

          <div className="space-y-6">
            <ProductHeader 
              brand={product.brand}
              type={product.type}
              name={product.name}
              name_ar={product.name_ar}
              description={product.description}
              description_ar={product.description_ar}
              availableConditions={availableConditions}
            />

            <Separator />

            <ProductConfiguration 
              availableStorage={product.availableStorage}
              selectedStorage={selectedStorage}
              onStorageChange={(id) => setSelectedStorage(product.availableStorage.find(s => s.id === id) || null)}
              
              availableColors={product.availableColors}
              selectedColor={selectedColor}
              onColorChange={(id) => setSelectedColor(product.availableColors.find(c => c.id === id) || null)}
              
              selectedCondition={selectedCondition}
              onConditionChange={setSelectedCondition}
              availableConditions={filteredConditions}
              
              leaseTerms={leaseTerms}
              selectedLeaseTerm={selectedLeaseTerm}
              onLeaseTermChange={(id) => setSelectedLeaseTerm(leaseTerms.find(t => t.id === id) || null)}
            />

            <Separator />

            <ProductPriceSection 
              product={product}
              selectedStorage={selectedStorage}
              selectedColor={selectedColor}
              selectedCondition={selectedCondition}
              selectedLeaseTerm={selectedLeaseTerm}
              isPriceLoading={isPriceLoading}
              databasePrice={databasePrice}
              onCheckout={handleCheckout}
              availableConditions={filteredConditions}
            />

            <ProductFeatures features={product.features} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
