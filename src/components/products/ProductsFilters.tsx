
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Laptop, Search, Smartphone, X } from "lucide-react";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsFiltersProps {
  typeParam: string;
  handleTypeChange: (value: string) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  clearSearch: () => void;
  children: React.ReactNode;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  typeParam,
  handleTypeChange,
  searchInput,
  setSearchInput,
  handleSearch,
  isSearchOpen,
  setIsSearchOpen,
  searchInputRef,
  clearSearch,
  children
}) => {
  const { t } = useLocalization();
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-between mb-6 md:mb-8 animate-fade-in animate-delay-200">
      <Tabs defaultValue={typeParam} onValueChange={handleTypeChange} className="flex-1">
        <div className="border-b">
          <div className="flex items-center justify-between">
            <TabsList className={`bg-transparent ${isMobile ? "flex-wrap" : ""}`}>
              <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:shadow">
                <TranslatableText text="All Devices" translateKey="navigation.allProducts" />
              </TabsTrigger>
              <TabsTrigger value="smartphone" className="data-[state=active]:bg-background data-[state=active]:shadow">
                <Smartphone className="h-4 w-4 mr-1 md:mr-2" />
                <span className={isMobile ? "sr-only sm:not-sr-only" : ""}>
                  <TranslatableText text="Smartphones" translateKey="navigation.smartphones" />
                </span>
              </TabsTrigger>
              <TabsTrigger value="laptop" className="data-[state=active]:bg-background data-[state=active]:shadow">
                <Laptop className="h-4 w-4 mr-1 md:mr-2" />
                <span className={isMobile ? "sr-only sm:not-sr-only" : ""}>
                  <TranslatableText text="Laptops" translateKey="navigation.laptops" />
                </span>
              </TabsTrigger>
            </TabsList>
            
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full"
                  aria-label={t ? t("product.search") : "Search"}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-0" align={isMobile ? "center" : "end"} side={isMobile ? "bottom" : undefined}>
                <form onSubmit={handleSearch} className="flex gap-2 p-2">
                  <div className="relative flex-1">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t ? t("product.search") : "Search devices..."}
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pr-10"
                    />
                    {searchInput && (
                      <button 
                        type="button" 
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button type="submit" size={isMobile ? "sm" : "default"}>
                    <Search className="h-4 w-4 mr-1 md:mr-2" />
                    <span className={isMobile ? "sr-only sm:not-sr-only" : ""}>
                      <TranslatableText text="Search" translateKey="product.search" />
                    </span>
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {children}
      </Tabs>
    </div>
  );
};

export default ProductsFilters;
