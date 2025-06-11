import { Product } from "../../../../types/product";

export const macbookPro16: Product = {
  id: "macbook-pro-16",
  name: "MacBook Pro 16",
  brand: "Apple",
  type: "laptop",
  basePrice: 299.98, // Doubled from a presumed 149.99
  slug: "macbook-pro-16",
  description: "Powerful laptop with M2 Pro/Max chip, exceptional display, and long battery life.",
  features: [
    "16-inch Liquid Retina XDR display",
    "Apple M2 Pro or M2 Max chip",
    "Up to 96GB of unified memory",
    "Up to 8TB of SSD storage",
    "1080p FaceTime HD camera",
    "Six-speaker sound system with Spatial Audio"
  ],
  imageUrl: "/placeholder.svg",
  availableStorage: [
    { id: "512gb", capacity: "512GB", priceModifier: 0 },
    { id: "1tb", capacity: "1TB", priceModifier: 40 },    // Doubled from presumed 20
    { id: "2tb", capacity: "2TB", priceModifier: 80 }     // Doubled from presumed 40
  ],
  availableColors: [
    { id: "space-gray", name: "Space Gray", value: "#5E5E5E", priceModifier: 0 },
    { id: "silver", name: "Silver", value: "#E3E4E5", priceModifier: 0 }
  ],
  availableConditions: ["new", "refurbished"]
};
