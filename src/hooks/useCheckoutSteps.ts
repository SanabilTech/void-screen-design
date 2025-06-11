
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerInfo } from "@/types/checkout";

export const useCheckoutSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [addProtection, setAddProtection] = useState(false);
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const [salaryCertificateFile, setSalaryCertificateFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleCustomerInfoSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleProtectionSelection = (includeProtection: boolean) => {
    setAddProtection(includeProtection);
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handleVerificationDocuments = (natIdFile: File, salCertFile: File) => {
    setNationalIdFile(natIdFile);
    setSalaryCertificateFile(salCertFile);
    setCurrentStep(4);
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };

  return {
    currentStep,
    customerInfo,
    addProtection,
    nationalIdFile,
    salaryCertificateFile,
    setCurrentStep,
    setCustomerInfo,
    setAddProtection,
    handleCustomerInfoSubmit,
    handleProtectionSelection,
    handleVerificationDocuments,
    handleBackClick
  };
};
