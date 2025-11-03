import { Hero } from '../components/landing/Hero';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { SocialProof } from '../components/landing/SocialProof';
import { FAQ } from '../components/landing/FAQ';
import { PricingPreview } from '../components/landing/PricingPreview';
import { LandingCTA } from '../components/landing/LandingCTA';
import { SEO } from '../components/shared/SEO';
import { SEOContent } from '../components/landing/SEOContent';

export default function LandingPage() {
  return (
    <>
      <SEO 
        title="JobHarvest — AI-Powered Job Discovery Engine"
        description="Stop scrolling job boards. Let AI hunt for you. Real-time scraping across LinkedIn, Indeed, and more to find your perfect job."
      />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <SocialProof />
      <PricingPreview />
      <FAQ />
      <SEOContent />
      <LandingCTA />
    </>
  );
}
