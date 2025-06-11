import { Product } from "../../../types/product";
import { huaweiPhones } from "./androidPhones/huaweiPhones";

export const androidPhones: Product[] = [
  ...huaweiPhones,
  {
    id: "samsung-s23-ultra",
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    type: "smartphone",
    basePrice: 99.98, // Doubled from 49.99
    slug: "samsung-s23-ultra",
    description: "Samsung's premium smartphone with 200MP camera and S Pen functionality.",
    features: [
      "6.8-inch Dynamic AMOLED 2X display",
      "200MP main camera",
      "Snapdragon 8 Gen 2 processor",
      "Built-in S Pen",
      "5000mAh battery",
      "IP68 water and dust resistant"
    ],
    imageUrl: "/placeholder.svg",
    availableStorage: [
      { id: "256gb", capacity: "256GB", priceModifier: 0 },
      { id: "512gb", capacity: "512GB", priceModifier: 10 },  // Doubled from 5
      { id: "1tb", capacity: "1TB", priceModifier: 20 }       // Doubled from 10
    ],
    availableColors: [
      { id: "phantom-black", name: "Phantom Black", value: "#1D1D1F", priceModifier: 0, imageUrl: "/placeholder.svg" },
      { id: "cream", name: "Cream", value: "#E8E6DF", priceModifier: 0, imageUrl: "/placeholder.svg" },
      { id: "green", name: "Green", value: "#5B6868", priceModifier: 0, imageUrl: "/placeholder.svg" },
      { id: "lavender", name: "Lavender", value: "#CEC5DE", priceModifier: 0, imageUrl: "/placeholder.svg" }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "google-pixel-7",
    name: "Google Pixel 7",
    brand: "Google",
    type: "smartphone",
    basePrice: 79.98, // Doubled from 39.99
    slug: "google-pixel-7",
    description: "Google's smartphone with exceptional AI capabilities and camera.",
    features: [
      "6.3-inch FHD+ OLED display",
      "Google Tensor G2 chip",
      "50MP main camera",
      "Advanced AI features",
      "4355mAh battery",
      "Gorilla Glass Victus protection"
    ],
    imageUrl: "/placeholder.svg",
    availableStorage: [
      { id: "128gb", capacity: "128GB", priceModifier: 0 },
      { id: "256gb", capacity: "256GB", priceModifier: 10 }  // Doubled from 5
    ],
    availableColors: [
      { id: "obsidian", name: "Obsidian", value: "#2E3038", priceModifier: 0, imageUrl: "/placeholder.svg" },
      { id: "snow", name: "Snow", value: "#F3F3F1", priceModifier: 0, imageUrl: "/placeholder.svg" },
      { id: "lemongrass", name: "Lemongrass", value: "#D0D6B3", priceModifier: 0, imageUrl: "/placeholder.svg" }
    ],
    availableConditions: ["new", "refurbished"]
  }
];
