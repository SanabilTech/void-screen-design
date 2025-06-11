
// Define the structure for all translations
export interface TranslationStructure {
  common: CommonTranslations;
  navigation: NavigationTranslations;
  hero: HeroTranslations;
  features: FeaturesTranslations;
  categories: CategoriesTranslations;
  cta: CTATranslations;
  footer: FooterTranslations;
  product: ProductTranslations;
  checkout: CheckoutTranslations;
  pages: PagesTranslations;
  faq?: FAQTranslations;
  thankYou?: ThankYouTranslations;
}

// Define interfaces for each section
export interface CommonTranslations {
  languageName: string;
  otherLanguage: string;
  toggleLanguage: string;
}

export interface NavigationTranslations {
  home: string;
  allProducts: string;
  smartphones: string;
  laptops: string;
  about: string;
  contact: string;
  terms: string;
}

export interface HeroTranslations {
  tagline: string;
  title: string;
  description: string;
  exploreDevices: string;
  browseSmartphones: string;
  features: {
    noCreditChecks: string;
    freeDelivery: string;
    cancelAnytime: string;
  };
}

export interface FeaturesTranslations {
  title: string;
  description: string;
  steps: {
    chooseDevice: {
      title: string;
      description: string;
    };
    selectPlan: {
      title: string;
      description: string;
    };
    fastDelivery: {
      title: string;
      description: string;
    };
    useReturn: {
      title: string;
      description: string;
    };
  };
}

export interface CategoriesTranslations {
  title: string;
  description: string;
  smartphones: {
    title: string;
    description: string;
    cta: string;
  };
  laptops: {
    title: string;
    description: string;
    cta: string;
  };
}

export interface CTATranslations {
  title: string;
  description: string;
  browseDevices: string;
}

export interface FooterTranslations {
  description: string;
  categories: {
    products: string;
    company: string;
    support: string;
  };
  links: {
    smartphones: string;
    laptops: string;
    allProducts: string;
    aboutUs: string;
    careers: string;
    contact: string;
    faq: string;
    termsConditions: string;
    privacyPolicy: string;
  };
  copyright: string;
}

export interface ProductTranslations {
  from: string;
  month: string;
  leaseTerms: {
    monthly: string;
    annual: string;
    twoYear: string;
    threeYear: string;
  };
  selectOptions: string;
  storage: string;
  color: string;
  condition: {
    title: string;
    new: string;
    refurbished: string;
    brandNew: string;
    factorySealed: string;
    refurbishedDescription: string;
  };
  leaseTerm: string;
  leaseTermDescriptions: {
    monthly: string;
    annual: string;
    twoYear: string;
    threeYear: string;
  };
  addToCart: string;
  features: string;
  specifications: string;
  relatedProducts: string;
  back: string;
  notFound: string;
  notFoundDescription: string;
  loadingPrice: string;
  payment: string;
  businessOrders: {
    title: string;
    description: string;
  };
  search: string;
  searchResults: string;
  clear: string;
  monthlyPriceUnit?: string;
  offMonthly?: string;
  descriptionHeader?: string;
}

export interface CheckoutTranslations {
  title: string;
  customerInformation: string;
  orderReview: string;
  protectionPlan: string;
  summary: string;
  placeOrder: string;
  contactDetails: string;
  shippingAddress: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  orderTotal: string;
  returnToProduct: string;
  back: string;
  contactInfo: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  orderType: string;
  individual: string;
  business: string;
  businessName: string;
  continueToProtection: string;
  jihaziProtection: string;
  protectYourDevice: string;
  withProtection: string;
  withoutProtection: string;
  standardCoverageOnly: string;
  noAdditionalCost: string;
  manufacturerWarrantyOnly: string;
  standardSupportChannels: string;
  youPayForRepairs: string;
  jihaziProtectionPlan: string;
  addedToMonthlyPayment: string;
  accidentalDamageProtection: string;
  priorityReplacementService: string;
  technicalSupport: string;
  continueToReview: string;
  reviewOrder: string;
  reviewOrderDesc: string;
  customerInfo: string;
  name: string;
  productDetails: string;
  leaseTerm: string;
  description: string;
  priceSummary: string;
  paymentPrompt: string;
  agreeToPayment: string;
  processing: string;
  monthlyLease: string;
  notAdded: string;
  totalMonthly: string;
  verificationDocuments?: string;
  verificationInstructions?: string;
  nationalId?: string;
  nationalIdDescription?: string;
  salaryCertificate?: string;
  salaryCertificateDescription?: string;
  dragAndDrop?: string;
  clickToUpload?: string;
  uploadNationalId?: string;
  uploadSalaryCertificate?: string;
  securityNote?: string;
  reviewApplication?: string;
  reviewApplicationDesc?: string;
  applicationSubmitDisclaimer?: string;
  submitApplication?: string;
  errors: {
    fullNameMin: string;
    invalidEmail: string;
    invalidPhone: string;
    businessNameRequired: string;
    phoneFormat: string;
  };
}

export interface PagesTranslations {
  about: {
    title: string;
    description: string;
    ourStory: string;
    ourValues: string;
    ourTeam: string;
  };
  contact: {
    title: string;
    description: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      successDescription: string;
    };
    info: {
      phone: string;
      email: string;
      office: string;
    };
  };
  terms: {
    title: string;
    description: string;
    lastUpdated: string;
    intro: {
      title: string;
      welcome: string;
      governsUse: string;
      agreeToBeBound: string;
      disagree: string;
    };
    leasing: {
      title: string;
      intro: string;
      terms: string[];
    };
    payment: {
      title: string;
      intro: string;
      terms: string[];
    };
    device: {
      title: string;
      intro: string;
      terms: string[];
    };
    privacy: {
      title: string;
      important: string;
      explains: string;
      consent: string;
    };
    termination: {
      title: string;
      reserves: string;
      must: string;
    };
    changes: {
      title: string;
      reserves: string;
      notice: string;
      continued: string;
    };
    contact: {
      title: string;
      questions: string;
      email: string;
      address: string;
    };
  };
}

export interface FAQTranslations {
  title: string;
  description: string;
  questions: {
    [key: string]: {
      question: string;
      answer: string;
    };
  };
  stillHaveQuestions: string;
  contactSupport: string;
}

export interface ThankYouTranslations {
  title: string;
  message: string;
  nextSteps: string;
  step1: string;
  step2: string;
  step3: string;
  returnHome: string;
}

export interface ProductsPageTranslations {
  errorLoading: string;
  tryAgain: string;
  noProducts: string;
  noProductsDescription: string;
  viewAllProducts: string;
  allDevices: string;
}
