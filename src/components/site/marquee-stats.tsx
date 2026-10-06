"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Sparkle } from "lucide-react";

const ITEMS = [
  "Dental Implants",
  "Clear Aligners",
  "Braces",
  "Smile Makeover",
  "Root Canal",
  "Teeth Whitening",
  "Kids Dentistry",
  "Emergency Care",
];

/** Infinite marquee strip of treatments. */
export function Marquee() {
  return (
    <div className="relative bg-teal-deep text-ivory py-5 overflow-hidden marquee-paused" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-xl sm:text-2xl italic">{item}</span>
            <Sparkle className="h-4 w-4 text-gold-light shrink-0" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-teal-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-teal-deep to-transparent" />
    </div>
  );
}

function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 42, damping: 16 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent =
          decimals > 0
            ? v.toFixed(decimals)
            : Math.round(v).toLocaleString("en-IN");
      }
    });
    return unsub;
  }, [spring, decimals]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/** Animated stat band. */
export function Stats() {
  const stats = [
    { value: 15, suffix: "+", label: "Years of clinical excellence" },
    { value: 10000, suffix: "+", label: "Patients successfully treated" },
    { value: 4.9, suffix: "", label: "Average patient rating", decimals: 1 },
    { value: 10, suffix: "+", label: "Specialised treatments" },
  ];
  return (
    <section className="relative bg-ivory" aria-label="Clinic statistics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-5xl sm:text-6xl font-semibold text-teal tracking-tight">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </span>
              <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold text-muted-foreground max-w-[180px] mx-auto leading-relaxed">
                {s.label}
              </p>
              {i < stats.length - 1 ? (
                <span className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 h-16 w-px bg-ink/10" aria-hidden />
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
