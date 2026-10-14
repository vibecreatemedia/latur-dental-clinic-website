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

export function FullSite() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink overflow-x-clip">

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
