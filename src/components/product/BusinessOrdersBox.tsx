
import React from "react";
import TranslatableText from "@/components/ui/TranslatableText";
import BusinessOrdersIcon from "/public/lovable-uploads/3c2dd1c1-6f8e-4775-96ae-afc960921a79.png";

const BusinessOrdersBox: React.FC = () => {
  return (
    <div className="rounded-xl p-5 border border-[#EFF3F8] mt-6">
      <div className="flex items-start gap-4">
        <img 
          src={BusinessOrdersIcon} 
          alt="Business Orders" 
          className="w-16 h-16 object-contain flex-shrink-0"
        />
        <div>
          <h3 className="font-medium text-base mb-1">
            <TranslatableText 
              text="Business Orders" 
              translateKey="product.businessOrders.title" 
            />
          </h3>
          <p className="text-sm text-muted-foreground">
            <TranslatableText 
              text="Are you a business looking for multiple devices? Submit your first order and we'll get in touch to fulfill your bulk requirements." 
              translateKey="product.businessOrders.description" 
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessOrdersBox;
