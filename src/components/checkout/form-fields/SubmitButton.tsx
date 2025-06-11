
import React from "react";
import { Button } from "@/components/ui/button";
import TranslatableText from "@/components/ui/TranslatableText";

interface SubmitButtonProps {
  text?: string;
  translateKey?: string;
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  text = "Continue to Protection Plan", 
  translateKey = "checkout.continueToProtection",
  disabled = false,
  onClick,
  id = "checkout_protection"
}) => {
  if (onClick) {
    return (
      <Button 
        id={id}
        data-id={id}
        type="button"
        className="w-full premium-button"
        disabled={disabled}
        onClick={onClick}
      >
        <span className="pointer-events-none">
          <TranslatableText text={text} translateKey={translateKey} />
        </span>
      </Button>
    );
  }
  
  return (
    <Button 
      id={id}
      data-id={id}
      type="submit" 
      className="w-full premium-button"
      disabled={disabled}
    >
      <span className="pointer-events-none">
        <TranslatableText text={text} translateKey={translateKey} />
      </span>
    </Button>
  );
};

export default SubmitButton;
