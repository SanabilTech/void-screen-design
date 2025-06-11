
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";

interface FeaturesSectionProps {
  className?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ className }) => {
  const { t } = useLocalization();
  
  const features = [
    {
      icon: <img src="/lovable-uploads/456a755f-3d3f-4d30-82f8-cfd5d677ca90.png" alt="Choose Device" className="w-16 h-16 object-contain" style={{ width: "64px", height: "64px" }} />,
      title: t("features.steps.chooseDevice.title"),
      description: t("features.steps.chooseDevice.description"),
    },
    {
      icon: <img src="/lovable-uploads/3f4c2eca-46ee-42f5-a9ae-a61ea4096286.png" alt="Select Plan" className="w-16 h-16 object-contain" style={{ width: "64px", height: "64px" }} />,
      title: t("features.steps.selectPlan.title"),
      description: t("features.steps.selectPlan.description"),
    },
    {
      icon: <img src="/lovable-uploads/1dc831d1-8eea-4c87-948c-15748f3f23c0.png" alt="Fast Delivery" className="w-16 h-16 object-contain" style={{ width: "64px", height: "64px" }} />,
      title: t("features.steps.fastDelivery.title"),
      description: t("features.steps.fastDelivery.description"),
    },
    {
      icon: <img src="/lovable-uploads/48e637d7-34ae-4fd6-a13b-da9e841df9b9.png" alt="Use & Return" className="w-16 h-16 object-contain" style={{ width: "64px", height: "64px" }} />,
      title: t("features.steps.useReturn.title"),
      description: t("features.steps.useReturn.description"),
    },
  ];

  return (
    <section className={`section ${className}`}>
      <div className="container-tight text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">{t("features.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("features.description")}
        </p>
      </div>

      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 flex flex-col items-center text-center space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
