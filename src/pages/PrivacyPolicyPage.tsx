
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicyPage = () => {
  const { t, direction, isArabic } = useLocalization();

  // English content sections
  const englishSections = [
    {
      title: "Information Collection",
      content: "We collect your personal information when you use our services or interact with our website."
    },
    {
      title: "Use of Information",
      content: "We use the data to provide services and enhance your experience on our website, including using it to communicate with you and process your requests."
    },
    {
      title: "Information Protection",
      content: "We take comprehensive security measures to protect your information from any unauthorized access, use, or alteration."
    },
    {
      title: "Information Sharing",
      content: "We pledge not to share your personal information with third parties without your explicit consent."
    },
    {
      title: "Cookies",
      content: "We use cookies to improve your experience on our website."
    },
    {
      title: "Privacy Policy Changes",
      content: "We reserve the right to update this policy periodically. Please refer to this page for the latest updates."
    }
  ];

  // Arabic content sections
  const arabicSections = [
    {
      title: "جمع المعلومات",
      content: "نجمع معلوماتك الشخصية عند تقديمك لخدماتنا أو التفاعل مع موقعنا"
    },
    {
      title: "استخدام المعلومات",
      content: "نستخدم البيانات لتقديم الخدمات وتحسين تجربتك على موقعنا، بما في ذلك استخدامها للتواصل معك ومعالجة طلبك"
    },
    {
      title: "حماية المعلومات",
      content: "نتخذ تدابير الأمان الكاملة لحماية معلوماتك من أي وصول غير مصرح به أو أي محاولة للاستخدام أو التغيير"
    },
    {
      title: "مشاركة المعلومات",
      content: "نتعهد بعدم مشاركة معلوماتك الشخصية مع أطراف ثالثة دون موافقتك الصريحة"
    },
    {
      title: "(Cookies) ملفات تعريف الارتباط",
      content: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا"
    },
    {
      title: "تغييرات على سياسة الخصوصية",
      content: "نحتفظ بحق تحديث هذه السياسة بشكل دوري، يرجى مراجعة هذه الصفحة للحصول على آخر التحديثات"
    }
  ];

  // Choose the appropriate content based on the selected language
  const sections = isArabic ? arabicSections : englishSections;
  const pageTitle = isArabic ? "سياسة الخصوصية" : "Privacy Policy";
  const pageDescription = isArabic 
    ? "نولي أهمية كبيرة للخصوصية العامة ونسعى جاهدين لحمايتها. نرجو قراءة السياسة التالية لفهم كافة الإجراءات المتعلقة بجمع المعلومات والحفاظ عليها بالإضافة الى حماية البيانات و المعلومات الشخصية"
    : "We attach great importance to privacy and strive to protect it diligently. Please read the following policy to understand all the procedures related to collecting and preserving information, in addition to data protection and personal information.";

  return (
    <div className="pt-20" style={{ direction }}>
      {/* Hero Section */}
      <div className="bg-secondary/5 py-16 md:py-24">
        <div className="container-tight">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              {pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {pageDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="section">
        <div className="container-tight">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-8">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-primary mb-4">{section.title}</h2>
                <p className="text-muted-foreground">{section.content}</p>
                {index < sections.length - 1 && <Separator className="mt-8" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
