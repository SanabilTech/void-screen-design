
import React, { useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useLocalization } from "@/context/LocalizationContext";
import { useFunnelTracking } from '@/hooks/useFunnelTracking';
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsFilters from "@/components/products/ProductsFilters";
import ProductsContent from "@/components/products/ProductsContent";
import { useProductsData } from "@/components/products/useProductsData";

const ProductsPage: React.FC = () => {
  const { direction } = useLocalization();
  const { trackFunnelStep } = useFunnelTracking();
  const {
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
  } = useProductsData();

  useEffect(() => {
    trackFunnelStep('products');
  }, [trackFunnelStep]);

  return (
    <div className="flex flex-col min-h-screen pt-24 md:pt-28" style={{ direction }}>
      <section className="section pb-8 pt-4">
        <div className="container-wide">
          <ProductsHeader 
            typeParam={typeParam}
            searchQuery={searchQuery}
            clearSearch={clearSearch}
          />

          <ProductsFilters
            typeParam={typeParam}
            handleTypeChange={handleTypeChange}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            searchInputRef={searchInputRef}
            clearSearch={clearSearch}
          >
            <TabsContent value="all" className="m-0 mt-6">
              <ProductsContent 
                products={products}
                isLoading={isLoading}
                error={error}
                searchQuery={searchQuery}
              />
            </TabsContent>
            
            <TabsContent value="smartphone" className="m-0 mt-6">
              <ProductsContent 
                products={products}
                isLoading={isLoading}
                error={error}
                searchQuery={searchQuery}
              />
            </TabsContent>
            
            <TabsContent value="laptop" className="m-0 mt-6">
              <ProductsContent 
                products={products}
                isLoading={isLoading}
                error={error}
                searchQuery={searchQuery}
              />
            </TabsContent>
          </ProductsFilters>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
