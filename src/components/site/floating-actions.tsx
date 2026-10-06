"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";

/** Floating WhatsApp + call actions — appear after the hero, spring in. */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 420);
  });

  return (
    <motion.div
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col gap-3"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* WhatsApp with pulse */}
      <motion.a
        href="https://wa.me/919404330627?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Latur%20Dental%20Clinic."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Latur Dental Clinic on WhatsApp"
        className="relative grid place-items-center h-14 w-14 rounded-full bg-[#1fA85a] text-white shadow-[0_16px_36px_-10px_rgba(31,168,90,0.65)]"
        whileHover={{ scale: 1.12, rotate: -6 }}
        whileTap={{ scale: 0.94 }}
      >
        <span aria-hidden className="animate-ring-pulse absolute inset-0 rounded-full bg-[#1fA85a]" />
        <MessageCircle className="relative h-6 w-6" />
        <span className="relative sr-only">WhatsApp</span>
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:+919404330627"
        aria-label="Call Latur Dental Clinic at +91 94043 30627"
        className="grid place-items-center h-14 w-14 rounded-full bg-teal text-ivory shadow-[0_16px_36px_-10px_rgba(10,53,48,0.7)]"
        whileHover={{ scale: 1.12, rotate: 6 }}
        whileTap={{ scale: 0.94 }}
      >
        <Phone className="h-6 w-6" />
      </motion.a>
    </motion.div>
  );
}
