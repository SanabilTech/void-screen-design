
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin, ShieldCheck } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useLocalization } from "@/context/LocalizationContext";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t, direction } = useLocalization();

  return (
    <footer className="bg-secondary/5 py-12 mt-auto" style={{ direction }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo variant="dark" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4" style={{ gap: '1rem' }}>
              <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-primary">{t("footer.categories.products")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?type=smartphone" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.smartphones")}
                </Link>
              </li>
              <li>
                <Link to="/products?type=laptop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.laptops")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.allProducts")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-primary">{t("footer.categories.company")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.contact")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-primary">{t("footer.categories.support")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.faq")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.termsConditions")}
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.links.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Jihazi. {t("footer.copyright")}
          </p>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full text-xs font-medium flex items-center gap-1.5 px-3 py-1 h-7 border-primary/20 text-primary hover:bg-primary/5"
              asChild
            >
              <Link to="/admin">
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
