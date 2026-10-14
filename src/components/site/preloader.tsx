"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;
const CURTAIN_EASE = [0.85, 0, 0.15, 1] as const;

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-teal-deep grain overflow-hidden"
          exit={{ y: "-100%", opacity: 0.95 }}
          transition={{ duration: 0.85, ease: CURTAIN_EASE }}
          aria-hidden
        >
          {/* ambient pulsing glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-teal/50 blur-[90px]"
              animate={{
                scale: [0.85, 1.15, 0.95],
                opacity: [0.35, 0.65, 0.45],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[18rem] w-[18rem] rounded-full bg-gold/20 blur-[60px]"
              animate={{
                scale: [1.1, 0.9, 1.05],
                opacity: [0.2, 0.5, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="relative flex flex-col items-center px-6">
            {/* Emblem container with smooth animated rings & shimmer */}
            <motion.div
              className="relative h-32 w-32 sm:h-36 sm:w-36 flex items-center justify-center"
              initial={{ scale: 0.4, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE_SMOOTH }}
            >
              {/* Outer pulsing gold halo */}
              <motion.span
                className="absolute -inset-4 rounded-full border border-gold/30"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Orbiting accent ring */}
              <motion.span
                className="absolute -inset-3 rounded-full border-t-2 border-r-2 border-gold-light/90"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "linear",
                }}
              />

              {/* Counter-orbiting secondary faint ring */}
              <motion.span
                className="absolute -inset-1.5 rounded-full border-b border-l border-ivory/20"
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 3.8,
                  ease: "linear",
                }}
              />

              {/* Emblem badge with smooth floating bounce */}
              <motion.div
                className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-ivory shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] p-2 grid place-items-center overflow-hidden ring-4 ring-gold/20"
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Shimmer light sweep sheen across logo */}
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                  animate={{
                    translateX: ["-100%", "200%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    duration: 1.4,
                    ease: "easeInOut",
                  }}
                />

                <Image
                  src="/logo-emblem.png"
                  alt="Latur Dental Clinic Emblem"
                  width={140}
                  height={140}
                  priority
                  className="h-[88%] w-[88%] object-contain drop-shadow-md select-none pointer-events-none"
                />
              </motion.div>
            </motion.div>

            {/* Wordmark typography */}
            <div className="overflow-hidden mt-8 text-center">
              <motion.h1
                className="font-display text-3xl sm:text-4xl font-bold text-ivory tracking-tight"
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.35, ease: EASE_SMOOTH }}
              >
                Latur Dental Clinic
              </motion.h1>
            </div>

            <motion.p
              className="mt-2.5 text-[11px] sm:text-xs uppercase tracking-[0.38em] font-bold text-gold-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_SMOOTH }}
            >
              &amp; Orthodontic Centre
            </motion.p>

            <motion.p
              className="mt-4 font-sans text-xs tracking-wider uppercase font-semibold text-ivory/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              Bringing Life to Your Smile
            </motion.p>
          </div>

          {/* Smooth progress bar at the bottom */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-48 h-1 bg-ivory/15 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
