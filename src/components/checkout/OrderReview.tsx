
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import TranslatableText from "@/components/ui/TranslatableText";
import { 
  StorageOption, 
  ColorOption, 
  DeviceCondition, 
  LeaseTerm
} from "../../types/product";

// Import the smaller component pieces
import CustomerInfoSection from "./order-review/CustomerInfoSection";
import ProductDetailsSection from "./order-review/ProductDetailsSection";
import ProtectionPlanSection from "./order-review/ProtectionPlanSection";
import PriceSummarySection from "./order-review/PriceSummarySection";
import OrderReviewStyles from "./order-review/OrderReviewStyles";

interface OrderReviewProps {
  checkoutConfig: {
    productId: string;
    productName: string;
    productImageUrl: string;
    selectedStorage: StorageOption;
    selectedColor: ColorOption;
    selectedCondition: DeviceCondition;
    selectedLeaseTerm: LeaseTerm;
    price: number;
  };
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    isBusinessOrder: boolean;
    businessName?: string;
  };
  addProtection: boolean;
  protectionPrice: number;
  totalPrice: number;
  onPlaceOrder: () => void;
  isSubmitting: boolean;
}

const OrderReview: React.FC<OrderReviewProps> = ({
  checkoutConfig,
  customerInfo,
  addProtection,
  protectionPrice,
  totalPrice,
  onPlaceOrder,
  isSubmitting
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-medium mb-4">
          <TranslatableText text="Review Your Application" translateKey="checkout.reviewApplication" />
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          <TranslatableText text="Please review your application details before finalizing your submission." translateKey="checkout.reviewApplicationDesc" />
        </p>
      </div>
      
      <div className="space-y-6">
        <CustomerInfoSection 
          fullName={customerInfo.fullName}
          email={customerInfo.email}
          phone={customerInfo.phone}
          isBusinessOrder={customerInfo.isBusinessOrder}
          businessName={customerInfo.businessName}
        />
        
        <ProductDetailsSection 
          productName={checkoutConfig.productName}
          productImageUrl={checkoutConfig.productImageUrl}
          selectedStorage={checkoutConfig.selectedStorage}
          selectedColor={checkoutConfig.selectedColor}
          selectedCondition={checkoutConfig.selectedCondition}
          selectedLeaseTerm={checkoutConfig.selectedLeaseTerm}
        />
        
        <ProtectionPlanSection 
          addProtection={addProtection}
          protectionPrice={protectionPrice}
        />
        
        <PriceSummarySection 
          basePrice={checkoutConfig.price}
          protectionPrice={protectionPrice}
          totalPrice={totalPrice}
          addProtection={addProtection}
        />
        
        <div className="p-4 bg-muted/20 rounded-lg text-sm text-muted-foreground">
          <p>
            <TranslatableText 
              text="By submitting, you confirm your application details. Our team will review your application and contact you regarding the next steps, including payment." 
              translateKey="checkout.applicationSubmitDisclaimer" 
            />
          </p>
        </div>
        
        <Button 
          id="submit_app"
          data-id="submit_app"
          onClick={onPlaceOrder} 
          disabled={isSubmitting}
          className="w-full premium-button h-12"
        >
          <span className="pointer-events-none">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <TranslatableText text="Processing..." translateKey="checkout.processing" />
              </>
            ) : (
              <TranslatableText text="Submit Application" translateKey="checkout.submitApplication" />
            )}
          </span>
        </Button>
      </div>

      <OrderReviewStyles />
    </div>
  );
};

export default OrderReview;
