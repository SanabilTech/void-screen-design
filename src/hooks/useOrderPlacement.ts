
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useOrderCompletion } from "./useOrderCompletion";
import { CheckoutConfig, CustomerInfo } from "@/types/checkout";
import { useDocumentUpload } from "./useDocumentUpload";

export const useOrderPlacement = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { trackOrderCompletion } = useOrderCompletion();
  const { uploadDocuments } = useDocumentUpload();

  const placeOrder = async (
    checkoutConfig: CheckoutConfig,
    customerInfo: CustomerInfo,
    nationalIdFile: File,
    salaryCertificateFile: File,
    addProtection: boolean
  ): Promise<void> => {
    setIsSubmitting(true);
    
    const protectionPrice = addProtection ? Math.ceil(checkoutConfig.price * 0.1) : 0;
    const totalPrice = checkoutConfig.price + protectionPrice;
    
    try {
      // Upload the verification documents
      const uploadResult = await uploadDocuments(nationalIdFile, salaryCertificateFile);
      
      if (!uploadResult.success) {
        toast.error("Failed to upload verification documents. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      // Create order record in database
      const orderData = {
        user_phone: customerInfo.phone,
        user_name: customerInfo.fullName,
        user_email: customerInfo.email,
        is_business_order: customerInfo.isBusinessOrder,
        business_name: customerInfo.businessName || null,
        product_id: checkoutConfig.productId,
        product_name: checkoutConfig.productName,
        selected_storage: checkoutConfig.selectedStorage,
        selected_color: checkoutConfig.selectedColor,
        selected_condition: checkoutConfig.selectedCondition,
        selected_lease_term: checkoutConfig.selectedLeaseTerm,
        has_protection_plan: addProtection,
        protection_plan_price: protectionPrice,
        monthly_price: checkoutConfig.price,
        total_monthly_price: totalPrice,
        national_id_path: uploadResult.nationalIdPath,
        salary_certificate_path: uploadResult.salaryCertificatePath,
        status: 'pending_review'
      } as any; // Use type assertion to bypass strict type checking
      
      // Insert the order and get the order ID
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select('id')
        .single();
      
      if (orderError) {
        console.error("Error saving order:", orderError);
        toast.error("Failed to submit application. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Now also store document references in the documents table
      const documentData = {
        order_id: orderResult.id,
        national_id_path: uploadResult.nationalIdPath,
        salary_certificate_path: uploadResult.salaryCertificatePath
      };
      
      const { error: docError } = await supabase
        .from('documents')
        .insert(documentData);
      
      if (docError) {
        console.error("Error saving document references:", docError);
        // We don't fail the whole process if this fails as the order data already contains the paths
      }
      
      trackOrderCompletion();
      
      // Navigate to thank you page
      navigate('/thank-you');
      
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  return { placeOrder, isSubmitting };
};
