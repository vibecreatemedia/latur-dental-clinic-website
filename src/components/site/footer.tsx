"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowUp, Star } from "lucide-react";
import { Reveal } from "./reveal";

const QUICK_LINKS = [
  { label: "Our Doctors", href: "#doctors" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Patient Reviews", href: "#testimonials" },
  { label: "Treatment Journey", href: "#journey" },
  { label: "Book Appointment", href: "#appointment" },
];

const SERVICES_LINKS = [
  "General Dentistry",
  "Orthodontics & Aligners",
  "Dental Implants",
  "Cosmetic Dentistry",
  "Pediatric Dentistry",
];

export function Footer() {
  return (
    <footer className="relative mt-auto bg-ink text-ivory overflow-hidden grain">
      {/* CTA banner */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/smile-banner.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top opacity-25"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-teal-deep/85 to-ink" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24 text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
              <Star className="h-3.5 w-3.5 fill-gold-light" aria-hidden />
              Latur Dental Clinic &amp; Orthodontic Centre
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl sm:text-6xl font-medium leading-[1.06] max-w-3xl mx-auto">
              Healthy teeth. Confident smiles.{" "}
              <em className="italic text-gold-light">Specialist care.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl mx-auto text-ivory/70 text-sm sm:text-base leading-relaxed">
              Whether you&rsquo;re considering braces, aligners, or simply want the best for your
              family&rsquo;s oral health — we&rsquo;re here to help you decide with clarity.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <motion.a
                href="#appointment"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-gold px-8 h-[52px] inline-flex items-center font-bold text-teal-deep shadow-[0_18px_40px_-12px_rgba(196,151,92,0.5)]"
              >
                Book Your Consultation
              </motion.a>
              <motion.a
                href="tel:+919404330627"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-ivory/30 px-8 h-[52px] inline-flex items-center gap-2 font-semibold text-ivory hover:bg-ivory hover:text-ink transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call Now
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* main footer */}
      <div className="relative border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="relative grid place-items-center h-14 w-14 rounded-full bg-ivory ring-1 ring-ivory/25 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] shrink-0">
                <Image
                  src="/logo-emblem.png"
                  alt="Latur Dental Clinic logo"
                  width={112}
                  height={112}
                  className="h-[46px] w-[46px] object-contain"
                />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold leading-none">Latur Dental Clinic</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] font-bold text-gold-light">
                  &amp; Orthodontic Centre
                </p>
              </div>
            </div>
            <p className="mt-5 font-display italic text-lg text-gold-light/90">
              &ldquo;Bringing Life to Your Smile!&rdquo;
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/60 max-w-xs">
              Advanced dental care focused on comfort, precision and confident smiles —
              personalised treatment for every stage of your dental journey.
            </p>
            <div className="mt-6 flex items-center gap-1.5" aria-label="Rated 4.9 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden />
              ))}
              <span className="ml-2 text-xs font-semibold text-ivory/70">4.9 · 480+ reviews</span>
            </div>
          </div>

          <nav aria-label="Quick links">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-light">Quick Links</p>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-ivory/65 hover:text-gold-light transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-light">Treatments</p>
            <ul className="mt-5 space-y-3">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-ivory/65 hover:text-gold-light transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-light">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-ivory/65">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a
                  href="https://share.google/R0Olm87BlAmso3am0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors"
                >
                  Lokhand Galli, Ganj Golai, Latur, Maharashtra
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href="tel:+919404330627" className="hover:text-gold-light transition-colors">
                  +91 94043 30627
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href="mailto:info@laturdentalclinic.com" className="hover:text-gold-light transition-colors">
                  info@laturdentalclinic.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                Mon – Sat · 10 AM – 8 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/45">
            <p>© {new Date().getFullYear()} Latur Dental Clinic &amp; Orthodontic Centre. All rights reserved.</p>
            <p className="font-medium">Specialist Orthodontic &amp; Comprehensive Dental Care in Latur</p>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 font-semibold text-ivory/60 hover:text-gold-light transition-colors"
              aria-label="Back to top"
            >
              Back to Top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
