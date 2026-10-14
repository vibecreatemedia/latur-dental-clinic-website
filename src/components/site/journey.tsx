"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "./reveal";
import {
  ConsultationClipart,
  ExaminationClipart,
  PlanningClipart,
  TreatmentCareClipart,
  FollowUpClipart,
} from "./dental-cliparts";

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    icon: ConsultationClipart,
    step: "01",
    title: "Personal Consultation",
    tag: "Listen & Understand",
    desc: "A warm, pressure-free dialogue where we listen to your concerns, dental history, and smile aspirations with empathy and complete transparency.",
    image: "/images/about-care.jpg",
    alt: "Warm, personalized dentist consultation at Latur Dental Clinic",
    caption: "One-on-one consultation with Dr. Phadkule",
  },
  {
    icon: ExaminationClipart,
    step: "02",
    title: "Precision Examination & 3D Scans",
    tag: "Modern Diagnostics",
    desc: "Detailed clinical exam and intraoral 3D digital scanning with low-dose radiation, allowing us to accurately diagnose root causes without guesswork.",
    image: "/images/journey-examination.jpg",
    alt: "High-precision digital 3D intraoral scanner during patient examination",
    caption: "Comfortable digital intraoral 3D scanning",
  },
  {
    icon: PlanningClipart,
    step: "03",
    title: "Transparent Treatment Roadmap",
    tag: "Clear Options & Costs",
    desc: "We review simulation models, discuss alternative treatment options, establish honest timelines, and present all fee structures upfront.",
    image: "/images/journey-planning.jpg",
    alt: "Digital 3D teeth simulation model and aligner planning on tablet",
    caption: "3D smile simulation & transparent quote",
  },
  {
    icon: TreatmentCareClipart,
    step: "04",
    title: "Gentle, Pain-Free Treatment",
    tag: "Utmost Comfort & Hygiene",
    desc: "Experience pain-managed, minimally invasive clinical procedures in our sterile operatory, accompanied by attentive patient care at every step.",
    image: "/images/hero-clinic.jpg",
    alt: "Ultra-modern, calm, and sanitized dental operatory suite",
    caption: "Painless procedures in a calming ambiance",
  },
  {
    icon: FollowUpClipart,
    step: "05",
    title: "Review & Lasting Smile Health",
    tag: "Smile For Life",
    desc: "Post-care reviews, maintenance instructions, and scheduled preventive check-ups ensure your restored smile stays healthy and radiant for years.",
    image: "/images/smile-banner.jpg",
    alt: "Joyful, confident patient with radiant, healthy smile after treatment",
    caption: "Lifelong oral health & confident smile",
  },
];

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="relative py-24 sm:py-32 bg-ivory-deep/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Your Treatment Journey"
          title="Total transparency,"
          accent="step by step."
          description="Exactly what to expect from your first visit through to your final confident smile — gentle care, modern technology, and no surprises."
        />

        <div ref={trackRef} className="relative mt-20 max-w-4xl mx-auto" role="list">
          {/* Static track line */}
          <span
            aria-hidden
            className="absolute left-[26px] sm:left-1/2 sm:-translate-x-px top-6 bottom-8 w-[3px] rounded-full bg-ink/10"
          />

          {/* Smooth animated spring progress line */}
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute left-[26px] sm:left-1/2 sm:-translate-x-px top-6 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-teal via-gold to-gold-deep origin-top shadow-[0_0_14px_rgba(196,151,92,0.65)]"
          />

          {STEPS.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={s.step}
                role="listitem"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_SMOOTH }}
                className={`relative flex items-start gap-6 sm:gap-0 pb-16 last:pb-4 ${
                  left ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Central Clipart Node */}
                <motion.div
                  aria-hidden
                  whileHover={{ scale: 1.12, rotate: left ? 4 : -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="relative z-10 grid place-items-center h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-2xl bg-teal text-gold-light shadow-[0_16px_32px_-10px_rgba(10,53,48,0.7)] ring-4 ring-ivory-deep sm:absolute sm:left-1/2 sm:-translate-x-1/2 p-3 transition-colors hover:bg-teal-deep cursor-pointer"
                >
                  <s.icon className="h-full w-full object-contain" />
                  <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-teal-deep shadow-md">
                    {s.step}
                  </span>
                </motion.div>

                {/* Card Container */}
                <div className={`w-full sm:w-1/2 ${left ? "sm:pr-14" : "sm:pl-14"}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group rounded-3xl border border-ink/8 bg-card p-6 shadow-sm transition-all duration-500 hover:border-gold/50 hover:shadow-[0_26px_50px_-20px_rgba(11,36,31,0.22)] overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-gold-deep uppercase">
                        {s.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-ink/30">
                        Step {s.step}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-bold text-ink tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>

                    {/* High-res Clinical Photo Preview */}
                    <div className="mt-4 relative h-44 w-full rounded-2xl overflow-hidden shadow-inner border border-ink/5 bg-ink/5">
                      <Image
                        src={s.image}
                        alt={s.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 420px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/50 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-ivory/90 bg-teal-deep/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        {s.caption}
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="hidden sm:block sm:w-1/2" aria-hidden />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
