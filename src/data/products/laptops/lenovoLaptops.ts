
import { Product } from "../../../types/product";

export const lenovoLaptops: Product[] = [
  {
    id: "lenovo-loq-gaming",
    name: "Lenovo LOQ Gaming Laptop",
    brand: "Lenovo",
    type: "laptop",
    basePrice: 245, // Monthly rental price
    slug: "lenovo-loq-gaming",
    description: "15.6\" Grey gaming laptop with powerful NVIDIA GeForce RTX 4060 graphics.",
    features: [
      "15.6-inch display",
      "1TB SSD storage",
      "16GB DDR5 memory",
      "NVIDIA GeForce RTX 4060 (8GB)",
      "High-performance cooling",
      "Backlit keyboard"
    ],
    imageUrl: "https://m.media-amazon.com/images/I/81s36P2ha6L._AC_SL1500_.jpg",
    availableStorage: [
      { 
        id: "1tb-16gb", 
        capacity: "1TB SSD - 16GB DDR5", 
        priceModifier: 0,
        exactPrices: {
          "monthly": 245,
          "12month": 196,
          "24month": 150,
          "36month": 112
        }
      }
    ],
    availableColors: [
      { 
        id: "grey", 
        name: "Grey", 
        value: "#808080", 
        priceModifier: 0,
        imageUrl: "https://m.media-amazon.com/images/I/81s36P2ha6L._AC_SL1500_.jpg"
      }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "lenovo-legion-9i",
    name: "Lenovo Legion 9i Gaming Laptop",
    brand: "Lenovo",
    type: "laptop",
    basePrice: 979, // Monthly rental price
    slug: "lenovo-legion-9i",
    description: "16\" Carbon Black premium gaming laptop with 3.2K Mini LED 165Hz display and top-tier NVIDIA GeForce RTX 4090 graphics.",
    features: [
      "16-inch 3.2K (3200x2000) Mini LED 165Hz display",
      "2TB SSD storage",
      "64GB DDR5 memory",
      "NVIDIA GeForce RTX 4090 (16GB)",
      "Premium carbon black design",
      "Advanced cooling system",
      "RGB backlit keyboard"
    ],
    imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/2/8/3/d/283d4ce6fa2559bec5f8b968b909590a07196ce0_628031_1.jpg",
    availableStorage: [
      { 
        id: "2tb-64gb", 
        capacity: "2TB SSD - 64GB DDR5", 
        priceModifier: 0,
        exactPrices: {
          "monthly": 979,
          "12month": 783,
          "24month": 600,
          "36month": 539
        }
      }
    ],
    availableColors: [
      { 
        id: "carbon-black", 
        name: "Carbon Black", 
        value: "#0A0A0A", 
        priceModifier: 0,
        imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/2/8/3/d/283d4ce6fa2559bec5f8b968b909590a07196ce0_628031_1.jpg"
      }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "lenovo-thinkbook-16p",
    name: "Lenovo ThinkBook 16p Laptop",
    brand: "Lenovo",
    type: "laptop",
    basePrice: 441, // Monthly rental price
    slug: "lenovo-thinkbook-16p",
    description: "16\" Grey performance laptop with powerful NVIDIA GeForce RTX 4060 graphics, perfect for creative professionals.",
    features: [
      "16-inch display",
      "1TB SSD storage",
      "32GB DDR5 memory",
      "NVIDIA GeForce RTX 4060 (8GB)",
      "Premium aluminum construction",
      "Professional-grade color accuracy",
      "Enhanced security features"
    ],
    imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/0/c/d/6/0cd6504ae4577c5da42fe248c6cfa3e806fdaef9_653460_1.jpg",
    availableStorage: [
      { 
        id: "1tb-32gb", 
        capacity: "1TB SSD - 32GB DDR5", 
        priceModifier: 0,
        exactPrices: {
          "monthly": 441,
          "12month": 352,
          "24month": 270,
          "36month": 242
        }
      }
    ],
    availableColors: [
      { 
        id: "grey", 
        name: "Grey", 
        value: "#808080", 
        priceModifier: 0,
        imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/0/c/d/6/0cd6504ae4577c5da42fe248c6cfa3e806fdaef9_653460_1.jpg"
      }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "lenovo-ideapad-pro-5",
    name: "Lenovo IdeaPad Pro 5 Laptop",
    brand: "Lenovo",
    type: "laptop",
    basePrice: 245, // Monthly rental price
    slug: "lenovo-ideapad-pro-5",
    description: "16\" Arctic Grey sleek laptop with NVIDIA GeForce RTX 3050 graphics, perfect for everyday productivity and light gaming.",
    features: [
      "16-inch display",
      "512GB SSD storage",
      "16GB DDR5 memory",
      "NVIDIA GeForce RTX 3050 (6GB)",
      "Premium Arctic Grey finish",
      "Dolby Audio speakers",
      "Fast charging capability"
    ],
    imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/2/a/3/a/2a3aca4add2ed4190197dc200e840d8ea656e1f5_631066_1.jpg",
    availableStorage: [
      { 
        id: "512gb-16gb", 
        capacity: "512GB SSD - 16GB DDR5", 
        priceModifier: 0,
        exactPrices: {
          "monthly": 245,
          "12month": 196,
          "24month": 150,
          "36month": 135
        }
      }
    ],
    availableColors: [
      { 
        id: "arctic-grey", 
        name: "Arctic Grey", 
        value: "#E0E0E0", 
        priceModifier: 0,
        imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/2/a/3/a/2a3aca4add2ed4190197dc200e840d8ea656e1f5_631066_1.jpg"
      }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "lenovo-thinkpad-14",
    name: "Lenovo ThinkPad Laptop",
    brand: "Lenovo",
    type: "laptop",
    basePrice: 352, // Monthly rental price
    slug: "lenovo-thinkpad-14",
    description: "14\" Business laptop with integrated Intel graphics and Windows 11 Pro, designed for professional productivity.",
    features: [
      "14-inch display",
      "512GB SSD storage",
      "16GB DDR5 memory",
      "Intel Integrated Graphics",
      "Windows 11 Pro",
      "Classic ThinkPad design",
      "Military-grade durability",
      "Enhanced security features"
    ],
    imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/2/b/7/3/2b73399cf77acbea7ef425f832d32688ef21b604_643353_1.jpg",
    availableStorage: [
      { 
        id: "512gb-16gb", 
        capacity: "512GB SSD - 16GB DDR5", 
        priceModifier: 0,
        exactPrices: {
          "monthly": 352,
          "12month": 282,
          "24month": 216,
          "36month": 194
        }
      }
    ],
    availableColors: [
      { 
        id: "black", 
        name: "Black", 
        value: "#000000", 
        priceModifier: 0,
        imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/2/b/7/3/2b73399cf77acbea7ef425f832d32688ef21b604_643353_1.jpg"
      }
    ],
    availableConditions: ["new", "refurbished"]
  }
];
