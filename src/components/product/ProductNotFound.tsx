
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "@/context/LocalizationContext";

const ProductNotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLocalization();
  
  return (
    <div className="flex flex-col min-h-screen pt-24 md:pt-28">
      <div className="container-wide py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('product.back')}
        </Button>
        
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">{t('product.notFound')}</h1>
          <p className="text-muted-foreground">{t('product.notFoundDescription')}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductNotFound;
