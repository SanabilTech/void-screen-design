import { Product } from "../../../../types/product";

export const macbookPro14_2024: Product = {
  id: "macbook-pro-14-2024",
  name: "MacBook Pro 14 (2024)",
  brand: "Apple",
  type: "laptop",
  basePrice: 259.98, // Doubled from presumed 129.99
  slug: "macbook-pro-14-2024",
  description: "Latest MacBook Pro with M3 Pro/Max chip, exceptional display, and great performance.",
  features: [
    "Available with M3, M3 Pro, or M3 Max chip",
    "Up to 12-core CPU",
    "Up to 18-core GPU",
    "Up to 36GB unified memory",
    "Stunning 14-inch Liquid Retina XDR display",
    "ProMotion technology",
    "Up to 22 hours of battery life",
    "Advanced thermal management system",
    "Three Thunderbolt 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe 3 port"
  ],
  imageUrl: "/placeholder.svg",
  availableStorage: [
    { id: "512gb", capacity: "512GB", priceModifier: 0 },
    { id: "1tb", capacity: "1TB", priceModifier: 40 },    // Doubled from presumed 20
    { id: "2tb", capacity: "2TB", priceModifier: 80 }     // Doubled from presumed 40
  ],
  availableColors: [
    { id: "space-black", name: "Space Black", value: "#2F2F2F", priceModifier: 0 },
    { id: "silver", name: "Silver", value: "#E3E4E5", priceModifier: 0 }
  ],
  availableConditions: ["new", "refurbished"]
};
