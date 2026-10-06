"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MessageCircle, Search, ClipboardList, HeartPulse, ShieldCheck } from "lucide-react";
import { SectionHeading, Reveal } from "./reveal";

const STEPS = [
  { icon: MessageCircle, title: "Consultation", desc: "Tell us your concerns and what you would like to improve." },
  { icon: Search, title: "Examination", desc: "A detailed clinical exam with any required X-rays or scans." },
  { icon: ClipboardList, title: "Planning", desc: "We discuss diagnosis, options, limitations and costs openly." },
  { icon: HeartPulse, title: "Treatment", desc: "Your care begins on the agreed plan, with gentle monitoring." },
  { icon: ShieldCheck, title: "Follow-Up", desc: "Regular reviews and preventive care keep your smile healthy." },
];

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.72", "end 0.62"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="journey" className="relative py-24 sm:py-32 bg-ivory-deep/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Your Treatment Journey"
          title="Total transparency,"
          accent="step by step."
          description="Exactly what happens when you visit our clinic — no guesswork, no surprises."
        />

        <div ref={trackRef} className="relative mt-16 max-w-3xl mx-auto" role="list">
          {/* static track */}
          <span aria-hidden className="absolute left-[27px] sm:left-1/2 sm:-translate-x-px top-2 bottom-2 w-[3px] rounded-full bg-ink/10" />
          {/* animated progress */}
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute left-[27px] sm:left-1/2 sm:-translate-x-px top-2 bottom-2 w-[3px] rounded-full bg-gold origin-top shadow-[0_0_14px_rgba(196,151,92,0.55)]"
          />

          {STEPS.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={s.title} delay={0.05 * i} y={44}>
                <div
                  role="listitem"
                  className={`relative flex items-start gap-6 sm:gap-0 pb-12 last:pb-0 ${
                    left ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <span
                    aria-hidden
                    className="relative z-10 grid place-items-center h-14 w-14 shrink-0 rounded-full bg-teal text-ivory shadow-[0_14px_30px_-10px_rgba(10,53,48,0.7)] ring-4 ring-ivory-deep sm:absolute sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <s.icon className="h-6 w-6" />
                    <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-teal-deep">
                      {i + 1}
                    </span>
                  </span>

                  {/* card */}
                  <div className={`sm:w-1/2 ${left ? "sm:pr-14 sm:text-right" : "sm:pl-14"}`}>
                    <div className="group rounded-3xl border border-ink/8 bg-card p-6 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_22px_46px_-22px_rgba(11,36,31,0.35)]">
                      <h3 className="font-display text-xl font-semibold text-ink inline-flex items-center gap-2">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" aria-hidden />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
