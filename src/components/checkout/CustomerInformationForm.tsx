
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useLocalization } from "@/context/LocalizationContext";
import TranslatableText from "@/components/ui/TranslatableText";
import { createCustomerInfoSchema, CustomerInfoFormValues } from "@/utils/validation/checkoutSchema";

// Import form field components
import FullNameField from "./form-fields/FullNameField";
import EmailField from "./form-fields/EmailField";
import PhoneField from "./form-fields/PhoneField";
import OrderTypeField from "./form-fields/OrderTypeField";
import BusinessNameField from "./form-fields/BusinessNameField";
import SubmitButton from "./form-fields/SubmitButton";

interface CustomerInformationFormProps {
  onSubmit: (data: {
    fullName: string;
    email: string;
    phone: string;
    isBusinessOrder: boolean;
    businessName?: string;
  }) => void;
}

const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({ onSubmit }) => {
  const { isArabic, t } = useLocalization();

  // Create schema with localized error messages
  const formSchema = createCustomerInfoSchema(isArabic, t);

  const form = useForm<CustomerInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      orderType: "individual",
      businessName: ""
    }
  });
  
  const orderType = form.watch("orderType");

  const handleSubmit = (values: CustomerInfoFormValues) => {
    onSubmit({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      isBusinessOrder: values.orderType === "business",
      businessName: values.orderType === "business" ? values.businessName : undefined
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-medium mb-4">
          <TranslatableText text="Customer Information" translateKey="checkout.customerInformation" />
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          <TranslatableText 
            text="Please provide your contact information so we can process your order." 
            translateKey="checkout.contactInfo" 
          />
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FullNameField control={form.control} />
          <EmailField control={form.control} />
          <PhoneField control={form.control} />
          <OrderTypeField control={form.control} />
          <BusinessNameField control={form.control} show={orderType === "business"} />
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};

export default CustomerInformationForm;
