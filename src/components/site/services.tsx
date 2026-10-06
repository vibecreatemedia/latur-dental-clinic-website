"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Sparkles,
  Smile,
  Anchor,
  Sun,
  Baby,
  Braces,
  Layers,
  Wand2,
  Siren,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading, StaggerGroup, StaggerItem } from "./reveal";

const SERVICES = [
  { icon: Stethoscope, title: "General Dentistry", desc: "Complete care that keeps your teeth and gums healthy for years to come.", tag: "General Care", popular: true },
  { icon: Sparkles, title: "Cosmetic Dentistry", desc: "Personalised cosmetic treatments designed around your natural appearance.", tag: "Cosmetic Care", popular: true },
  { icon: Smile, title: "Orthodontics", desc: "Modern solutions that improve alignment, function and everyday confidence.", tag: "Specialist Care", popular: true },
  { icon: Anchor, title: "Dental Implants", desc: "Natural-looking tooth replacement built for lasting function and comfort.", tag: "Restorative", popular: true },
  { icon: Sun, title: "Teeth Whitening", desc: "Professional whitening that safely brightens your natural smile.", tag: "Smile Brightening", popular: false },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle, friendly care that helps children grow up loving the dentist.", tag: "Kids Dentistry", popular: false },
  { icon: Braces, title: "Braces", desc: "Reliable orthodontic treatment that gradually perfects your bite.", tag: "Orthodontic", popular: false },
  { icon: Layers, title: "Clear Aligners", desc: "A discreet, comfortable way to straighten teeth with modern aligner tech.", tag: "Invisible", popular: false },
  { icon: Wand2, title: "Smile Makeover", desc: "A curated combination of treatments to create your ideal smile.", tag: "Smile Design", popular: false },
  { icon: Siren, title: "Emergency Dentistry", desc: "Prompt attention when pain, injury or unexpected problems strike.", tag: "Urgent Care", popular: false },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-teal-deep text-ivory overflow-hidden grain">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-teal/60 blur-3xl" />
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
                className="group relative flex h-full flex-col rounded-3xl border border-ivory/10 bg-ivory/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-ivory hover:border-ivory min-h-[230px]"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                aria-label={`Book a consultation for ${s.title}`}
              >
                {s.popular ? (
                  <span className="absolute top-4 right-4 rounded-full bg-gold/20 text-gold-light text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 transition-colors duration-500 group-hover:bg-gold group-hover:text-teal-deep">
                    Popular
                  </span>
                ) : null}

                <span className="block pr-16 text-[11px] font-bold tracking-[0.24em] text-ivory/40 uppercase transition-colors duration-500 group-hover:text-ink/40">
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>

                <motion.span
                  className="mt-5 grid place-items-center h-12 w-12 rounded-2xl bg-gold/15 text-gold-light transition-colors duration-500 group-hover:bg-teal group-hover:text-ivory"
                  whileHover={{ rotate: -8, scale: 1.08 }}
                >
                  <s.icon className="h-6 w-6" aria-hidden />
                </motion.span>

                <h3 className="mt-5 font-display text-xl font-semibold transition-colors duration-500 group-hover:text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60 transition-colors duration-500 group-hover:text-ink/65">
                  {s.desc}
                </p>

                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-light opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-deep">
                  Book <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <motion.p
          className="mt-10 text-center text-sm text-ivory/50"
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
