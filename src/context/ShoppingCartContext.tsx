
import React, { createContext, useContext, useState } from "react";
import { CartItem, ProductConfiguration, Product } from "../types/product";
import { toast } from "sonner";

interface ShoppingCartContextType {
  items: CartItem[];
  addItem: (product: Product, config: ProductConfiguration) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  setCheckoutItem: (product: Product, config: ProductConfiguration) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, config: ProductConfiguration) => {
    // Create a unique ID for this configuration
    const configId = `${config.productId}-${config.selectedStorage?.id || "default"}-${config.selectedColor?.id || "default"}-${config.selectedCondition}-${config.selectedLeaseTerm?.id || "default"}`;
    
    // Check if item with same config exists
    const existingItemIndex = items.findIndex(item => 
      item.productId === config.productId &&
      item.selectedStorage?.id === config.selectedStorage?.id &&
      item.selectedColor?.id === config.selectedColor?.id &&
      item.selectedCondition === config.selectedCondition &&
      item.selectedLeaseTerm?.id === config.selectedLeaseTerm?.id
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      setItems(updatedItems);
      toast.success("Item quantity updated in cart");
    } else {
      // Add new item
      const newItem: CartItem = {
        ...config,
        product,
        quantity: 1
      };
      setItems(prev => [...prev, newItem]);
      toast.success(`${product.name} added to cart`);
    }
  };

  const setCheckoutItem = (product: Product, config: ProductConfiguration) => {
    // Store the data in session storage for checkout
    const checkoutConfig = {
      productId: product.id,
      productName: product.name,
      productImageUrl: config.selectedColor?.imageUrl || product.imageUrl,
      selectedStorage: config.selectedStorage,
      selectedColor: config.selectedColor,
      selectedCondition: config.selectedCondition,
      selectedLeaseTerm: config.selectedLeaseTerm
    };
    
    sessionStorage.setItem('checkoutConfig', JSON.stringify(checkoutConfig));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter((item, index) => index.toString() !== id));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(prev => prev.map((item, index) => 
      index.toString() === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <ShoppingCartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      totalItems,
      setCheckoutItem 
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
  }
  return context;
};
