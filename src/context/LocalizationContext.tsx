import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LocalizationContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string, options?: { returnObjects?: boolean }) => any;
  translateDynamic: (text: string) => string;
  isArabic: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  // Initialize from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "en";
  });

  const direction: Direction = language === "ar" ? "rtl" : "ltr";
  const isArabic = language === "ar";

  // Cached translations for dynamic content
  const [translationCache, setTranslationCache] = useState<Record<string, string>>({});

  // Update HTML dir attribute when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language, direction]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "ar" : "en"));
  };

  // Enhanced translation function that can return objects
  const t = (key: string, options?: { returnObjects?: boolean }): any => {
    try {
      const translations = language === "ar" ? arabicTranslations : englishTranslations;
      const value = key.split('.').reduce((o, i) => o[i], translations as any);
      
      // If returnObjects is true, return the whole object/array
      if (options?.returnObjects === true) {
        return value;
      }
      
      // Otherwise return string or fallback to key
      return (typeof value === 'string') ? value : key;
    } catch (e) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  // Dynamic content translation function
  const translateDynamic = (text: string): string => {
    if (!text || language === 'en') return text;

    // Return from cache if available
    if (translationCache[text]) {
      return translationCache[text];
    }

    // Basic Arabic translations for common product-related terms
    const commonProductTerms: Record<string, string> = {
      "iPhone": "آيفون",
      "MacBook": "ماك بوك",
      "Pro": "برو",
      "Max": "ماكس",
      "Plus": "بلس",
      "Air": "إير",
      "GB": "جيجابايت",
      "TB": "تيرابايت",
      "RAM": "رام",
      "SSD": "اس اس دي",
      "Memory": "ذاكرة",
      "Storage": "تخزين",
      "Space Gray": "رمادي فضائي",
      "Silver": "فضي",
      "Gold": "ذهبي",
      "Black": "أسود",
      "White": "أبيض",
      "Blue": "أزرق",
      "Green": "أخضر",
      "Red": "أحمر",
      "Pink": "وردي",
      "Purple": "أرجواني",
      "Yellow": "أصفر",
      "Orange": "برتقالي",
      "refurbished": "مُجدد",
      "new": "جديد",
      "Brand New": "جديد تمامًا",
      "Factory sealed": "مختوم من المصنع",
      "full warranty": "ضمان كامل",
      "Smartphone": "هاتف ذكي",
      "Laptop": "حاسوب محمول",
      "Phone": "هاتف",
      "Apple": "أبل",
      "Samsung": "سامسونج",
      "Google": "جوجل",
      "display": "شاشة",
      "chip": "شريحة",
      "camera": "كاميرا",
      "battery": "بطارية",
      "life": "عمر",
      "system": "نظام",
      "Liquid Retina": "ليكويد رتينا",
      "XDR": "إكس دي آر",
      "Thunderbolt": "ثندربولت",
      "MagSafe": "ماج سيف",
      "HDMI": "إتش دي إم آي",
      "Super Retina": "سوبر رتينا",
      "Bionic": "بيونيك",
      "performance": "أداء",
      "Dual": "مزدوج",
      "Triple": "ثلاثي",
      "camera system": "نظام كاميرا",
      "Ceramic Shield": "درع سيراميك",
      "All-day battery life": "عمر بطارية طوال اليوم",
      "Face ID": "فيس آي دي",
      "Touch ID": "تتش آي دي",
      "with": "مع",
      "and": "و",
      "for": "لـ",
      "from": "من",
      "up to": "حتى",
      "ports": "منافذ",
      "card slot": "فتحة بطاقة",
      "charging": "شحن",
      "hour": "ساعة",
      "hours": "ساعات"
    };

    let translatedText = text;

    // Replace common terms with Arabic equivalents
    Object.entries(commonProductTerms).forEach(([en, ar]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      translatedText = translatedText.replace(regex, ar);
    });

    // Translate numbers to Arabic numerals when appropriate
    translatedText = translatedText.replace(/\d+/g, (match) => {
      // Convert only if it's a standalone number or part of specific patterns
      if (/^\d+$/.test(match) || /^\d+(GB|TB)$/.test(match)) {
        return match.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
      }
      return match;
    });

    // Cache the translation
    setTranslationCache(prev => ({ ...prev, [text]: translatedText }));
    
    return translatedText;
  };

  return (
    <LocalizationContext.Provider value={{ 
      language, 
      direction, 
      toggleLanguage, 
      t,
      translateDynamic,
      isArabic
    }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Import translations here to avoid circular dependencies
import { englishTranslations } from "../locales/en";
import { arabicTranslations } from "../locales/ar";
