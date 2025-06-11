
// Re-export all product-related exports
import { products } from './productsList';
import { getProductBySlug, calculateProductPrice, getProductCategories } from './productUtils';

export { 
  products, 
  getProductBySlug,
  calculateProductPrice,
  getProductCategories
};
