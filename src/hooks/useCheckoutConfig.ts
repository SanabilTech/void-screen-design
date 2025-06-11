
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckoutConfig } from "@/types/checkout";

export const useCheckoutConfig = () => {
  const [checkoutConfig, setCheckoutConfig] = useState<CheckoutConfig | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const configString = sessionStorage.getItem('checkoutConfig');
    if (!configString) {
      toast.error("No product selected for checkout");
      navigate('/products');
      return;
    }
    
    try {
      const config = JSON.parse(configString);
      setCheckoutConfig(config);
    } catch (error) {
      console.error("Error parsing checkout configuration:", error);
      toast.error("An error occurred. Please try again.");
      navigate('/products');
    }
  }, [navigate]);

  return { checkoutConfig };
};
