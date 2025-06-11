
import React from "react";
import { 
  StorageSelector, 
  ColorSelector, 
  ConditionSelector, 
  LeaseTermSelector 
} from "@/components/ui/ConfigSelector";
import { Separator } from "@/components/ui/separator";
import { 
  StorageOption, 
  ColorOption, 
  DeviceCondition, 
  LeaseTerm
} from "@/types/product";
import { useLocalization } from "@/context/LocalizationContext";

interface ProductConfigurationProps {
  availableStorage: StorageOption[];
  selectedStorage: StorageOption | null;
  onStorageChange: (id: string) => void;
  
  availableColors: ColorOption[];
  selectedColor: ColorOption | null;
  onColorChange: (id: string) => void;
  
  selectedCondition: DeviceCondition;
  onConditionChange: (condition: DeviceCondition) => void;
  availableConditions: DeviceCondition[];
  
  leaseTerms: LeaseTerm[];
  selectedLeaseTerm: LeaseTerm | null;
  onLeaseTermChange: (id: string) => void;
}

const ProductConfiguration: React.FC<ProductConfigurationProps> = ({
  availableStorage,
  selectedStorage,
  onStorageChange,
  
  availableColors,
  selectedColor,
  onColorChange,
  
  selectedCondition,
  onConditionChange,
  availableConditions,
  
  leaseTerms,
  selectedLeaseTerm,
  onLeaseTermChange
}) => {
  const { t } = useLocalization();
  
  return (
    <div className="space-y-6">
      {availableStorage.length > 0 && (
        <StorageSelector
          title={t('product.storage')}
          options={availableStorage}
          selectedId={selectedStorage?.id || null}
          onChange={onStorageChange}
        />
      )}
      
      {availableColors.length > 0 && (
        <ColorSelector
          title={t('product.color')}
          options={availableColors}
          selectedId={selectedColor?.id || null}
          onChange={onColorChange}
        />
      )}
      
      {availableConditions.length > 0 && (
        <ConditionSelector
          title={t('product.condition.title')}
          selectedCondition={selectedCondition}
          onChange={onConditionChange}
          availableConditions={availableConditions}
        />
      )}
      
      <LeaseTermSelector
        title={t('product.leaseTerm')}
        options={leaseTerms.map(term => ({
          ...term,
          description: term.id === 'monthly' ? t('product.leaseTermDescriptions.monthly') :
                      term.id === '12month' ? t('product.leaseTermDescriptions.annual') :
                      term.id === '24month' ? t('product.leaseTermDescriptions.twoYear') :
                      term.id === '36month' ? t('product.leaseTermDescriptions.threeYear') : 
                      term.description
        }))}
        selectedId={selectedLeaseTerm?.id || null}
        onChange={onLeaseTermChange}
      />
    </div>
  );
};

export default ProductConfiguration;
