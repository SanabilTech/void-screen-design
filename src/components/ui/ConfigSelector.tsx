import React from "react";
import { StorageOption, ColorOption, DeviceCondition, LeaseTerm } from "../../types/product";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

interface ConfigSelectorProps {
  title: string;
  description?: string;
}

interface StorageSelectorProps extends ConfigSelectorProps {
  options: StorageOption[];
  selectedId: string | null;
  onChange: (id: string) => void;
}

interface ColorSelectorProps extends ConfigSelectorProps {
  options: ColorOption[];
  selectedId: string | null;
  onChange: (id: string) => void;
}

interface ConditionSelectorProps extends ConfigSelectorProps {
  selectedCondition: DeviceCondition;
  onChange: (condition: DeviceCondition) => void;
  availableConditions?: DeviceCondition[];
}

interface LeaseTermSelectorProps extends ConfigSelectorProps {
  options: LeaseTerm[];
  selectedId: string | null;
  onChange: (id: string) => void;
}

export const StorageSelector: React.FC<StorageSelectorProps> = ({
  title,
  description,
  options,
  selectedId,
  onChange,
}) => {
  const { isArabic } = useLocalization();
  
  return (
    <div className="space-y-4">
      <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
        <h3 className="text-base font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      
      <RadioGroup
        value={selectedId || ""}
        onValueChange={onChange}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        {options.map((option) => (
          <div key={option.id}>
            <RadioGroupItem
              value={option.id}
              id={`storage-${option.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`storage-${option.id}`}
              className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-secondary/30 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="text-sm font-medium">{option.capacity}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  title,
  description,
  options,
  selectedId,
  onChange,
}) => {
  const { isArabic } = useLocalization();
  
  return (
    <div className="space-y-4">
      <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
        <h3 className="text-base font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      
      <RadioGroup
        value={selectedId || ""}
        onValueChange={onChange}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        {options.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem
              value={option.id}
              id={`color-${option.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`color-${option.id}`}
              className="flex flex-col items-center space-y-1.5 cursor-pointer"
            >
              <span 
                className={`w-9 h-9 rounded-full border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-primary [&:has([data-state=checked])]:ring-offset-2`}
                style={{ backgroundColor: option.value }}
              />
              <span className="text-xs">{option.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  title,
  description,
  selectedCondition,
  onChange,
  availableConditions = ["new", "refurbished"]
}) => {
  const { isArabic } = useLocalization();
  
  if (availableConditions.length === 0) {
    return (
      <div className="space-y-4">
        <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-sm text-red-500 mt-2">No conditions are currently available for this product.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
        <h3 className="text-base font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      
      <RadioGroup
        value={selectedCondition}
        onValueChange={(value) => onChange(value as DeviceCondition)}
        className="grid grid-cols-2 gap-3"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        {availableConditions.includes("new") && (
          <div>
            <RadioGroupItem value="new" id="condition-new" className="peer sr-only" />
            <Label
              htmlFor="condition-new"
              className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-secondary/30 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
            >
              <span className="text-sm font-medium">
                <TranslatableText 
                  text="Brand New" 
                  translateKey="product.condition.brandNew" 
                />
              </span>
              <span className="text-xs text-muted-foreground mt-1 text-center">
                <TranslatableText 
                  text="Factory sealed, full warranty" 
                  translateKey="product.condition.factorySealed" 
                />
              </span>
            </Label>
          </div>
        )}
        
        {availableConditions.includes("refurbished") && (
          <div>
            <RadioGroupItem value="refurbished" id="condition-refurbished" className="peer sr-only" />
            <Label
              htmlFor="condition-refurbished"
              className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-secondary/30 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
            >
              <span className="text-sm font-medium">
                <TranslatableText 
                  text="Refurbished" 
                  translateKey="product.condition.refurbished" 
                />
              </span>
              <span className="text-xs text-muted-foreground mt-1 text-center">
                <TranslatableText 
                  text="20% cheaper, inspected & certified" 
                  translateKey="product.condition.refurbishedDescription" 
                />
              </span>
            </Label>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};

export const LeaseTermSelector: React.FC<LeaseTermSelectorProps> = ({
  title,
  description,
  options,
  selectedId,
  onChange,
}) => {
  const { isArabic } = useLocalization();
  
  return (
    <div className="space-y-4">
      <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
        <h3 className="text-base font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      
      <RadioGroup
        value={selectedId || ""}
        onValueChange={onChange}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        {options.map((option) => {
          const arabicTermName = isArabic 
            ? option.id === 'monthly' 
              ? 'شهريًا' 
              : option.name.replace(/(\d+)\s*months?/i, (match, num) => {
                  return `${num} شهر`;
                })
            : option.name;
          
          return (
            <div key={option.id}>
              <RadioGroupItem
                value={option.id}
                id={`term-${option.id}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`term-${option.id}`}
                className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-secondary/30 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
              >
                <span className="text-sm font-medium">
                  {isArabic ? arabicTermName : (
                    <TranslatableText 
                      text={option.name} 
                      translateKey={`product.leaseTerms.${option.id}`} 
                    />
                  )}
                </span>
                <span className="text-xs text-muted-foreground mt-1 text-center">
                  <TranslatableText 
                    text={option.description} 
                    translateKey={`product.leaseTermDescriptions.${option.id.replace('month', '')}`} 
                  />
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
