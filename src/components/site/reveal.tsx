"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-up-on-scroll wrapper with a soft blur-in finish. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container + item pair for lists/grids. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export function StaggerGroup({
  children,
  className,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Eyebrow + display heading used at the top of each section. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignCls} gap-4 max-w-2xl`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-gold-light" : "text-gold-deep"
          }`}
        >
          <span className={`h-px w-8 ${dark ? "bg-gold-light/60" : "bg-gold-deep/50"}`} />
          {eyebrow}
          <span className={`h-px w-8 ${dark ? "bg-gold-light/60" : "bg-gold-deep/50"}`} />
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display text-4xl sm:text-5xl leading-[1.08] font-medium ${
            dark ? "text-ivory" : "text-ink"
          }`}
        >
          {title}{" "}
          {accent ? (
            <em className={`${dark ? "text-gold-light" : "text-teal"} not-italic font-display italic`}>
              {accent}
            </em>
          ) : null}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className={`text-base sm:text-lg leading-relaxed ${dark ? "text-ivory/70" : "text-muted-foreground"}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
