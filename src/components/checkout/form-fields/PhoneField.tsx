
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import TranslatableText from "@/components/ui/TranslatableText";

interface PhoneFieldProps {
  control: Control<any>;
}

const PhoneField: React.FC<PhoneFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <TranslatableText text="Phone Number" translateKey="checkout.phoneNumber" />
          </FormLabel>
          <FormControl>
            <Input type="tel" placeholder="+966 55 555 5555" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;
