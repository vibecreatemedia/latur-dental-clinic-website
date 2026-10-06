"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, CalendarCheck, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { SectionHeading, Reveal } from "./reveal";

const SERVICES_SHORT = [
  "General Check-up",
  "Braces",
  "Clear Aligners",
  "Dental Implants",
  "Root Canal",
  "Cosmetic / Smile Makeover",
  "Kids Dentistry",
  "Emergency",
];

export function Appointment() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("success");
      setFeedback(data.message || "Appointment request received!");
      form.reset();
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="appointment" className="relative py-24 sm:py-32 bg-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Book An Appointment"
          title="Plan your visit to"
          accent="a healthier smile."
          description="Share your details and preferred date — our team will call you back to confirm your appointment."
        />

        <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          {/* contact info */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                lines: ["Lokhand Galli, Ganj Golai", "Latur, Maharashtra"],
                href: "https://www.google.com/maps/search/?api=1&query=Latur+Dental+Clinic+Ganj+Golai+Latur",
                cta: "Get Directions",
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["+91 94043 30627", "Available for emergencies"],
                href: "tel:+919404330627",
                cta: "Call Now",
              },
              {
                icon: Clock,
                title: "Working Hours",
                lines: ["Mon – Sat", "10 AM – 8 PM"],
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group flex items-start gap-4 rounded-3xl border border-ink/8 bg-card p-6 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_44px_-20px_rgba(11,36,31,0.3)]">
                  <span className="grid place-items-center h-12 w-12 shrink-0 rounded-2xl bg-teal text-ivory transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <c.icon className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-ink">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="mt-0.5 text-sm text-muted-foreground">
                        {l}
                      </p>
                    ))}
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.16em] text-gold-deep underline-offset-4 hover:underline"
                      >
                        {c.cta}
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <a
                href="https://wa.me/919404330627?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Latur%20Dental%20Clinic."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-3xl bg-[#1fA85a] p-5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-18px_rgba(31,168,90,0.6)]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                WhatsApp the Clinic
              </a>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.15}>
            <div className="relative rounded-[2rem] bg-teal-deep text-ivory p-7 sm:p-10 overflow-hidden grain">
              <div aria-hidden className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
              {/* emblem watermark */}
              <div aria-hidden className="absolute -bottom-14 -right-10 h-56 w-56 rounded-full bg-[url('/logo-emblem.png')] bg-contain bg-no-repeat bg-center opacity-[0.08] pointer-events-none" />
              <div className="relative">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold">Appointment Request</h3>
                <p className="mt-2 text-sm text-ivory/65">
                  Comfortable care · Modern dentistry · Trusted expertise
                </p>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-8 rounded-2xl bg-ivory/10 border border-gold/40 p-8 text-center"
                      role="status"
                    >
                      <CheckCircle2 className="mx-auto h-12 w-12 text-gold-light" aria-hidden />
                      <p className="mt-4 font-display text-xl">Request received!</p>
                      <p className="mt-2 text-sm text-ivory/70">{feedback}</p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 rounded-full border border-ivory/25 px-6 h-10 text-sm font-semibold hover:bg-ivory hover:text-teal-deep transition-colors"
                      >
                        Book another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      className="mt-8 grid sm:grid-cols-2 gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <label className="flex flex-col gap-1.5 sm:col-span-1">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">Your Name *</span>
                        <input
                          required
                          name="name"
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          className="h-12 rounded-xl bg-ivory/10 border border-ivory/15 px-4 text-sm placeholder:text-ivory/35 focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 sm:col-span-1">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">Mobile Number *</span>
                        <input
                          required
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="+91 98765 43210"
                          className="h-12 rounded-xl bg-ivory/10 border border-ivory/15 px-4 text-sm placeholder:text-ivory/35 focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 sm:col-span-1">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">Email Address</span>
                        <input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="h-12 rounded-xl bg-ivory/10 border border-ivory/15 px-4 text-sm placeholder:text-ivory/35 focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 sm:col-span-1">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">Preferred Date *</span>
                        <input
                          required
                          name="date"
                          type="date"
                          min={minDate}
                          className="h-12 rounded-xl bg-ivory/10 border border-ivory/15 px-4 text-sm text-ivory [color-scheme:dark] focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">Treatment Interest</span>
                        <select
                          name="service"
                          defaultValue=""
                          className="h-12 rounded-xl bg-ivory/10 border border-ivory/15 px-4 text-sm focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors [&>option]:text-ink"
                        >
                          <option value="">Select a treatment (optional)</option>
                          {SERVICES_SHORT.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ivory/60">Additional Message</span>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder="Tell us briefly about your concern…"
                          className="rounded-xl bg-ivory/10 border border-ivory/15 px-4 py-3 text-sm placeholder:text-ivory/35 focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors resize-none"
                        />
                      </label>

                      {status === "error" ? (
                        <p className="sm:col-span-2 rounded-xl bg-red-500/15 border border-red-400/30 px-4 py-3 text-sm text-red-200" role="alert">
                          {feedback}
                        </p>
                      ) : null}

                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="sm:col-span-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-gold h-[54px] font-bold text-teal-deep transition-colors hover:bg-gold-light disabled:opacity-60"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          <>
                            <CalendarCheck className="h-5 w-5" aria-hidden />
                            Book Appointment
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
