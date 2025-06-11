
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import TranslatableText from "@/components/ui/TranslatableText";

interface EmailFieldProps {
  control: Control<any>;
}

const EmailField: React.FC<EmailFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <TranslatableText text="Email Address" translateKey="checkout.emailAddress" />
          </FormLabel>
          <FormControl>
            <Input type="email" placeholder="email@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailField;
