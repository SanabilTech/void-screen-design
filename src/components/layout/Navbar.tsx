
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Smartphone, Laptop, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { useLocalization } from "@/context/LocalizationContext";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const { t, toggleLanguage, language, direction } = useLocalization();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.allProducts"), path: "/products" },
    { name: t("navigation.smartphones"), path: "/products?type=smartphone" },
    { name: t("navigation.laptops"), path: "/products?type=laptop" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
      style={{ direction }}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <Logo variant="light" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6" style={{ gap: '1.5rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                location.pathname === link.path ||
                (link.path.includes("?type=") &&
                  location.pathname === "/products" &&
                  location.search.includes(link.path.split("?")[1]))
                  ? "text-primary after:scale-x-100"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 hover:bg-secondary/20"
            aria-label={t("common.otherLanguage")}
          >
            <Globe className="h-4 w-4" />
            <span>{t("common.toggleLanguage")}</span>
          </Button>
        </nav>

        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white p-0">
            <DrawerHeader className="border-b p-4 flex justify-between items-center">
              <Link to="/" className="flex items-center" onClick={() => setIsDrawerOpen(false)}>
                <Logo variant="light" />
              </Link>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="px-4 py-6 bg-white">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path ||
                      (link.path.includes("?type=") &&
                        location.pathname === "/products" &&
                        location.search.includes(link.path.split("?")[1]))
                        ? "bg-secondary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/10"
                    }`}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {link.path.includes("smartphone") && <Smartphone className={language === "ar" ? "ml-2" : "mr-2"} size={16} />}
                    {link.path.includes("laptop") && <Laptop className={language === "ar" ? "ml-2" : "mr-2"} size={16} />}
                    {link.name}
                  </Link>
                ))}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toggleLanguage();
                    setIsDrawerOpen(false);
                  }}
                  className="flex items-center justify-start py-2 px-4 rounded-lg text-sm font-medium hover:bg-secondary/10"
                >
                  <Globe className={language === "ar" ? "ml-2" : "mr-2"} size={16} />
                  <span>{t("common.otherLanguage")}</span>
                </Button>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
