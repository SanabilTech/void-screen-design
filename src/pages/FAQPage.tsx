
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const FAQPage = () => {
  const { t, direction, isArabic } = useLocalization();

  const faqs = [
    {
      question: isArabic ? "كيف يعمل نظام تأجير الأجهزة؟" : "How does the device leasing work?",
      answer: isArabic 
        ? "عملية تأجير الأجهزة لدينا سهلة: تختار الجهاز، وتحدد مدة الإيجار (شهري، 12، 24، أو 36 شهرًا)، ونقوم بتوصيله إلى بابك. تدفع رسومًا شهرية ثابتة طوال مدة عقد الإيجار. عند انتهاء مدة الإيجار، يمكنك إعادة الجهاز، أو الترقية إلى طراز أحدث، أو في بعض الحالات، شراء الجهاز بسعر مخفض."
        : "Our device leasing is simple - you choose a device, select a lease term (monthly, 12, 24, or 36 months), and we deliver it to your door. You pay a fixed monthly fee for the duration of your lease. When your lease ends, you can return the device, upgrade to a newer model, or in some cases, purchase the device at a reduced cost."
    },
    {
      question: isArabic ? "هل يمكنني ترقية جهازي خلال مدة الإيجار؟" : "Can I upgrade my device during my lease?",
      answer: isArabic
        ? "نعم! نقدم خيارات ترقية مرنة. إذا كان إيجارك شهريًا، فيمكنك الترقية في أي وقت. أما إذا كان لديك عقد إيجار طويل الأجل، فيمكنك الترقية بعد انقضاء فترة دنيا (عادةً ما بين 6 إلى 12 شهرًا، حسب خطتك)، وذلك عن طريق إعادة جهازك الحالي بحالة جيدة وبدء عقد إيجار جديد."
        : "Yes! We offer flexible upgrade options. If you're on a monthly lease, you can upgrade anytime. If you're on a longer-term lease, you can upgrade after a minimum period (typically 6-12 months, depending on your plan) by returning your current device in good condition and starting a new lease."
    },
    {
      question: isArabic ? "ماذا يحدث إذا تعرض جهازي للتلف؟" : "What happens if my device gets damaged?",
      answer: isArabic
        ? "نوصي بإضافة \"خطة الحماية\" الخاصة بنا عند إتمام عملية الدفع، وهي تغطي الأضرار العرضية، وانسكاب السوائل، والسقوط. إذا تعرض جهازك للتلف وكان لديك خطة الحماية، فستدفع فقط مبلغ تحمل بسيط (خصم) لتغطية تكاليف الإصلاح أو الاستبدال. أما بدون الخطة، فستكون مسؤولاً عن التكلفة الكاملة للإصلاحات، أو عن دفعات الإيجار المتبقية إذا كان الجهاز غير قابل للإصلاح."
        : "We recommend adding our Protection Plan during checkout, which covers accidental damage, spills, and drops. If your device is damaged and you have the Protection Plan, you'll only pay a small deductible for repairs or replacement. Without the plan, you'll be responsible for the full cost of repairs or the remaining lease payments if the device can't be repaired."
    },
    {
      question: isArabic ? "هل تقدمون خدمات التوصيل؟" : "Do you offer delivery services?",
      answer: isArabic
        ? "نعم، نقدم خدمة توصيل مجانية لجميع عقود تأجير الأجهزة. عادةً ما تصل الشحنات خلال 24 ساعة للأجهزة المتوفرة في المخزون داخل المدن الرئيسية، وخلال يومي عمل إلى ثلاثة أيام عمل للمناطق الأخرى."
        : "Yes, we offer free delivery on all device leases. Deliveries typically arrive within 24 hours for in-stock items in major cities, and within 2-3 business days for other locations."
    },
    {
      question: isArabic ? "ما هي طرق الدفع التي تقبلونها؟" : "What payment methods do you accept?",
      answer: isArabic
        ? "نقبل جميع بطاقات الائتمان والخصم الرئيسية (مثل مدى، فيزا، ماستركارد)، و Apple Pay، و Google Pay، والتحويلات البنكية. بالنسبة لعقود إيجار الشركات، نوفر أيضًا خيار الدفع عن طريق الفواتير."
        : "We accept all major credit and debit cards, Apple Pay, Google Pay, and bank transfers. For business leases, we also offer invoice payment options."
    },
    {
      question: isArabic ? "هل يمكن للشركات استئجار أجهزة متعددة؟" : "Can businesses lease multiple devices?",
      answer: isArabic
        ? "بالتأكيد! نقدم برامج تأجير خاصة للشركات التي تحتاج إلى أجهزة متعددة. تشمل خطط الأعمال لدينا خصومات على الكميات الكبيرة، ومديري حسابات مخصصين، وشروط دفع مرنة. لمزيد من المعلومات، يرجى التواصل مع فريق حلول الأعمال لدينا."
        : "Absolutely! We offer special business leasing programs for companies needing multiple devices. Our business plans include volume discounts, dedicated account managers, and flexible payment terms. Please contact our business solutions team for more information."
    },
    {
      question: isArabic ? "ما هي حالة الأجهزة المعروضة؟" : "What condition are the devices in?",
      answer: isArabic
        ? "نقدم كلاً من الأجهزة الجديدة تمامًا والمغلفة من المصنع مع ضمانات كاملة من الشركة المصنعة، والأجهزة المجددة المعتمدة. تخضع أجهزتنا المجددة لعملية فحص دقيقة تشمل 50 نقطة، ويتم استبدال جميع الأجزاء حسب الحاجة، كما تأتي مع ضمان خاص بنا."
        : "We offer both brand-new factory-sealed devices with full manufacturer warranties and certified refurbished devices. Our refurbished devices undergo a rigorous 50-point inspection process, have all parts replaced as needed, and come with our own warranty."
    },
    {
      question: isArabic ? "كيف أعيد جهازي عند انتهاء مدة الإيجار؟" : "How do I return my device when my lease ends?",
      answer: isArabic
        ? "عندما يقترب موعد انتهاء عقد الإيجار الخاص بك، سنرسل لك \"مجموعة أدوات الإرجاع\" مع التعليمات اللازمة. كل ما عليك هو تغليف جهازك في العبوة المرفقة واستخدام ملصق الشحن المدفوع مسبقًا لإعادته إلينا. بمجرد استلام الجهاز وفحصه، سنقوم بإغلاق عقد إيجارك. إذا كنت ترغب في تمديد عقد الإيجار أو الترقية إلى جهاز جديد، يمكنك القيام بذلك قبل إعادة جهازك الحالي."
        : "When your lease is nearing its end, we'll send you a return kit with instructions. Simply pack your device in the provided packaging and use the prepaid shipping label to send it back. Once we receive and inspect the device, we'll close out your lease. If you'd like to extend your lease or upgrade to a new device, you can do so before returning your current one."
    }
  ];

  const pageTitle = isArabic ? "الأسئلة الشائعة | جهازي" : "FAQ | Jihazi";
  const pageDescription = isArabic 
    ? "ابحث عن إجابات للأسئلة الأكثر شيوعًا حول خدمة تأجير الأجهزة لدينا."
    : "Find answers to the most common questions about our device leasing service.";

  return (
    <div className="pt-20" style={{ direction }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-secondary/5 py-16 md:py-24">
        <div className="container-tight">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {isArabic 
                ? "ابحث عن إجابات للأسئلة الأكثر شيوعًا حول خدمة تأجير الأجهزة لدينا."
                : "Find answers to the most common questions about our device leasing service."}
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="section">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              {isArabic ? "هل لديك أسئلة أخرى؟" : "Still have questions?"} <a href="/contact" className="text-primary hover:underline">{isArabic ? "تواصل مع فريق الدعم لدينا" : "Contact our support team"}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
