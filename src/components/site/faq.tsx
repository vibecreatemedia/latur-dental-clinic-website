"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading, Reveal } from "./reveal";

const FAQS = [
  {
    q: "When should I visit an orthodontist?",
    a: "An orthodontic consultation is helpful if you have crowded or irregular teeth, gaps, protruding front teeth, or concerns about how your upper and lower teeth meet. Children benefit most from an evaluation around age 7, while their teeth and jaws are still developing — but adults can start treatment at any age.",
  },
  {
    q: "Are braces only for children?",
    a: "Not at all. While childhood and adolescence are ideal windows for guiding jaw growth, teeth can be safely moved at any age. A growing share of our orthodontic patients are adults choosing between ceramic braces and nearly invisible clear aligners.",
  },
  {
    q: "Are clear aligners suitable for everyone?",
    a: "Clear aligners handle most mild-to-moderate alignment issues very effectively. Complex bite corrections may still need fixed braces or a combined plan. After a digital scan and examination, we will honestly tell you which option fits your case best.",
  },
  {
    q: "How long does orthodontic treatment take?",
    a: "Most braces and aligner treatments complete in 12 to 24 months. Minor corrections can finish sooner; complex cases may take a little longer. Your exact timeline is shared transparently at the planning stage, along with what helps you avoid delays.",
  },
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Walk-ins are welcome, but booked appointments keep waiting time near zero and let us reserve the right amount of chair time for you. For emergencies — severe pain, swelling or a knocked-out tooth — call us any day and we will fit you in immediately.",
  },
  {
    q: "Will the treatment be painful?",
    a: "Modern dentistry should not hurt. We use gentle, minimally invasive techniques and effective anaesthesia where needed. You may feel mild soreness for a day or two after adjustments — completely normal and easy to manage.",
  },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-3xl border transition-all duration-500 ${
        open ? "border-gold/50 bg-card shadow-[0_22px_46px_-22px_rgba(11,36,31,0.3)]" : "border-ink/8 bg-card hover:border-gold/30"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-semibold text-ink">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`grid place-items-center h-9 w-9 shrink-0 rounded-full transition-colors ${
            open ? "bg-gold text-teal-deep" : "bg-teal-mist text-teal"
          }`}
        >
          <Plus className="h-5 w-5" aria-hidden />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-ivory overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ's"
          title="Frequently asked"
          accent="questions."
          description="Answers to the questions patients ask most about treatments, aligners and preventive care."
        />

        <div className="mt-14 flex flex-col gap-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <Item
                q={f.q}
                a={f.a}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Still have a question?{" "}
            <a href="tel:+919404330627" className="font-bold text-teal underline-offset-4 hover:underline">
              Call +91 94043 30627
            </a>{" "}
            — we&rsquo;re happy to help.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
