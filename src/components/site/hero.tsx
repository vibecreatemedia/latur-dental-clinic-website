"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Phone, ArrowDown, ShieldCheck, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* The preloader curtain lifts at ~1.9s — hero entrances are choreographed
   to cascade just before/while it reveals, for a cinematic hand-off. */
const T = 1.95;

const HEADLINE = ["Smile", "with", "complete"];

function WordReveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-1 -mb-1 align-bottom">
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "110%", rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Rotating brand stamp — circular text orbiting the clinic emblem. */
function LogoStamp() {
  return (
    <motion.div
      className="relative h-32 w-32 sm:h-40 sm:w-40"
      initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay: T + 1.15, ease: EASE }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-ivory/90 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(11,36,31,0.55)] ring-1 ring-ink/5" />
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      >
        <defs>
          <path id="stamp-orbit" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
        </defs>
        <text
          className="fill-teal-deep"
          style={{
            fontSize: "6.3px",
            fontWeight: 800,
            letterSpacing: "1.35px",
            textTransform: "uppercase",
            fontFamily: "var(--font-manrope), sans-serif",
          }}
        >
          <textPath href="#stamp-orbit">
            Latur Dental Clinic · Bringing Life to Your Smile ·
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="relative grid place-items-center h-[56%] w-[56%] rounded-full bg-white shadow-[0_10px_28px_-10px_rgba(11,36,31,0.4)] ring-1 ring-ink/5">
          <Image
            src="/logo-emblem.png"
            alt=""
            width={128}
            height={128}
            className="h-[78%] w-[78%] object-contain"
          />
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden grain">
      {/* ambient blobs */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-teal-mist blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-48 h-[30rem] w-[30rem] rounded-full bg-gold-light/40 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
      </div>

      {/* giant outline word */}
      <motion.span
        aria-hidden
        className="text-stroke-ink pointer-events-none select-none absolute top-24 left-1/2 -translate-x-1/2 font-display text-[22vw] leading-none font-semibold whitespace-nowrap opacity-60"
        style={{ y: imgY }}
      >
        SMILE
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-36 sm:pt-44 pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-8 items-center">
        {/* ---------- copy ---------- */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ivory/70 backdrop-blur px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: T + 0.1, ease: EASE }}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Latur Dental Clinic &amp; Orthodontic Centre
          </motion.p>

          <h1 className="mt-6 font-display font-medium text-ink text-[13vw] sm:text-7xl xl:text-[5.4rem] leading-[1.02] tracking-tight">
            {HEADLINE.map((word, i) => (
              <span key={word}>
                <WordReveal delay={T + 0.2 + i * 0.08}>{word}</WordReveal>{" "}
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden pb-2 -mb-2 align-bottom">
              <motion.em
                className="inline-block italic text-teal"
                initial={{ y: "110%", rotate: 4 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.05, delay: T + 0.47, ease: EASE }}
              >
                confidence.
              </motion.em>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: T + 0.65, ease: EASE }}
          >
            Expert dental care in the heart of Latur — 15+ years of clinical excellence,
            painless treatments and specialist orthodontics that restore function,
            aesthetics and self-belief to every smile.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3.5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: T + 0.8, ease: EASE }}
          >
            <motion.a
              href="#appointment"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-7 h-[52px] font-semibold text-ivory shadow-[0_18px_40px_-12px_rgba(10,53,48,0.65)] hover:bg-teal-deep transition-colors"
            >
              Book a Consultation
              <ArrowDown className="h-4 w-4" aria-hidden />
            </motion.a>
            <motion.a
              href="tel:+919404330627"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory/80 backdrop-blur px-7 h-[52px] font-semibold text-ink hover:border-gold hover:text-gold-deep transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              +91 94043 30627
            </motion.a>
          </motion.div>

          {/* mini trust row */}
          <motion.dl
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: T + 1 }}
          >
            {[
              ["15+", "Years of Excellence"],
              ["10,000+", "Patients Treated"],
              ["4.9★", "Patient Rating"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl sm:text-3xl font-semibold text-teal">{v}</dt>
                <dd className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1 font-semibold">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- visual ---------- */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: T + 0.35, ease: EASE }}
          style={{ y: imgY }}
        >
          <div className="relative arch-mask overflow-hidden aspect-[3/4] shadow-[0_40px_90px_-30px_rgba(11,36,31,0.55)]">
            <Image
              src="/images/hero-clinic.jpg"
              alt="Calm, premium operatory at Latur Dental Clinic with a cream dental chair and teal walls"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/35 via-transparent to-transparent" />
          </div>

          {/* rotating logo stamp */}
          <div className="absolute -left-4 sm:-left-12 -bottom-10 z-20">
            <LogoStamp />
          </div>

          {/* floating rating card */}
          <motion.div
            className="animate-float-soft absolute -right-3 sm:-right-10 top-14 rounded-2xl bg-ivory/95 backdrop-blur px-4 py-3 shadow-[0_20px_50px_-20px_rgba(11,36,31,0.5)] border border-ink/5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: T + 1.1, ease: EASE }}
          >
            <div className="flex items-center gap-1" aria-label="Rated 4.9 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
              ))}
            </div>
            <p className="mt-1.5 text-xs font-semibold text-ink">
              4.9 Patient Rating
              <span className="block text-[10px] font-medium text-muted-foreground">Trusted by our patients</span>
            </p>
          </motion.div>

          {/* floating hygiene card */}
          <motion.div
            className="animate-float-soft-delayed absolute -right-2 sm:-right-8 bottom-32 sm:bottom-40 rounded-2xl bg-teal text-ivory px-4 py-3 shadow-[0_20px_50px_-18px_rgba(10,53,48,0.8)]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: T + 1.25, ease: EASE }}
          >
            <p className="flex items-center gap-2 text-xs font-semibold">
              <ShieldCheck className="h-4 w-4 text-gold-light" aria-hidden />
              Strict Sterilization
              <span className="block text-[10px] font-medium text-ivory/70">Painless · Digital · Safe</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-ink/50 hover:text-teal transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: T + 1.55, duration: 1 }}
        style={{ opacity: fade }}
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
