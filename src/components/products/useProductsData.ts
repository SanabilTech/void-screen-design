
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export const useProductsData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleTypeChange = (value: string) => {
    if (value === "all") {
      searchParams.delete("type");
    } else {
      searchParams.set("type", value);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchParams.set("search", searchInput.trim());
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchInput("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  const { isLoading, error, data: products } = useQuery({
    queryKey: ['products', typeParam, searchQuery],
    queryFn: async () => {
      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            product_features(feature)
          `);
        
        if (typeParam !== "all") {
          query = query.eq('type_id', typeParam);
        }
        
        if (searchQuery) {
          query = query.ilike('name', `%${searchQuery}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching products:", error);
          throw new Error("Failed to fetch products");
        }
        
        if (!data || data.length === 0) {
          return [];
        }

        const productIds = data.map(item => item.id);
        
        const [storageResults, colorResults] = await Promise.all([
          supabase.from('storage_options').select('*').in('product_id', productIds),
          supabase.from('color_options').select('*').in('product_id', productIds)
        ]);
        
        const storageByProductId = (storageResults.data || []).reduce((acc, item) => {
          if (!acc[item.product_id]) acc[item.product_id] = [];
          acc[item.product_id].push(item);
          return acc;
        }, {} as Record<string, any[]>);
        
        const colorsByProductId = (colorResults.data || []).reduce((acc, item) => {
          if (!acc[item.product_id]) acc[item.product_id] = [];
          acc[item.product_id].push(item);
          return acc;
        }, {} as Record<string, any[]>);

        const transformedProducts: Product[] = data.map((item) => {
          const storageData = storageByProductId[item.id] || [];
          const colorData = colorsByProductId[item.id] || [];
          
          return {
            id: item.id,
            name: item.name,
            name_ar: item.name_ar,
            brand: item.brand,
            type: item.type_id as "smartphone" | "laptop",
            basePrice: item.base_price,
            slug: item.slug,
            description: item.description,
            description_ar: item.description_ar,
            imageUrl: item.image_url,
            features: item.product_features ? item.product_features.map((f: any) => f.feature) : [],
            availableStorage: storageData.map((s) => ({
              id: s.storage_id,
              capacity: s.capacity,
              priceModifier: s.price_modifier || 0
            })),
            availableColors: colorData.map((c) => ({
              id: c.color_id,
              name: c.name,
              value: c.value,
              priceModifier: c.price_modifier || 0,
              imageUrl: c.image_url
            })),
            availableConditions: ["new", "refurbished"]
          };
        });
        
        return transformedProducts;
      } catch (error) {
        console.error("Error in fetchProducts:", error);
        return [];
      }
    },
    staleTime: 300000,
    refetchOnWindowFocus: false
  });

  return {
    typeParam,
    searchQuery,
    searchInput,
    setSearchInput,
    isSearchOpen,
    setIsSearchOpen,
    searchInputRef,
    handleTypeChange,
    handleSearch,
    clearSearch,
    products,
    isLoading,
    error
  };
};
