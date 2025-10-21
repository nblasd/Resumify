'use client';

import {
  Navigation,
  HeroSection,
  FeaturesSection,
  CTASection,
  Footer
} from '../components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="pricing">
        <CTASection />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}