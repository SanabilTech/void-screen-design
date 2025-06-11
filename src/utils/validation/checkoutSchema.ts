
import { z } from "zod";

export const createCustomerInfoSchema = (isArabic: boolean, t: (key: string) => string) => {
  return z.object({
    fullName: z.string().min(2, isArabic ? t("checkout.errors.fullNameMin") : "Full name must be at least 2 characters"),
    email: z.string()
      .email(isArabic ? t("checkout.errors.invalidEmail") : "Please enter a valid email address")
      // Additional email validation for common formats
      .refine(val => {
        // Basic email format with common TLDs and no special chars in local part
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
      }, { 
        message: isArabic ? t("checkout.errors.invalidEmail") : "Please enter a valid email address" 
      }),
    phone: z.string()
      .min(10, isArabic ? t("checkout.errors.invalidPhone") : "Please enter a valid phone number")
      .refine(
        (val) => {
          // Check if the number starts with +966 5 and has 8 more digits (total 13 chars)
          const intlFormatValid = /^\+9665\d{8}$/.test(val);
          // Check if the number starts with 05 and has 8 more digits (total 10 chars)
          const localFormatValid = /^05\d{8}$/.test(val);
          return intlFormatValid || localFormatValid;
        },
        {
          message: isArabic ? t("checkout.errors.phoneFormat") : "Phone number must start with +966 5 or 05 followed by 8 digits",
        }
      ),
    orderType: z.enum(["individual", "business"]),
    businessName: z.string().optional()
  }).refine(data => {
    if (data.orderType === "business" && (!data.businessName || data.businessName.length < 2)) {
      return false;
    }
    return true;
  }, {
    message: isArabic ? t("checkout.errors.businessNameRequired") : "Business name is required for business orders",
    path: ["businessName"]
  });
};

export type CustomerInfoFormValues = z.infer<ReturnType<typeof createCustomerInfoSchema>>;
