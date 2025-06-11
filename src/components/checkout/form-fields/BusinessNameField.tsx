
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import TranslatableText from "@/components/ui/TranslatableText";

interface BusinessNameFieldProps {
  control: Control<any>;
  show: boolean;
}

const BusinessNameField: React.FC<BusinessNameFieldProps> = ({ control, show }) => {
  if (!show) return null;
  
  return (
    <FormField
      control={control}
      name="businessName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <TranslatableText text="Business Name" translateKey="checkout.businessName" />
          </FormLabel>
          <FormControl>
            <Input placeholder="Company, LLC" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BusinessNameField;
