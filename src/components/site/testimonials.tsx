"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./reveal";

const TESTIMONIALS = [
  {
    quote:
      "I was terrified of root canals, but Dr. Jyoti made it completely painless. The team explained every step and the cost upfront. Honestly the calmest dental visit of my life.",
    name: "Rohini Deshmukh",
    place: "Latur",
    treatment: "Root Canal Therapy",
  },
  {
    quote:
      "Two years of braces with Dr. Siddharth and the results are beyond what I imagined. Regular follow-ups, honest timelines, and my smile now speaks for itself.",
    name: "Amit Kulkarni",
    place: "Nilanga",
    treatment: "Braces Treatment",
  },
  {
    quote:
      "We took our 7-year-old for her first filling. The doctor was so patient and gentle that she now reminds US when it's time for a check-up. Wonderful with kids.",
    name: "Sneha & Prasad Patil",
    place: "Latur",
    treatment: "Pediatric Dentistry",
  },
  {
    quote:
      "Got my implant done after losing a molar. It looks and feels exactly like a natural tooth. Digital scans, zero guesswork, and immaculate hygiene standards.",
    name: "Mohammed Irfan",
    place: "Ausa",
    treatment: "Dental Implant",
  },
  {
    quote:
      "The clear aligner journey was seamless — virtual planning, discreet trays, and support over WhatsApp whenever I had a question. Worth every rupee.",
    name: "Pooja Rathi",
    place: "Latur",
    treatment: "Clear Aligners",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(index + 1, 1), 5200);
    return () => clearInterval(t);
  }, [index, paused, go]);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-teal-deep text-ivory overflow-hidden grain">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Patient Stories"
          title="Smiles that"
          accent="speak for us."
        />

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 h-14 w-14 text-gold/30" aria-hidden />

          <div className="relative min-h-[300px] sm:min-h-[260px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: 60 * dir, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -60 * dir, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center px-2 sm:px-10"
              >
                <div className="flex justify-center gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-xl sm:text-2xl italic leading-relaxed text-ivory/95">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7">
                  <p className="font-semibold tracking-wide">{t.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-light font-semibold">
                    {t.treatment} · {t.place}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(index - 1, -1)}
              className="grid place-items-center h-11 w-11 rounded-full border border-ivory/20 text-ivory/80 transition-all hover:bg-ivory hover:text-teal-deep"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2.5" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-gold" : "w-2 bg-ivory/30 hover:bg-ivory/60"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1, 1)}
              className="grid place-items-center h-11 w-11 rounded-full border border-ivory/20 text-ivory/80 transition-all hover:bg-ivory hover:text-teal-deep"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
