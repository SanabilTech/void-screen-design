
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";
import TranslatableText from "@/components/ui/TranslatableText";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SubmitButton from "./form-fields/SubmitButton";

interface VerificationDocumentsProps {
  onContinue: (nationalIdFile: File, salaryCertificateFile: File) => void;
}

const VerificationDocuments: React.FC<VerificationDocumentsProps> = ({ onContinue }) => {
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const [salaryCertificateFile, setSalaryCertificateFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    nationalId?: string;
    salaryCertificate?: string;
  }>({});
  
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    fieldName: 'nationalId' | 'salaryCertificate'
  ) => {
    const files = e.target.files;
    
    if (files && files[0]) {
      const file = files[0];
      const acceptedFormats = ['application/pdf', 'image/jpeg', 'image/png'];
      
      if (!acceptedFormats.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: "Invalid file format. Please upload PDF, JPG, or PNG"
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          [fieldName]: "File is too large. Maximum size is 5MB"
        }));
        return;
      }
      
      setFile(file);
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }
  };
  
  const handleContinue = () => {
    const newErrors: {
      nationalId?: string;
      salaryCertificate?: string;
    } = {};
    
    if (!nationalIdFile) {
      newErrors.nationalId = "Please upload your National ID or Iqama";
    }
    
    if (!salaryCertificateFile) {
      newErrors.salaryCertificate = "Please upload your Salary Certificate";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Continue to the next step if both files are uploaded
    if (nationalIdFile && salaryCertificateFile) {
      onContinue(nationalIdFile, salaryCertificateFile);
    }
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  // Check if both documents are uploaded to enable the button
  const isFormComplete = nationalIdFile && salaryCertificateFile;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-medium mb-4">
          <TranslatableText text="Verification Documents" translateKey="checkout.verificationDocuments" />
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          <TranslatableText 
            text="To proceed with your lease application, please upload the required documents below. This helps us verify your identity and eligibility for the Operating Lease. Your information is kept secure."
            translateKey="checkout.verificationInstructions" 
          />
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">
                <TranslatableText text="National ID / Iqama" translateKey="checkout.nationalId" />
              </h3>
              <p className="text-xs text-muted-foreground">
                <TranslatableText 
                  text="Please upload a clear copy of your valid National ID or Iqama." 
                  translateKey="checkout.nationalIdDescription" 
                />
              </p>
            </div>
          </div>
          
          <div className="w-full">
            <div className={`border-2 border-dashed rounded-md p-4 transition-colors ${errors.nationalId ? 'border-destructive' : 'border-muted hover:border-muted-foreground/50'}`}>
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                
                {!nationalIdFile ? (
                  <span className="text-sm text-center text-muted-foreground">
                    <TranslatableText 
                      text="Click to upload PDF, JPG, or PNG (Max 5MB)" 
                      translateKey="checkout.clickToUpload" 
                    />
                  </span>
                ) : (
                  <div className="text-sm text-center">
                    <p className="font-medium">{nationalIdFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(nationalIdFile.size)}</p>
                  </div>
                )}
                
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, setNationalIdFile, 'nationalId')}
                />
              </label>
            </div>
            
            {errors.nationalId && (
              <p className="text-sm text-destructive mt-2">
                <TranslatableText 
                  text={errors.nationalId} 
                  translateKey="checkout.uploadNationalId"
                />
              </p>
            )}
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">
                <TranslatableText text="Salary Certificate" translateKey="checkout.salaryCertificate" />
              </h3>
              <p className="text-xs text-muted-foreground">
                <TranslatableText 
                  text="Please upload your most recent salary certificate (issued within the last 3 months)."
                  translateKey="checkout.salaryCertificateDescription" 
                />
              </p>
            </div>
          </div>
          
          <div className="w-full">
            <div className={`border-2 border-dashed rounded-md p-4 transition-colors ${errors.salaryCertificate ? 'border-destructive' : 'border-muted hover:border-muted-foreground/50'}`}>
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                
                {!salaryCertificateFile ? (
                  <span className="text-sm text-center text-muted-foreground">
                    <TranslatableText 
                      text="Click to upload PDF, JPG, or PNG (Max 5MB)" 
                      translateKey="checkout.clickToUpload" 
                    />
                  </span>
                ) : (
                  <div className="text-sm text-center">
                    <p className="font-medium">{salaryCertificateFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(salaryCertificateFile.size)}</p>
                  </div>
                )}
                
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, setSalaryCertificateFile, 'salaryCertificate')}
                />
              </label>
            </div>
            
            {errors.salaryCertificate && (
              <p className="text-sm text-destructive mt-2">
                <TranslatableText 
                  text={errors.salaryCertificate} 
                  translateKey="checkout.uploadSalaryCertificate"
                />
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Alert variant="default" className="bg-primary/5 border-primary/20 mb-4">
          <AlertDescription>
            <TranslatableText 
              text="All documents are encrypted and securely stored. Your information is only used for verification purposes."
              translateKey="checkout.securityNote" 
            />
          </AlertDescription>
        </Alert>
        
        <SubmitButton 
          text="Continue to Review Order"
          translateKey="checkout.continueToReview"
          disabled={!isFormComplete}
          onClick={handleContinue}
          id="upload_docs"
        />
      </div>
    </div>
  );
};

export default VerificationDocuments;
