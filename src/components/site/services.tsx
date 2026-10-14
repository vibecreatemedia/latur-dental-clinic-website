"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading, StaggerGroup, StaggerItem } from "./reveal";
import {
  ToothShieldClipart,
  CosmeticToothClipart,
  OrthodonticsClipart,
  DentalImplantClipart,
  TeethWhiteningClipart,
  PediatricToothClipart,
  BracesClipart,
  ClearAlignersClipart,
  SmileMakeoverClipart,
  EmergencyToothClipart,
} from "./dental-cliparts";

const SERVICES = [
  { icon: ToothShieldClipart, title: "General Dentistry", desc: "Complete preventive care, cleanings and exams that protect teeth and gums for life.", tag: "General Care", popular: true },
  { icon: CosmeticToothClipart, title: "Cosmetic Dentistry", desc: "Artistic smile enhancements, porcelain veneers and aesthetic shaping tailored to you.", tag: "Cosmetic Care", popular: true },
  { icon: OrthodonticsClipart, title: "Orthodontics", desc: "Specialist bite correction, alignment and modern orthodontic care by Dr. Siddharth.", tag: "Specialist Care", popular: true },
  { icon: DentalImplantClipart, title: "Dental Implants", desc: "Permanent, bio-compatible tooth replacements engineered for lifetime strength and chew comfort.", tag: "Restorative", popular: true },
  { icon: TeethWhiteningClipart, title: "Teeth Whitening", desc: "Safe, enamel-friendly clinical brightening that lifts stubborn stains in a single session.", tag: "Brightening", popular: false },
  { icon: PediatricToothClipart, title: "Pediatric Dentistry", desc: "Warm, gentle and anxiety-free visits that build lifelong positive dental habits for children.", tag: "Kids Care", popular: false },
  { icon: BracesClipart, title: "Modern Braces", desc: "Precision ceramic and metal braces that systematically resolve crowding and bite issues.", tag: "Orthodontic", popular: false },
  { icon: ClearAlignersClipart, title: "Clear Aligners", desc: "Nearly invisible, custom 3D aligner series that straighten your teeth seamlessly without brackets.", tag: "Discreet", popular: false },
  { icon: SmileMakeoverClipart, title: "Smile Makeover", desc: "A bespoke aesthetic harmony of veneers, alignment and brightening for your dream smile.", tag: "Smile Design", popular: false },
  { icon: EmergencyToothClipart, title: "Emergency Dentistry", desc: "Same-day urgent relief when dental fractures, sudden toothaches or trauma occur.", tag: "Urgent Care", popular: false },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-teal-deep text-ivory overflow-hidden grain">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-teal/60 blur-3xl pointer-events-none" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Our Dental Services"
          title="Complete care for"
          accent="every kind of smile."
          description="From everyday dentistry to advanced smile transformations — each treatment is designed around your comfort, health and confidence."
        />

        <StaggerGroup className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" amount={0.05}>
          {SERVICES.map((s, i) => (
            <StaggerItem key={s.title} className="h-full">
              <motion.a
                href="#appointment"
                className="group relative flex h-full flex-col rounded-3xl border border-ivory/15 bg-ivory/[0.05] p-6 backdrop-blur-md transition-all duration-500 hover:bg-ivory hover:border-ivory hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)] min-h-[250px]"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                aria-label={`Book a consultation for ${s.title}`}
              >
                {s.popular ? (
                  <span className="absolute top-4 right-4 rounded-full bg-gold/25 text-gold-light text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 transition-colors duration-500 group-hover:bg-teal group-hover:text-ivory">
                    Popular
                  </span>
                ) : null}

                <span className="block pr-16 text-[11px] font-bold tracking-[0.24em] text-ivory/45 uppercase transition-colors duration-500 group-hover:text-ink/45">
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>

                <motion.span
                  className="mt-5 grid place-items-center h-14 w-14 rounded-2xl bg-gold/15 text-gold-light p-2.5 transition-all duration-500 group-hover:bg-teal group-hover:text-gold-light group-hover:scale-105 group-hover:shadow-md"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                >
                  <s.icon className="h-full w-full object-contain" aria-hidden />
                </motion.span>

                <h3 className="mt-5 font-display text-xl font-bold transition-colors duration-500 group-hover:text-ink tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/65 transition-colors duration-500 group-hover:text-ink/75">
                  {s.desc}
                </p>

                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-light opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-teal-deep">
                  Book Consultation <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <motion.p
          className="mt-12 text-center text-sm text-ivory/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Not sure which treatment you need?{" "}
          <a href="#appointment" className="font-semibold text-gold-light underline-offset-4 hover:underline">
            Tell us what&rsquo;s bothering you
          </a>{" "}
          — our team will guide you.
        </motion.p>
      </div>
    </section>
  );
}
