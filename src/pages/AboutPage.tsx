import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { Building2, Users, Award, Globe } from "lucide-react";
const AboutPage = () => {
  const {
    t,
    direction
  } = useLocalization();
  return <div className="pt-20" style={{
    direction
  }}>
      {/* Hero Section */}
      <div className="bg-secondary/5 py-16 md:py-24">
        <div className="container-tight">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              About Jihazi
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make premium devices accessible to everyone through flexible leasing options.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="section">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Our Story</h2>
              <p className="text-muted-foreground">
                Jihazi was founded in 2023 with a simple idea: technology should be accessible to everyone. 
                We noticed a gap in the market where people were either forced to commit to expensive devices 
                long-term or settle for outdated technology.
              </p>
              <p className="text-muted-foreground">
                Our team of tech enthusiasts and finance experts came together to create a flexible leasing model 
                that gives our customers access to the latest smartphones and laptops without the burden of 
                ownership or long-term commitment.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-secondary/5 aspect-video flex items-center justify-center">
              <img alt="Our team working together" src="/lovable-uploads/8737fe0f-761c-490e-b21f-b69c48db6ef1.jpg" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="section bg-secondary/5">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Our Values</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              At Jihazi, our values guide everything we do from customer service to our environmental initiatives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer First</h3>
              <p className="text-muted-foreground">We design our services with our customers' needs at the center.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality</h3>
              <p className="text-muted-foreground">We only offer devices that meet our high standards for performance and reliability.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
              <p className="text-muted-foreground">We promote device reuse and proper recycling to reduce electronic waste.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
              <p className="text-muted-foreground">We believe everyone deserves access to modern technology regardless of financial situation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AboutPage;