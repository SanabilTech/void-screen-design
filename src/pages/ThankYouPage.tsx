
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import { useLocalization } from "@/context/LocalizationContext";
import TranslatableText from "@/components/ui/TranslatableText";

const ThankYouPage: React.FC = () => {
  const { trackFunnelStep } = useFunnelTracking();
  const { isArabic } = useLocalization();
  
  useEffect(() => {
    trackFunnelStep('applicationSubmitted');
    // Clear checkout data from session storage
    sessionStorage.removeItem('checkoutConfig');
  }, [trackFunnelStep]);

  return (
    <div className="flex flex-col min-h-screen pt-24 md:pt-28">
      <div className="container max-w-2xl py-12 flex-1 flex flex-col justify-center">
        <div className="text-center space-y-6 py-8">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-6 rounded-full">
              <CheckCircle size={64} className="text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold">
            <TranslatableText text="Thank You!" translateKey="thankYou.title" />
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            <TranslatableText 
              text="We have received your application and will contact you within 1-2 business days to finalize the details." 
              translateKey="thankYou.message" 
            />
          </p>
          
          <div className="bg-muted/30 p-6 rounded-lg max-w-md mx-auto">
            <h2 className="font-medium mb-3">
              <TranslatableText text="Next steps:" translateKey="thankYou.nextSteps" />
            </h2>
            <ul className="text-sm text-muted-foreground text-left space-y-2">
              <li className="flex gap-2">
                <span>1.</span> 
                <span>
                  <TranslatableText 
                    text="Our team will review your application and verification documents." 
                    translateKey="thankYou.step1" 
                  />
                </span>
              </li>
              <li className="flex gap-2">
                <span>2.</span> 
                <span>
                  <TranslatableText 
                    text="You'll receive a call or email to confirm your application details." 
                    translateKey="thankYou.step2" 
                  />
                </span>
              </li>
              <li className="flex gap-2">
                <span>3.</span> 
                <span>
                  <TranslatableText 
                    text="Once approved, we'll arrange payment and delivery of your device."
                    translateKey="thankYou.step3" 
                  />
                </span>
              </li>
            </ul>
          </div>
          
          <div className="pt-6">
            <Button asChild size="lg">
              <Link to="/">
                <TranslatableText text="Return to Home" translateKey="thankYou.returnHome" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
