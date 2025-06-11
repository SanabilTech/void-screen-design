import { Product } from "../../../types/product";
import { iphone15Plus } from "./iphone/iphone15Plus";

// Define iPhone products
export const iphones: Product[] = [
  iphone15Plus,
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    type: "smartphone",
    basePrice: 392, // Doubled from 196
    slug: "iphone-15-pro-max",
    description: "Apple's iPhone 15 Pro Max with a stunning 6.7-inch display, powerful A17 Pro chip, and advanced camera system.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with enhanced performance",
      "Pro camera system with 48MP main camera",
      "Titanium design, incredibly strong and lightweight",
      "Action mode for smooth, steady video",
      "All-day battery life",
      "Face ID"
    ],
    imageUrl: "https://m.media-amazon.com/images/I/81IPGZtygYL._AC_SL1500_.jpg",
    availableStorage: [
      { id: "256gb", capacity: "256GB", priceModifier: 0 },
      { id: "512gb", capacity: "512GB", priceModifier: 30 }, // Doubled from 15
      { id: "1tb", capacity: "1TB", priceModifier: 78 }      // Doubled from 39
    ],
    availableColors: [
      { id: "black-titanium", name: "Black Titanium", value: "#2F3033", priceModifier: 0, imageUrl: "https://m.media-amazon.com/images/I/81IPGZtygYL._AC_SL1500_.jpg" },
      { id: "blue-titanium", name: "Blue Titanium", value: "#394E5C", priceModifier: 0, imageUrl: "https://m.media-amazon.com/images/I/81fO2C9cYjL._AC_SL1500_.jpg" },
      { id: "natural-titanium", name: "Natural Titanium", value: "#E3D0BA", priceModifier: 0, imageUrl: "https://m.media-amazon.com/images/I/81YSmKnlijL._AC_SL1500_.jpg" },
      { id: "white-titanium", name: "White Titanium", value: "#F6F7F1", priceModifier: 0, imageUrl: "https://m.media-amazon.com/images/I/81FFCoft1PL._AC_SL1500_.jpg" }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    type: "smartphone",
    basePrice: 352, // Doubled from 176
    slug: "iphone-15-pro",
    description: "Apple's iPhone 15 Pro with a beautiful 6.1-inch display, powerful A17 Pro chip, and advanced camera system.",
    features: [
      "6.1-inch Super Retina XDR display",
      "A17 Pro chip with enhanced performance",
      "Pro camera system with 48MP main camera",
      "Titanium design, incredibly strong and lightweight",
      "Action mode for smooth, steady video",
      "All-day battery life",
      "Face ID"
    ],
    imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/f/d/0/c/fd0c17e2f98259953d060e6ef0b91f4eea7c8e3c_623525.jpg",
    availableStorage: [
      { id: "256gb", capacity: "256GB", priceModifier: 0 },
      { id: "512gb", capacity: "512GB", priceModifier: 40 },  // Doubled from 20
      { id: "1tb", capacity: "1TB", priceModifier: 70 }       // Doubled from 35
    ],
    availableColors: [
      { id: "black-titanium", name: "Black Titanium", value: "#2F3033", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/f/d/0/c/fd0c17e2f98259953d060e6ef0b91f4eea7c8e3c_623525.jpg" },
      { id: "blue-titanium", name: "Blue Titanium", value: "#394E5C", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/3/b/8/1/3b81874ceed26d3101c1bbe0397cb750b6924bcc_623596.jpg" },
      { id: "natural-titanium", name: "Natural Titanium", value: "#E3D0BA", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/d/9/0/7/d90769a04070375f8a13cb33e96019d50a898b19_623535.jpg" },
      { id: "white-titanium", name: "White Titanium", value: "#F6F7F1", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/2/e/d/9/2ed9d8452f17f897ea25f2fa18f6f719b20940c4_623531.jpg" }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    brand: "Apple",
    type: "smartphone",
    basePrice: 320, // Doubled from 160
    slug: "iphone-14-pro-max",
    description: "Apple's iPhone 14 Pro Max with a stunning 6.7-inch display, powerful A16 Bionic chip, and advanced camera system.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A16 Bionic chip with enhanced performance",
      "Pro camera system with 48MP main camera",
      "Dynamic Island, a magical new way to interact with iPhone",
      "All-day battery life",
      "Face ID"
    ],
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247094",
    availableStorage: [
      { id: "256gb", capacity: "256GB", priceModifier: 0 },
      { id: "512gb", capacity: "512GB", priceModifier: 30 },  // Doubled from 15
      { id: "1tb", capacity: "1TB", priceModifier: 60 }       // Doubled from 30
    ],
    availableColors: [
      { id: "space-black", name: "Space Black", value: "#303136", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247094" },
      { id: "gold", name: "Gold", value: "#F4E2C9", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759248228" },
      { id: "deep-purple", name: "Deep Purple", value: "#675E6D", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-3-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247827" },
      { id: "silver", name: "Silver", value: "#E0E4E6", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-4-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247424" }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    brand: "Apple",
    type: "smartphone",
    basePrice: 280, // Doubled from 140
    slug: "iphone-14-pro",
    description: "Apple's iPhone 14 Pro with a beautiful 6.1-inch display, powerful A16 Bionic chip, and advanced camera system.",
    features: [
      "6.1-inch Super Retina XDR display",
      "A16 Bionic chip with enhanced performance",
      "Pro camera system with 48MP main camera",
      "Dynamic Island, a magical new way to interact with iPhone",
      "All-day battery life",
      "Face ID"
    ],
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247094",
    availableStorage: [
      { id: "128gb", capacity: "128GB", priceModifier: 0 },
      { id: "256gb", capacity: "256GB", priceModifier: 20 },  // Doubled from 10
      { id: "512gb", capacity: "512GB", priceModifier: 40 }   // Doubled from 20
    ],
    availableColors: [
      { id: "space-black", name: "Space Black", value: "#303136", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247094" },
      { id: "gold", name: "Gold", value: "#F4E2C9", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759248228" },
      { id: "deep-purple", name: "Deep Purple", value: "#675E6D", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-3-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247827" },
      { id: "silver", name: "Silver", value: "#E0E4E6", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-4-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660759247424" }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    brand: "Apple",
    type: "smartphone",
    basePrice: 199.98, // Doubled from 99.99
    slug: "iphone-13",
    description: "The iPhone 13. Your new superpower.",
    features: [
      "Super Retina XDR display",
      "A15 Bionic chip",
      "Cinematic mode in 1080p at 30 fps",
      "Advanced dual-camera system",
      "Ceramic Shield front",
      "5G connectivity"
    ],
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-product-red-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652905000",
    availableStorage: [
      { id: "128gb", capacity: "128GB", priceModifier: 0 },
      { id: "256gb", capacity: "256GB", priceModifier: 10 },  // Doubled from 5
      { id: "512gb", capacity: "512GB", priceModifier: 20 }   // Doubled from 10
    ],
    availableColors: [
      { id: "product-red", name: "Product Red", value: "#C41E3A", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-product-red-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652905000" },
      { id: "midnight", name: "Midnight", value: "#0B1214", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652904000" },
      { id: "blue", name: "Blue", value: "#3972A4", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652905000" },
      { id: "starlight", name: "Starlight", value: "#F4F0E6", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-starlight-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652905000" }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "iphone-se",
    name: "iPhone SE",
    brand: "Apple",
    type: "smartphone",
    basePrice: 99.98, // Doubled from 49.99
    slug: "iphone-se",
    description: "The iPhone SE. Seriously fast. Seriously affordable.",
    features: [
      "Retina HD display",
      "A15 Bionic chip",
      "Advanced single-camera system",
      "Touch ID",
      "5G connectivity"
    ],
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-se-product-red-select-202203?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1646206286365",
    availableStorage: [
      { id: "64gb", capacity: "64GB", priceModifier: 0 },
      { id: "128gb", capacity: "128GB", priceModifier: 10 },  // Doubled from 5
      { id: "256gb", capacity: "256GB", priceModifier: 20 }   // Doubled from 10
    ],
    availableColors: [
      { id: "product-red", name: "Product Red", value: "#C41E3A", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-se-product-red-select-202203?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1646206286365" },
      { id: "midnight", name: "Midnight", value: "#0B1214", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-se-midnight-select-202203?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1646206286314" },
      { id: "starlight", name: "Starlight", value: "#F4F0E6", priceModifier: 0, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-se-starlight-select-202203?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1646206286415" }
    ],
    availableConditions: ["new", "refurbished"]
  }
];
