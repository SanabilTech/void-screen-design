import { Product } from "../../../../types/product";

export const huaweiPhones: Product[] = [
  {
    id: "huawei-mate-x6",
    name: "Huawei Mate X6",
    brand: "Huawei",
    type: "smartphone",
    basePrice: 494,
    slug: "huawei-mate-x6",
    description: "Huawei Mate X6 foldable smartphone with dual 6.4-inch and 7.9-inch displays, powerful processor, and exceptional camera system.",
    features: [
      "Dual display: 6.4-inch external and 7.9-inch foldable internal screens",
      "Kirin 9000s processor",
      "Triple camera system with XMAGE imaging",
      "Ultra-thin foldable design",
      "Fast charging with large battery capacity",
      "HarmonyOS system"
    ],
    imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/e/9/6/a/e96a5ae540cc92f9e30187ef0f4725987f11c1dd_648595.jpg",
    availableStorage: [
      { id: "512gb", capacity: "512GB", priceModifier: 0 }
    ],
    availableColors: [
      { id: "nebula-black", name: "Nebula Black", value: "#000000", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/e/9/6/a/e96a5ae540cc92f9e30187ef0f4725987f11c1dd_648595.jpg" },
      { id: "nebula-grey", name: "Nebula Grey", value: "#808080", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/e/5/a/3/e5a36c5da24b629d6a3bfd614223de8a735a664f_648623.jpg" },
      { id: "nebula-red", name: "Nebula Red", value: "#FF0000", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/4/c/0/4/4c04f21d4e7793e806ce7bf94a041c874d8a84b5_648618.jpg" }
    ],
    availableConditions: ["new", "refurbished"]
  },
  {
    id: "huawei-pura-70-ultra",
    name: "Huawei Pura 70 Ultra",
    brand: "Huawei",
    type: "smartphone",
    basePrice: 220,
    slug: "huawei-pura-70-ultra",
    description: "Huawei Pura 70 Ultra with a stunning 6.8-inch display, powerful processor, and advanced camera system.",
    features: [
      "6.8-inch OLED display",
      "Kirin 9010 processor",
      "Advanced XMAGE imaging system",
      "Variable aperture camera",
      "Fast charging capabilities",
      "HarmonyOS ecosystem"
    ],
    imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/9/a/d/1/9ad1130910b5ac77901ec8aa2773925a4cab9bc1_635165.jpg",
    availableStorage: [
      { id: "256gb", capacity: "256GB", priceModifier: 0 },
      { id: "512gb", capacity: "512GB", priceModifier: 70 }
    ],
    availableColors: [
      { id: "black", name: "Black", value: "#000000", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/9/a/d/1/9ad1130910b5ac77901ec8aa2773925a4cab9bc1_635165.jpg" },
      { id: "green", name: "Green", value: "#4CAF50", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/1/2/d/b/12db7cdce586c5b73b47cf0e6728b1f6411c5f37_635171.jpg" },
      { id: "brown", name: "Brown", value: "#795548", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/a/6/4/4/a644c01d81e72c817f34a50afa86584a966ffbe6_635172.jpg" },
      { id: "white", name: "White", value: "#FFFFFF", priceModifier: 0, imageUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/c/3/4/d/c34dc804daac2ae578605f3f229b2c862d4b5405_635162.jpg" }
    ],
    availableConditions: ["new", "refurbished"]
  }
];
