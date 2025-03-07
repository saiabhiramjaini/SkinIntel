import { Badge } from "@/components/ui/badge";
import { LandingNavbar } from "@/components/LandingNavbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/FeatureCard";
import { features } from "@/utils/features";
import { Footer } from "@/components/Footer";
import { processSteps } from "@/utils/processSteps";
import { ProcessStep } from "@/components/ProcessStep";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <LandingNavbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mb-4">
                Features
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Advanced Technology for Precise Diagnosis
              </h2>
              <p className="text-lg text-slate-600">
                Our hybrid CNN approach combines efficiency and accuracy to
                provide healthcare professionals with reliable diagnostic
                support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mb-4">
                Process
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                How SkinIntel Works
              </h2>
              <p className="text-lg text-slate-600">
                Our advanced AI system processes dermatoscopic images through
                multiple stages to provide accurate classification of skin
                conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-100 -z-10 transform -translate-y-1/2"></div>

              {processSteps.map((step, index) => (
                <ProcessStep key={index} {...step} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
