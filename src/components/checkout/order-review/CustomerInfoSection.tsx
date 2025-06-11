
import React from "react";
import TranslatableText from "@/components/ui/TranslatableText";

interface CustomerInfoProps {
  fullName: string;
  email: string;
  phone: string;
  isBusinessOrder: boolean;
  businessName?: string;
}

const CustomerInfoSection: React.FC<CustomerInfoProps> = ({
  fullName,
  email,
  phone,
  isBusinessOrder,
  businessName
}) => {
  return (
    <div className="bg-muted/20 rounded-lg p-4">
      <h3 className="font-medium text-sm mb-3">
        <TranslatableText text="Customer Information" translateKey="checkout.customerInfo" />
      </h3>
      <div className="space-y-2 text-sm">
        <p>
          <span className="text-muted-foreground">
            <TranslatableText text="Name:" translateKey="checkout.name" />
          </span> {fullName}
        </p>
        <p>
          <span className="text-muted-foreground">
            <TranslatableText text="Email:" translateKey="checkout.email" />
          </span> {email}
        </p>
        <p>
          <span className="text-muted-foreground">
            <TranslatableText text="Phone:" translateKey="checkout.phone" />
          </span> {phone}
        </p>
        <p>
          <span className="text-muted-foreground">
            <TranslatableText text="Order Type:" translateKey="checkout.orderType" />
          </span> {isBusinessOrder ? 
            <TranslatableText text="Business" translateKey="checkout.business" /> : 
            <TranslatableText text="Individual" translateKey="checkout.individual" />
          }
        </p>
        {isBusinessOrder && businessName && (
          <p>
            <span className="text-muted-foreground">Business Name:</span> {businessName}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerInfoSection;
