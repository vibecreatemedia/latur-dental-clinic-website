"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Clock, Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Doctors", href: "#doctors" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Latur Dental Clinic home">
      <span
        className={`relative grid place-items-center h-12 w-12 rounded-full overflow-hidden shrink-0 ring-1 transition-all duration-500 group-hover:scale-[1.06] group-hover:-rotate-3 ${
          light
            ? "bg-ivory ring-ivory/30 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55)]"
            : "bg-white ring-ink/10 shadow-[0_8px_22px_-10px_rgba(11,36,31,0.45)]"
        }`}
      >
        <Image
          src="/logo-emblem.png"
          alt=""
          width={96}
          height={96}
          priority
          aria-hidden
          className="h-[42px] w-[42px] object-contain transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/60 pointer-events-none" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-semibold tracking-tight ${light ? "text-ivory" : "text-ink"}`}>
          Latur Dental
        </span>
        <span className={`block text-[10px] uppercase tracking-[0.3em] font-semibold ${light ? "text-gold-light" : "text-gold-deep"}`}>
          Clinic &amp; Orthodontic Centre
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  function resolveHref(href: string) {
    if (href.startsWith("#")) {
      return isHome ? href : `/${href}`;
    }
    return href;
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // hide when scrolling down past hero, reveal when scrolling up
    if (y > 480 && y > prev) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* fixed stack: utility bar + main nav */}
      <motion.div
        className="fixed top-0 inset-x-0 z-50"
        initial={{ y: -110, opacity: 0 }}
        animate={{ y: hidden ? -40 : 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* utility bar */}
        <div className="bg-teal-deep text-ivory/90">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-10 hidden sm:flex items-center justify-between text-xs font-medium">
            <p className="flex items-center gap-2 tracking-wide">
              <Clock className="h-3.5 w-3.5 text-gold-light" aria-hidden />
              Mon – Sat · 10 AM – 8 PM
            </p>
            <div className="flex items-center gap-6">
              <span className="text-ivory/70">Lokhand Galli, Ganj Golai, Latur</span>
              <a href="tel:+919404330627" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
                <Phone className="h-3.5 w-3.5 text-gold-light" aria-hidden />
                +91 94043 30627
              </a>
            </div>
          </div>
        </div>

        {/* main nav */}
        <header>
          <div
            className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500 ${
              scrolled ? "pt-2 pb-2" : "pt-3 pb-3"
            }`}
          >
            <div
              className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 h-16 transition-all duration-500 ${
                scrolled
                  ? "bg-ivory/85 backdrop-blur-xl shadow-[0_12px_40px_-16px_rgba(11,36,31,0.35)] border border-ink/8"
                  : "bg-transparent"
              }`}
            >
              <Logo />

              <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={resolveHref(l.href)}
                    className="relative text-[13px] font-semibold tracking-wide text-ink/75 hover:text-ink transition-colors group"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2.5">
                <Link
                  href={resolveHref("#appointment")}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-teal px-5 h-10 text-[13px] font-semibold text-ivory shadow-[0_10px_30px_-10px_rgba(10,53,48,0.7)] transition-all duration-300 hover:bg-teal-deep hover:shadow-[0_16px_36px_-10px_rgba(10,53,48,0.8)] hover:-translate-y-0.5"
                >
                  Book Appointment
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <button
                  onClick={() => setOpen(true)}
                  className="lg:hidden grid place-items-center h-10 w-10 rounded-full bg-teal text-ivory"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </motion.div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-teal-deep text-ivory flex flex-col"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 h-20">
              <Logo light />
              <button
                onClick={() => setOpen(false)}
                className="grid place-items-center h-11 w-11 rounded-full bg-ivory/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-8 pt-8" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={resolveHref(l.href)}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl py-2.5 border-b border-ivory/10 flex items-center justify-between"
                  >
                    {l.label}
                    <span className="text-gold-light/50 text-sm font-sans font-semibold">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-auto p-8 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                href={resolveHref("#appointment")}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 h-12 font-semibold text-teal-deep"
              >
                Book Appointment <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href="tel:+919404330627" className="text-center text-ivory/80 text-sm">
                +91 94043 30627 · Mon – Sat, 10 AM – 8 PM
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
