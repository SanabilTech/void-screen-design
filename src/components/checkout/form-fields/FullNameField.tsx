
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

interface FullNameFieldProps {
  control: Control<any>;
}

const FullNameField: React.FC<FullNameFieldProps> = ({ control }) => {
  const { isArabic } = useLocalization();

  return (
    <FormField
      control={control}
      name="fullName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <TranslatableText text="Full Name" translateKey="checkout.fullName" />
          </FormLabel>
          <FormControl>
            <Input placeholder={isArabic ? "محمد عبدالله" : "John Doe"} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FullNameField;
