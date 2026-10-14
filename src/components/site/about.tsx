"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Quote } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const POINTS = [
  "Advanced minimally invasive procedures",
  "Comprehensive & personalised treatment plans",
  "Commitment to pain-free, comfortable care",
  "Modern digital dentistry & strict hygiene",
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* visual side */}
        <div className="relative order-2 lg:order-1">
          <Reveal>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_36px_80px_-32px_rgba(11,36,31,0.5)]">
              <Image
                src="/images/hero-clinic.jpg"
                alt="State-of-the-art operatory and dental setup at Latur Dental Clinic"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 rounded-[2rem]" />
            </div>
          </Reveal>

          {/* founder quote card */}
          <motion.div
            className="relative -mt-14 ml-auto mr-2 sm:mr-6 max-w-sm rounded-2xl bg-teal text-ivory p-6 shadow-[0_28px_60px_-24px_rgba(10,53,48,0.75)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Quote className="h-7 w-7 text-gold-light mb-3" aria-hidden />
            <p className="font-display italic text-lg leading-relaxed">
              &ldquo;We build smiles with trust and precision — every patient, every visit.&rdquo;
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] font-semibold text-gold-light">
              Dr. Siddharth Phadkule
              <span className="block normal-case tracking-normal text-ivory/70 font-medium mt-1">
                Founder · Orthodontist
              </span>
            </p>
          </motion.div>

          {/* outline deco */}
          <span aria-hidden className="text-stroke-ink pointer-events-none select-none absolute -top-10 -left-2 font-display text-8xl font-semibold opacity-70">
            15+
          </span>
        </div>

        {/* copy side */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="Advanced dental care,"
            accent="made personal."
            description="Founded over 15 years ago, Latur Dental Clinic & Orthodontic Centre blends modern technology with a deeply compassionate, patient-first philosophy. From routine check-ups to implants, braces and full smile makeovers — everything happens under one roof, at your pace, with complete transparency."
          />

          <ul className="mt-8 space-y-4">
            {POINTS.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.08}>
                <li className="flex items-start gap-3 text-ink/85 font-medium">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#doctors"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 h-12 font-semibold text-ivory transition-all duration-300 hover:bg-teal-deep hover:-translate-y-0.5"
              >
                Meet Dr. Phadkule
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 h-12 font-semibold text-ink transition-colors hover:border-gold hover:text-gold-deep"
              >
                Explore Treatments
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
