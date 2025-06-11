
import { Product } from "../../../../types/product";

export const iphone15Plus: Product = {
  id: "iphone-15-plus",
  name: "iPhone 15 Plus",
  brand: "Apple",
  type: "smartphone",
  basePrice: 234, // Doubled from 117
  slug: "iphone-15-plus",
  description: "Apple's iPhone 15 Plus with a large 6.7-inch display, powerful A16 Bionic chip, and exceptional camera system.",
  features: [
    "6.7-inch Super Retina XDR display",
    "A16 Bionic chip with enhanced performance",
    "Dual camera system with 48MP main camera",
    "Durable design with Ceramic Shield",
    "All-day battery life",
    "Face ID"
  ],
  imageUrl: "https://m.media-amazon.com/images/I/610fHdeK4LL._AC_SL1500_.jpg",
  availableStorage: [
    { id: "128gb", capacity: "128GB", priceModifier: 0 },
    { id: "256gb", capacity: "256GB", priceModifier: 48 },  // Doubled from 24
    { id: "512gb", capacity: "512GB", priceModifier: 110 }  // Doubled from 55
  ],
  availableColors: [
    { id: "black", name: "Black", value: "#000000", priceModifier: 0, imageUrl: "https://m.media-amazon.com/images/I/610fHdeK4LL._AC_SL1500_.jpg" },
    { id: "green", name: "Green", value: "#4CAF50", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/6/3/c/1/63c1409385d6f4954e4340db4111a3169ba19a82_623654.jpg" },
    { id: "pink", name: "Pink", value: "#FFC0CB", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/4/2/1/7/4217ee2d213500e8ae87bcef9a7c6387748df444_623593.jpg" },
    { id: "blue", name: "Blue", value: "#2196F3", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/3/7/f/b/37fb9052233be16899dd641797fd6f633774a5a6_623651.jpg" }
  ],
  availableConditions: ["new", "refurbished"]
};
