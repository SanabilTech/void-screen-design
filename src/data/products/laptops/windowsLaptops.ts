
import { Product } from "../../../types/product";
import { lenovoLaptops } from "./lenovoLaptops";

export const windowsLaptops: Product[] = [
  {
    id: "dell-xps-15",
    name: "Dell XPS 15",
    brand: "Dell",
    type: "laptop",
    basePrice: 139.98, // Doubled from 69.99
    slug: "dell-xps-15",
    description: "Premium Windows laptop with stunning display and powerful performance.",
    features: [
      "15.6-inch 4K UHD+ display",
      "12th Gen Intel Core processors",
      "NVIDIA GeForce RTX graphics",
      "Up to 64GB memory",
      "Up to 2TB storage",
      "CNC machined aluminum chassis"
    ],
    imageUrl: "/placeholder.svg",
    availableStorage: [
      { id: "512gb", capacity: "512GB", priceModifier: 0 },
      { id: "1tb", capacity: "1TB", priceModifier: 20 },     // Doubled from 10
      { id: "2tb", capacity: "2TB", priceModifier: 40 }      // Doubled from 20
    ],
    availableColors: [
      { id: "platinum-silver", name: "Platinum Silver", value: "#D0D0D0", priceModifier: 0 },
      { id: "frost-white", name: "Frost White", value: "#F7F7F7", priceModifier: 10 }  // Doubled from 5
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "thinkpad-x1-carbon",
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    type: "laptop",
    basePrice: 119.98, // Doubled from 59.99
    slug: "thinkpad-x1-carbon",
    description: "Legendary business laptop with premium build quality and performance.",
    features: [
      "14-inch WUXGA display",
      "12th Gen Intel Core processors",
      "Up to 32GB LPDDR5 memory",
      "Up to 2TB SSD storage",
      "Military-grade durability",
      "Iconic ThinkPad keyboard"
    ],
    imageUrl: "/placeholder.svg",
    availableStorage: [
      { id: "256gb", capacity: "256GB", priceModifier: 0 },
      { id: "512gb", capacity: "512GB", priceModifier: 10 },  // Doubled from 5
      { id: "1tb", capacity: "1TB", priceModifier: 20 }       // Doubled from 10
    ],
    availableColors: [
      { id: "black", name: "Black", value: "#232323", priceModifier: 0 }
    ],
    availableConditions: ["new", "refurbished"]
  },
  // Add all the Lenovo laptops to the Windows laptops collection
  ...lenovoLaptops
];
