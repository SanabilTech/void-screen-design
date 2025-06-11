
import { 
  StorageOption, 
  ColorOption, 
  DeviceCondition, 
  LeaseTerm
} from "./product";

export interface CheckoutConfig {
  productId: string;
  productName: string;
  productImageUrl: string;
  selectedStorage: StorageOption;
  selectedColor: ColorOption;
  selectedCondition: DeviceCondition;
  selectedLeaseTerm: LeaseTerm;
  price: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  isBusinessOrder: boolean;
  businessName?: string;
}

export interface CheckoutContextType {
  checkoutConfig: CheckoutConfig | null;
  currentStep: number;
  customerInfo: CustomerInfo | null;
  addProtection: boolean;
  isSubmitting: boolean;
  nationalIdFile: File | null;
  salaryCertificateFile: File | null;
  protectionPrice: number;
  totalPrice: number;
  setCurrentStep: (step: number) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setAddProtection: (include: boolean) => void;
  handleCustomerInfoSubmit: (info: CustomerInfo) => void;
  handleProtectionSelection: (includeProtection: boolean) => void;
  handleVerificationDocuments: (nationalIdFile: File, salaryCertificateFile: File) => void;
  handlePlaceOrder: () => Promise<void>;
  handleBackClick: () => void;
}
