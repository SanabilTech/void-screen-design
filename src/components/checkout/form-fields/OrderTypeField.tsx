
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";
import { cn } from "@/lib/utils";

interface OrderTypeFieldProps {
  control: Control<any>;
}

const OrderTypeField: React.FC<OrderTypeFieldProps> = ({ control }) => {
  const { isArabic } = useLocalization();

  return (
    <FormField
      control={control}
      name="orderType"
      render={({ field }) => (
        <FormItem className={cn("space-y-3", {
          "text-right": isArabic,
          "text-left": !isArabic
        })}>
          <FormLabel>
            <TranslatableText text="Order Type" translateKey="checkout.orderType" />
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-col space-y-1", {
                "items-end": isArabic,
                "items-start": !isArabic
              })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">
                  <TranslatableText text="Individual" translateKey="checkout.individual" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">
                  <TranslatableText text="Business" translateKey="checkout.business" />
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default OrderTypeField;
