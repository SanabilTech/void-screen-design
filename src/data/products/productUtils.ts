
import { Product, DeviceCondition, StorageOption, ColorOption } from "@/types/product";
import { products } from "./productsList";
import { supabase } from "@/integrations/supabase/client";

// Optimized product fetch with better error handling and less nested queries
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    // First attempt to retrieve from Supabase
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (productError) {
      console.error("Error fetching product:", productError);
      // Fallback to static data if database fetch fails
      return products.find(product => product.slug === slug) || null;
    }

    // Parallel queries for better performance
    const [featuresResponse, storageResponse, colorResponse, conditionsResponse] = await Promise.all([
      supabase.from("product_features").select("feature").eq("product_id", productData.id),
      supabase.from("storage_options").select("*").eq("product_id", productData.id),
      supabase.from("color_options").select("*").eq("product_id", productData.id),
      supabase.from("product_conditions").select("*").eq("product_id", productData.id)
    ]);

    // Check for errors in any of the parallel queries
    if (featuresResponse.error) console.error("Error fetching features:", featuresResponse.error);
    if (storageResponse.error) console.error("Error fetching storage options:", storageResponse.error);
    if (colorResponse.error) console.error("Error fetching color options:", colorResponse.error);
    if (conditionsResponse.error) console.error("Error fetching conditions:", conditionsResponse.error);

    // Transform database data to Product type
    const transformedProduct: Product = {
      id: productData.id,
      name: productData.name,
      name_ar: productData.name_ar,
      brand: productData.brand,
      type: productData.type_id as "smartphone" | "laptop",
      basePrice: Number(productData.base_price),
      slug: productData.slug,
      description: productData.description,
      description_ar: productData.description_ar,
      imageUrl: productData.image_url,
      features: featuresResponse.data ? featuresResponse.data.map((f: any) => f.feature) : [],
      availableStorage: storageResponse.data ? storageResponse.data.map((s: any) => ({
        id: s.storage_id,
        capacity: s.capacity,
        priceModifier: Number(s.price_modifier) || 0
      })) : [],
      availableColors: colorResponse.data ? colorResponse.data.map((c: any) => ({
        id: c.color_id,
        name: c.name,
        value: c.value,
        priceModifier: Number(c.price_modifier) || 0,
        imageUrl: c.image_url
      })) : [],
      availableConditions: conditionsResponse.data 
        ? conditionsResponse.data
            .filter((c: any) => c.is_available)
            .map((c: any) => c.condition as DeviceCondition)
        : ["new", "refurbished"]
    };

    return transformedProduct;
  } catch (error) {
    console.error("Error in getProductBySlug:", error);
    // Fallback to static data in case of errors
    return products.find(product => product.slug === slug) || null;
  }
};

// Calculate the final price of a product based on selected options
export const calculateProductPrice = (
  basePrice: number,
  selectedStorage: StorageOption | null,
  selectedColor: ColorOption | null,
  selectedCondition?: DeviceCondition
): number => {
  let finalPrice = basePrice;
  
  if (selectedStorage) {
    finalPrice += selectedStorage.priceModifier;
  }
  
  if (selectedColor) {
    finalPrice += selectedColor.priceModifier;
  }
  
  // Apply condition-based discount if applicable
  if (selectedCondition === "refurbished") {
    // Apply a 15% discount for refurbished items
    finalPrice = finalPrice * 0.85;
  }
  
  return finalPrice;
};

// Get unique product categories
export const getProductCategories = (): string[] => {
  const categories = products.map(product => product.type);
  return [...new Set(categories)];
};
