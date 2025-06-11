import { Product } from "../../../../types/product";

export const macbookPro16_2024: Product = {
  id: "macbook-pro-16-2024",
  name: "MacBook Pro 16 (2024)",
  brand: "Apple",
  type: "laptop",
  basePrice: 349.98, // Doubled from presumed 174.99
  slug: "macbook-pro-16-2024",
  description: "Latest MacBook Pro with M3 Pro/Max chip, 16-inch display, and exceptional performance.",
  features: [
    "Apple M3 Pro or M3 Max chip",
    "16-inch Liquid Retina XDR display",
    "Up to 128GB unified memory",
    "Up to 8TB SSD storage",
    "1080p FaceTime HD camera",
    "Six-speaker sound system with Spatial Audio"
  ],
  imageUrl: "/placeholder.svg",
  availableStorage: [
    { id: "512gb", capacity: "512GB", priceModifier: 0 },
    { id: "1tb", capacity: "1TB", priceModifier: 40 },    // Doubled from presumed 20
    { id: "2tb", capacity: "2TB", priceModifier: 80 },    // Doubled from presumed 40
    { id: "4tb", capacity: "4TB", priceModifier: 160 }    // Doubled from presumed 80
  ],
  availableColors: [
    { id: "space-black", name: "Space Black", value: "#2F2F2F", priceModifier: 0 },
    { id: "silver", name: "Silver", value: "#E3E4E5", priceModifier: 0 }
  ],
  availableConditions: ["new", "refurbished"]
};
