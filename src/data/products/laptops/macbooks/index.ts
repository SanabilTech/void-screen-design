
import { Product } from "../../../../types/product";
import { macbookPro16 } from "./macbook-pro-16";
import { macbookPro14_2024 } from "./macbook-pro-14-2024";
import { macbookPro16_2024 } from "./macbook-pro-16-2024";

// Export all MacBook products as an array
export const macbooks: Product[] = [
  macbookPro16,
  macbookPro14_2024,
  macbookPro16_2024
];

// Also export individual MacBooks for direct access
export {
  macbookPro16,
  macbookPro14_2024,
  macbookPro16_2024
};
