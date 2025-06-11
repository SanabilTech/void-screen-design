
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  const { t, direction } = useLocalization();

  return (
    <div className="pt-20" style={{ direction }}>
      {/* Hero Section */}
      <div className="bg-secondary/5 py-16 md:py-24">
        <div className="container-tight">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              {t('pages.terms.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pages.terms.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="section">
        <div className="container-tight">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.intro.title')}</h2>
              <p className="text-muted-foreground">
                {t('pages.terms.intro.welcome')} {t('pages.terms.intro.governsUse')} {t('pages.terms.intro.agreeToBeBound')} {t('pages.terms.intro.disagree')}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.leasing.title')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('pages.terms.leasing.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {t('pages.terms.leasing.terms', { returnObjects: true })?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.payment.title')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('pages.terms.payment.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {t('pages.terms.payment.terms', { returnObjects: true })?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.device.title')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('pages.terms.device.intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {t('pages.terms.device.terms', { returnObjects: true })?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.privacy.title')}</h2>
              <p className="text-muted-foreground">
                {t('pages.terms.privacy.important')} {t('pages.terms.privacy.explains')} {t('pages.terms.privacy.consent')}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.termination.title')}</h2>
              <p className="text-muted-foreground">
                {t('pages.terms.termination.reserves')} {t('pages.terms.termination.must')}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.changes.title')}</h2>
              <p className="text-muted-foreground">
                {t('pages.terms.changes.reserves')} {t('pages.terms.changes.notice')} {t('pages.terms.changes.continued')}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{t('pages.terms.contact.title')}</h2>
              <p className="text-muted-foreground">
                {t('pages.terms.contact.questions')}
              </p>
              <p className="font-medium mt-2">
                {t('pages.terms.contact.email')}<br />
                {t('pages.terms.contact.address')}
              </p>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground text-center mt-8">
                {t('pages.terms.lastUpdated')} June 1, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
