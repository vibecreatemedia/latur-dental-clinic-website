"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { SectionHeading, Reveal } from "./reveal";

const DOCTORS = [
  {
    name: "Dr. Siddharth Phadkule",
    role: "Orthodontist & Aligners Specialist",
    creds: "BDS, MDS (Orthodontics) · Mini Residency — South Korea",
    years: "15+",
    image: "/images/doctor-siddharth.jpg",
    alt: "Dr. Siddharth Phadkule, orthodontist at Latur Dental Clinic",
    skills: ["Invisible Aligners", "Traditional Braces", "Orthodontic Surgery"],
    blurb:
      "Leading orthodontist with 15+ years of clinical excellence and 10,000+ patients treated. Specialises in invisible aligners and advanced orthodontic treatment.",
  },
  {
    name: "Dr. Jyoti Phadkule",
    role: "Cosmetic Dentist & Root Canal Specialist",
    creds: "BDS · Cosmetic Dentistry · Root Canal Specialist",
    years: "12+",
    image: "/images/doctor-jyoti.jpg",
    alt: "Dr. Jyoti Phadkule, cosmetic dentist at Latur Dental Clinic",
    skills: ["Smile Makeovers", "Root Canal Therapy", "Cosmetic Restorations"],
    blurb:
      "Expert cosmetic dentist dedicated to painless procedures and aesthetic dentistry with natural-looking, long-lasting results.",
  },
];

export function Doctors() {
  return (
    <section id="doctors" className="relative py-24 sm:py-32 bg-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Meet Our Doctors"
          title="Specialists behind"
          accent="your smile."
          description="Experienced dental professionals dedicated to thoughtful, personalised care — helping every patient feel confident in their smile."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {DOCTORS.map((d, idx) => (
            <Reveal key={d.name} delay={idx * 0.12}>
              <motion.article
                className="group relative rounded-[2rem] bg-card border border-ink/8 overflow-hidden transition-shadow duration-500 hover:shadow-[0_36px_80px_-30px_rgba(11,36,31,0.45)]"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 40vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/85 via-teal-deep/10 to-transparent" />
                  <span className="absolute top-4 right-4 rounded-full bg-ivory/90 backdrop-blur px-3.5 py-1.5 text-xs font-bold text-teal-deep">
                    {d.years} Years
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-6 text-ivory">
                    <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-gold-light">{d.role}</p>
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-ivory/75 leading-relaxed">
                      <GraduationCap className="h-4 w-4 shrink-0 mt-px" aria-hidden />
                      {d.creds}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{d.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${d.name} specialities`}>
                    {d.skills.map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-full bg-teal-mist px-3 py-1.5 text-xs font-semibold text-teal"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#appointment"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-gold-deep underline-offset-4 hover:underline"
                  >
                    Book with {d.name.split(" ")[1]}
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
