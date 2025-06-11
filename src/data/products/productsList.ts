
import { Product } from "../../types/product";
import { iphones } from "./smartphones/iphone";
import { androidPhones } from "./smartphones/androidPhones";
import { macbooks } from "./laptops/macbooks";
import { windowsLaptops } from "./laptops/windowsLaptops";

// Combine all product groups
export const products: Product[] = [
  ...iphones,
  ...androidPhones,
  ...macbooks,
  ...windowsLaptops
];
