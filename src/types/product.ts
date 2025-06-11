
export type DeviceType = "smartphone" | "laptop";

export type DeviceCondition = "new" | "refurbished";

export type ExactPrices = {
  [key: string]: number;
};

export type StorageExactPrices = {
  [storageId: string]: {
    [termId: string]: number;
  };
};

export interface StorageOption {
  id: string;
  capacity: string;
  priceModifier: number; // Add to base price
  exactPrices?: ExactPrices; // Optional exact prices by lease term
}

export interface ColorOption {
  id: string;
  name: string;
  value: string; // CSS color value
  priceModifier: number; // Add to base price
  imageUrl?: string; // Optional URL for color-specific product image
  exactPrices?: StorageExactPrices; // Optional exact prices by storage and lease term
}

export interface LeaseTerm {
  id: string;
  name: string;
  durationMonths: number;
  description: string;
  priceMultiplier: number; // Multiplied by base price
}

export interface Product {
  id: string;
  name: string;
  name_ar?: string; // Arabic name
  brand: string;
  type: DeviceType;
  basePrice: number; // Monthly price for base model on monthly term
  slug: string;
  description: string;
  description_ar?: string; // Arabic description
  features: string[];
  imageUrl: string;
  availableStorage: StorageOption[];
  availableColors: ColorOption[];
  availableConditions: DeviceCondition[];
}

export interface ProductCondition {
  condition: DeviceCondition;
  isAvailable: boolean;
}

export interface ProductConfiguration {
  productId: string;
  selectedStorage: StorageOption | null;
  selectedColor: ColorOption | null;
  selectedCondition: DeviceCondition;
  selectedLeaseTerm: LeaseTerm | null;
}

export interface CartItem extends ProductConfiguration {
  quantity: number;
  product: Product;
}
