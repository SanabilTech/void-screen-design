
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";

interface TranslatableTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  translateKey?: string; // Optional translation key for direct lookup
  arabicText?: string; // Optional direct Arabic text to use instead of translation
  description_ar?: string; // Optional Arabic description specifically for product descriptions
  name_ar?: string; // Optional Arabic name specifically for product names
}

const TranslatableText: React.FC<TranslatableTextProps> = ({ 
  text, 
  className, 
  as: Component = 'span',
  translateKey,
  arabicText,
  description_ar,
  name_ar
}) => {
  const { translateDynamic, t, isArabic, direction } = useLocalization();
  
  // If Arabic name is provided for product names and we're in Arabic mode, use it
  if (name_ar && isArabic) {
    return <Component className={className} dir="rtl">{name_ar}</Component>;
  }
  
  // If Arabic description is provided for product descriptions and we're in Arabic mode, use it
  if (description_ar && isArabic) {
    return <Component className={className} dir="rtl">{description_ar}</Component>;
  }
  
  // If Arabic text is directly provided and we're in Arabic mode, use it
  if (arabicText && isArabic) {
    return <Component className={className} dir="rtl">{arabicText}</Component>;
  }
  
  // Special handling for terms related to "monthly" in Arabic
  if (isArabic) {
    if (text === "Monthly" || text === "monthly") {
      return <Component className={className} dir="rtl">شهريًا</Component>;
    }
    if (text === "/month" || text === "/mo") {
      return <Component className={className} dir="rtl">شهريًا</Component>;
    }
    if (text === "New") {
      return <Component className={className} dir="rtl">جديد</Component>;
    }
    if (text === "Refurbished") {
      return <Component className={className} dir="rtl">مُجدد</Component>;
    }
    if (text === "Phone") {
      return <Component className={className} dir="rtl">هاتف</Component>;
    }
    if (text === "Laptop") {
      return <Component className={className} dir="rtl">لابتوب</Component>;
    }
  }
  
  // If a direct translation key is provided, use t() first
  if (translateKey && isArabic) {
    try {
      const directTranslation = t(translateKey);
      if (directTranslation && directTranslation !== translateKey) {
        return <Component className={className} dir="rtl">{directTranslation}</Component>;
      }
    } catch (e) {
      // If key lookup fails, fall back to dynamic translation
      console.debug(`Translation key not found: ${translateKey}`);
    }
  }
  
  // Custom word replacement for specific terms in Arabic
  let translatedText = isArabic ? translateDynamic(text) : text;
  
  // Replace "months" with "شهر" specifically for Arabic
  if (isArabic && typeof translatedText === 'string') {
    translatedText = translatedText.replace(/(\d+)\s*months/g, "$1 شهر");
    translatedText = translatedText.replace(/month/g, "شهر");
    translatedText = translatedText.replace(/\/month/g, "شهريًا");
    translatedText = translatedText.replace(/\/mo/g, "شهريًا");
    translatedText = translatedText.replace(/Monthly/g, "شهريًا");
    translatedText = translatedText.replace(/monthly/g, "شهريًا");
  }
  
  return (
    <Component className={className} dir={isArabic ? "rtl" : "ltr"}>
      {translatedText}
    </Component>
  );
};

export default TranslatableText;
