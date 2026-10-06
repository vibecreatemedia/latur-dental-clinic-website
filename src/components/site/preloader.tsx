"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Cinematic brand intro — the clinic emblem scales in behind an orbiting
 * gold ring, the wordmark and tagline cascade up, then the curtain lifts.
 * Total ~2.6s so it feels premium without delaying access.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1900);
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
          className="fixed inset-0 z-[100] grid place-items-center bg-teal-deep grain"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: CURTAIN_EASE }}
          aria-hidden
        >
          {/* ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[26rem] w-[26rem] rounded-full bg-teal/40 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center px-6">
            {/* emblem + orbiting ring */}
            <motion.div
              className="relative h-28 w-28 sm:h-32 sm:w-32"
              initial={{ scale: 0.55, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span className="absolute -inset-3 rounded-full border border-gold/25" />
              <motion.span
                className="absolute -inset-3 rounded-full border-t-2 border-gold-light"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.15, ease: "linear" }}
              />
              <span className="absolute inset-0 grid place-items-center rounded-full bg-ivory shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]">
                <Image
                  src="/logo-emblem.png"
                  alt=""
                  width={128}
                  height={128}
                  priority
                  className="h-[86%] w-[86%] object-contain"
                />
              </span>
            </motion.div>

            {/* wordmark */}
            <div className="overflow-hidden mt-7">
              <motion.p
                className="font-display text-3xl sm:text-4xl font-medium text-ivory tracking-tight whitespace-nowrap"
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
              >
                Latur Dental Clinic
              </motion.p>
            </div>
            <motion.p
              className="mt-2.5 text-[10px] uppercase tracking-[0.44em] font-bold text-gold-light"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
            >
              &amp; Orthodontic Centre
            </motion.p>
            <motion.p
              className="mt-5 font-display italic text-ivory/65"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              Bringing Life to Your Smile!
            </motion.p>
          </div>

          {/* progress hairline */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-44 h-px bg-ivory/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.75, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
