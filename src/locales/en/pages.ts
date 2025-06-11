
import { PagesTranslations } from '../structure';

export const pages: PagesTranslations = {
  about: {
    title: "About Us",
    description: "Learn more about our mission and values.",
    ourStory: "Our Story",
    ourValues: "Our Values",
    ourTeam: "Meet Our Team",
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with our support team.",
    form: {
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent!",
      successDescription: "Thank you for contacting us. We'll respond shortly.",
    },
    info: {
      phone: "Phone",
      email: "Email",
      office: "Office",
    },
  },
  terms: {
    title: "Terms & Conditions",
    description: "Please read these terms carefully before using our services.",
    lastUpdated: "Last updated:",
    intro: {
      title: "1. Introduction",
      welcome: "Welcome to Jihazi.",
      governsUse: "These Terms and Conditions govern your use of our website and services.",
      agreeToBeBound: "By accessing or using our services, you agree to be bound by these Terms.",
      disagree: "If you disagree with any part of the terms, you may not access the service."
    },
    leasing: {
      title: "2. Leasing Terms",
      intro: "Jihazi provides device leasing services subject to the following conditions:",
      terms: [
        "Lease terms range from monthly to 36 months based on the selected plan.",
        "All leased devices remain the property of Jihazi throughout the lease period.",
        "The lessee is responsible for the care and maintenance of the device.",
        "Early termination fees may apply as specified in your lease agreement.",
        "Optional protection plans are available at an additional cost."
      ]
    },
    payment: {
      title: "3. Payment Terms",
      intro: "By entering into a lease agreement with Jihazi, you agree to the following payment terms:",
      terms: [
        "Monthly payments are due on the same day each month as specified in your lease agreement.",
        "Payments can be made via credit card, bank transfer, or other approved payment methods.",
        "Late payments may incur additional fees as outlined in your lease agreement.",
        "Failure to make payments may result in termination of the lease and device retrieval."
      ]
    },
    device: {
      title: "4. Device Condition",
      intro: "All devices provided by Jihazi are subject to the following conditions:",
      terms: [
        "New devices are factory sealed with full manufacturer warranty.",
        "Refurbished devices have been professionally restored and certified.",
        "The lessee must return the device in good working condition, with reasonable wear and tear accepted.",
        "Damage beyond normal wear and tear may result in additional charges."
      ]
    },
    privacy: {
      title: "5. Privacy Policy",
      important: "Your privacy is important to us.",
      explains: "Our Privacy Policy explains how we collect, use, and protect your personal information.",
      consent: "By using our services, you consent to our privacy practices as outlined in our Privacy Policy."
    },
    termination: {
      title: "6. Termination",
      reserves: "Jihazi reserves the right to terminate service to any user for violation of these Terms and Conditions or for any other reason deemed appropriate by management.",
      must: "Upon termination, the lessee must return all leased devices according to the return procedure outlined in the lease agreement."
    },
    changes: {
      title: "7. Changes to Terms",
      reserves: "Jihazi reserves the right to modify these terms at any time.",
      notice: "We will provide notice of significant changes by updating the date at the top of this page.",
      continued: "Continued use of our services after such modifications constitutes your acceptance of the revised terms."
    },
    contact: {
      title: "8. Contact Information",
      questions: "If you have any questions about these Terms and Conditions, please contact us at:",
      email: "Email: legal@jihazi.com",
      address: "Address: King Fahd Road, Riyadh, Saudi Arabia"
    }
  },
};
