"use client";

import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Preloader } from "@/components/site/preloader";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Marquee, Stats } from "@/components/site/marquee-stats";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { Journey } from "@/components/site/journey";
import { Doctors } from "@/components/site/doctors";
import { Testimonials } from "@/components/site/testimonials";
import { Appointment } from "@/components/site/appointment";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { ArrowLeft } from "lucide-react";

interface FullSiteProps {
  onBackToWip?: () => void;
}

export function FullSite({ onBackToWip }: FullSiteProps) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink overflow-x-clip">
      {onBackToWip && (
        <div className="bg-teal-deep text-ivory py-2 px-4 text-center text-xs font-semibold z-[60] sticky top-0 flex items-center justify-center gap-3 border-b border-gold/30">
          <span>👀 You are viewing the Full Website Draft.</span>
          <button
            type="button"
            onClick={onBackToWip}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-teal-deep text-xs font-bold hover:bg-gold-light transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Work in Progress View
          </button>
        </div>
      )}
      <Preloader />
      <SmoothScroll />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <WhyUs />
        <Journey />
        <Doctors />
        <Testimonials />
        <Appointment />
        <Faq />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
