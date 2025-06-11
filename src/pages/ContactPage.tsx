
import React, { useState } from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const { t, direction, isArabic } = useLocalization();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Call the Edge Function to send emails
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Show success message
      toast({
        title: isArabic ? t("pages.contact.form.success") : "Message sent!",
        description: isArabic ? t("pages.contact.form.successDescription") : "Thank you for contacting us. We'll respond shortly.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: isArabic ? "حدث خطأ" : "An error occurred",
        description: isArabic 
          ? "لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى."
          : "We couldn't send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageTitle = isArabic ? "تواصل معنا | جهازي" : "Contact Us | Jihazi";

  return (
    <div className="pt-20" style={{ direction }}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-secondary/5 py-16 md:py-24">
        <div className="container-tight">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {isArabic ? "هل لديك أسئلة أو تحتاج مساعدة؟ نحن هنا لمساعدتك!" : "Have questions or need assistance? We're here to help!"}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="section bg-secondary/5">
        <div className="container-tight">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {isArabic ? "أرسل لنا رسالة" : "Send us a message"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {isArabic ? "اسمك" : "Your Name"}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={isArabic ? "عبدالله" : "John Doe"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {isArabic ? t("pages.contact.form.email") : "Email Address"}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">
                  {isArabic ? "موضوع" : "Subject"}
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={isArabic ? "كيف يمكننا مساعدتك؟" : "How can we help you?"}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">
                  {isArabic ? "رسالتك" : "Your Message"}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isArabic ? "اكتب رسالتك هنا" : "Write your message here..."}
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isArabic ? t("pages.contact.form.sending") : "Sending..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {isArabic ? "أرسل رسالة" : "Send Message"}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
