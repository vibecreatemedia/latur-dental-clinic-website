"use client";

import { useState, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
  Star,
  Loader2,
  ChevronDown,
  ArrowRight,
  Activity,
  Smile,
  Eye,
  Check,
  AlertTriangle,
  Wrench,
  RefreshCw,
} from "lucide-react";

interface WorkInProgressProps {
  onPreviewFullSite?: () => void;
}

const HIGHLIGHT_SERVICES = [
  {
    title: "Braces & Invisible Aligners",
    desc: "MDS Orthodontist certified teeth alignment for teens & adults. Discreet, modern & precise.",
    badge: "Specialty",
    icon: Sparkles,
  },
  {
    title: "Painless Single-Sitting RCT",
    desc: "Advanced rotary endodontics for pain-free, fast tooth restoration in a single visit.",
    badge: "Painless",
    icon: Activity,
  },
  {
    title: "Dental Implants & Fixed Teeth",
    desc: "Permanent, natural-looking tooth replacement built on international standard implant systems.",
    badge: "Permanent",
    icon: ShieldCheck,
  },
  {
    title: "Cosmetic Smile Design",
    desc: "Veneers, teeth whitening, smile contouring and gap closures to bring out your best smile.",
    badge: "Aesthetics",
    icon: Smile,
  },
];

const DOCTORS = [
  {
    name: "Dr. Siddharth Phadkule",
    qual: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
    role: "Chief Orthodontist & Aligners Specialist",
    image: "/images/doctor-siddharth.jpg",
    exp: "15+ Years Clinical Practice",
    focus: "Specialist in braces, clear aligners, complex bite corrections & smile transformations.",
  },
  {
    name: "Dr. Jyoti Phadkule",
    qual: "BDS",
    role: "Aesthetic & Restorative Dental Surgeon",
    image: "/images/doctor-jyoti.jpg",
    exp: "12+ Years Clinical Practice",
    focus: "Expertise in painless root canals, cosmetic smile makeovers, tooth preservation & family dentistry.",
  },
];

const FAQS = [
  {
    q: "Why is the website under maintenance?",
    a: "We are currently performing scheduled maintenance to upgrade our digital appointment portal, doctor schedules, and patient consultation experience. The physical clinic is operating normally.",
  },
  {
    q: "Can I still visit the clinic during website maintenance?",
    a: "Yes! Our physical clinic at Lokhand Galli, Ganj Golai, Latur is 100% open. Patient consultations, routine dental work, orthodontic adjustments, and dental emergencies are running without interruption.",
  },
  {
    q: "What are your clinic operating hours?",
    a: "We are open Monday to Saturday from 10:00 AM to 8:00 PM. Emergency dental visits can be accommodated with prior phone confirmation.",
  },
  {
    q: "How do I book an appointment right now?",
    a: "You can use the priority appointment request form on this page, call us directly at +91 94043 30627, or message us on WhatsApp. Our desk confirms bookings promptly.",
  },
  {
    q: "Do you provide braces & clear aligners in Latur?",
    a: "Yes! Dr. Siddharth Phadkule is an MDS Orthodontist with over 15 years of specialized experience in clear aligners, ceramic braces, and smile aesthetics.",
  },
];

export function WorkInProgress({ onPreviewFullSite }: WorkInProgressProps) {
  const [minDate, setMinDate] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);

    function checkOpenStatus() {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hours = now.getHours();
      // Open Mon-Sat (1-6), 10:00 to 20:00
      if (day >= 1 && day <= 6 && hours >= 10 && hours < 20) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    }

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  async function handleAppointmentSubmit(e: FormEvent<HTMLFormElement>) {
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
      if (!res.ok) throw new Error(data.error || "Failed to submit request.");
      setStatus("success");
      setFeedback(data.message || "Appointment request received! Our clinic desk will call you shortly.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong. Please call +91 94043 30627 directly.");
    }
  }

  return (
    <div className="relative min-h-screen bg-ivory text-ink selection:bg-gold selection:text-ivory overflow-x-hidden font-sans">
      {/* Background ambient lighting */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-teal-mist/70 blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-[36rem] h-[36rem] rounded-full bg-gold-light/35 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[30rem] h-[30rem] rounded-full bg-teal/5 blur-3xl" />
      </div>

      {/* Top Maintenance Notice Strip */}
      <div className="bg-teal-deep text-ivory text-[11px] sm:text-xs py-2 px-4 border-b border-gold/30 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold text-gold-light uppercase tracking-wider">
              Maintenance Notice:
            </span>
            <span className="text-ivory/80 hidden sm:inline">
              Website undergoing scheduled upgrade. Physical clinic is open as normal.
            </span>
          </div>
          <div className="flex items-center gap-3 font-medium">
            <span className="text-ivory/70 hidden md:inline">Helpline:</span>
            <a href="tel:+919404330627" className="text-gold-light hover:underline font-bold">
              +91 94043 30627
            </a>
          </div>
        </div>
      </div>

      {/* Top Header: Brand & quick actions */}
      <header className="relative z-20 border-b border-ink/10 bg-ivory/85 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Clinic Name */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-sm ring-1 ring-ink/10 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/logo-emblem.png"
                alt="Latur Dental Clinic Emblem"
                width={44}
                height={44}
                className="h-8 w-8 object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-base sm:text-lg text-teal-deep tracking-tight">
                  Latur Dental Clinic
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-900 border border-amber-500/30">
                  <Wrench className="h-2.5 w-2.5" />
                  Under Maintenance
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                Orthodontic &amp; Aesthetic Dental Centre · Ganj Golai, Latur
              </p>
            </div>
          </div>

          {/* Quick Contact & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-mist/50 border border-teal/15 text-xs font-semibold text-teal-deep">
              <span className={`h-2 w-2 rounded-full ${isOpenNow ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span>{isOpenNow ? "Clinic Open Now" : "Clinic Opens 10:00 AM"}</span>
            </div>

            <a
              href="tel:+919404330627"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-teal/25 bg-card text-teal font-semibold text-xs sm:text-sm hover:border-gold hover:text-gold-deep transition-colors shadow-xs"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">+91 94043 30627</span>
              <span className="xs:hidden">Call</span>
            </a>

            <a
              href="https://wa.me/919404330627?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Latur%20Dental%20Clinic."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1fa85a] text-white font-semibold text-xs sm:text-sm hover:bg-[#188c49] transition-colors shadow-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {onPreviewFullSite && (
              <button
                type="button"
                onClick={onPreviewFullSite}
                title="Preview full website draft"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal text-ivory text-xs font-bold hover:bg-teal-deep transition-all shadow-xs cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Full Site Preview</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10">
        <section className="pt-8 sm:pt-14 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Maintenance Narrative & Operational Notice */}
            <div className="lg:col-span-7 space-y-6">
              {/* Maintenance badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-deep text-ivory text-xs sm:text-sm font-medium shadow-md border border-gold/30"
              >
                <Wrench className="h-4 w-4 text-gold-light shrink-0 animate-spin-slow" />
                <span>Temporary Website Under Maintenance</span>
              </motion.div>

              {/* Major Display Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.08]"
              >
                Website undergoing{" "}
                <span className="italic text-teal font-normal underline decoration-gold/50 decoration-wavy decoration-1 underline-offset-8">
                  scheduled maintenance
                </span>
                .
              </motion.h1>

              {/* Sub-text */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
              >
                We are currently updating our online systems and digital patient services to give you an enhanced experience. 
                Our physical clinic at <strong>Ganj Golai, Latur</strong> is <strong>100% open and operating normally</strong> for all dental checkups, consultations, braces, aligners, and treatments.
              </motion.p>

              {/* Operational Notice Box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="p-5 sm:p-6 rounded-3xl bg-card border border-gold/35 shadow-[0_15px_35px_-15px_rgba(11,36,31,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-2xl bg-teal text-ivory flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="h-5 w-5 text-gold-light" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-ink text-base">
                        Physical Clinic Fully Operational
                      </span>
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Mon – Sat: <strong>10:00 AM – 8:00 PM</strong> · Sunday: On Prior Appointment
                    </p>
                    <p className="text-xs text-teal font-semibold mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gold-deep" />
                      Lokhand Galli, Ganj Golai, Latur, Maharashtra
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Latur+Dental+Clinic+Ganj+Golai+Latur"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-teal text-ivory text-xs sm:text-sm font-semibold hover:bg-teal-deep transition-all shadow-xs shrink-0 self-stretch sm:self-auto justify-center"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Directions
                </a>
              </motion.div>

              {/* Maintenance Progress status */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="space-y-2 pt-2"
              >
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-teal">
                    <RefreshCw className="h-3 w-3 animate-spin text-teal" />
                    System Upgrade In Progress
                  </span>
                  <span className="text-gold-deep font-display text-sm font-bold">Resuming Soon</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-teal-mist/60 overflow-hidden p-0.5 border border-ink/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-teal via-teal to-gold"
                  />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-teal" />
                  Online appointment routing and priority direct booking remain active below.
                </p>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-3 gap-3 pt-4 border-t border-ink/10"
              >
                <div>
                  <p className="font-display font-bold text-2xl text-teal">15+ Years</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Clinical Care
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-teal">10,000+</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Happy Patients
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-teal flex items-center gap-1">
                    4.9
                    <Star className="h-4 w-4 fill-gold text-gold inline" />
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Google Rating
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Direct Instant Appointment Form Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[2.5rem] bg-teal-deep text-ivory p-6 sm:p-8 shadow-[0_30px_70px_-20px_rgba(10,53,48,0.7)] border border-gold/30 overflow-hidden">
                {/* Glow decor */}
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold/15 blur-3xl pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-teal-mist/10 blur-3xl pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-4 border-b border-ivory/15">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light">
                        Priority Desk Booking
                      </span>
                      <h2 className="font-display text-2xl font-bold mt-0.5">Book Appointment</h2>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-ivory/10 border border-ivory/15 flex items-center justify-center text-gold-light">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-xs text-ivory/70 mt-3">
                    Need a consultation with Dr. Siddharth or Dr. Jyoti? Submit your request and our clinic front desk will call you to confirm your slot today.
                  </p>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 rounded-2xl bg-ivory/10 border border-gold/50 p-6 text-center space-y-4"
                      >
                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center border border-emerald-500/40">
                          <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-ivory">Request Received!</h3>
                        <p className="text-xs sm:text-sm text-ivory/80">{feedback}</p>
                        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                          <a
                            href="https://wa.me/919404330627?text=Hi%2C%20I%20just%20submitted%20an%20appointment%20request%20on%20your%20website."
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#1fa85a] text-white text-xs font-bold hover:bg-[#188c49] transition-colors"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Notify on WhatsApp
                          </a>
                          <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="py-2.5 px-4 rounded-xl bg-ivory/15 border border-ivory/20 text-xs font-semibold hover:bg-ivory hover:text-teal-deep transition-colors cursor-pointer"
                          >
                            New Request
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleAppointmentSubmit} className="mt-5 space-y-3.5">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                            Your Full Name <span className="text-gold-light">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            name="name"
                            placeholder="e.g. Ramesh Deshmukh"
                            className="w-full h-11 px-3.5 rounded-xl bg-ivory/10 border border-ivory/20 text-sm text-ivory placeholder:text-ivory/35 focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                              Mobile Number <span className="text-gold-light">*</span>
                            </label>
                            <input
                              required
                              type="tel"
                              name="phone"
                              inputMode="tel"
                              placeholder="+91 94043 30627"
                              className="w-full h-11 px-3.5 rounded-xl bg-ivory/10 border border-ivory/20 text-sm text-ivory placeholder:text-ivory/35 focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                              Preferred Date <span className="text-gold-light">*</span>
                            </label>
                            <input
                              required
                              type="date"
                              name="date"
                              min={minDate}
                              className="w-full h-11 px-3.5 rounded-xl bg-ivory/10 border border-ivory/20 text-sm text-ivory [color-scheme:dark] focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                            Treatment / Concern
                          </label>
                          <select
                            name="service"
                            defaultValue=""
                            className="w-full h-11 px-3.5 rounded-xl bg-ivory/10 border border-ivory/20 text-sm text-ivory focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors [&>option]:text-ink"
                          >
                            <option value="">Select Treatment (Optional)</option>
                            <option value="Braces & Invisible Aligners">Braces &amp; Invisible Aligners</option>
                            <option value="Painless Root Canal (RCT)">Painless Root Canal (RCT)</option>
                            <option value="Dental Implants">Dental Implants</option>
                            <option value="Cosmetic Smile Makeover">Cosmetic Smile Makeover</option>
                            <option value="Teeth Cleaning & Whitening">Teeth Cleaning &amp; Whitening</option>
                            <option value="General Consultation & Toothache">General Consultation &amp; Toothache</option>
                            <option value="Kids Dentistry">Kids Dentistry</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-ivory/70 mb-1">
                            Additional Note (Optional)
                          </label>
                          <input
                            type="text"
                            name="message"
                            placeholder="e.g. Prefer evening slot / tooth pain"
                            className="w-full h-11 px-3.5 rounded-xl bg-ivory/10 border border-ivory/20 text-sm text-ivory placeholder:text-ivory/35 focus:outline-none focus:border-gold focus:bg-ivory/15 transition-colors"
                          />
                        </div>

                        {status === "error" && (
                          <div className="p-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 text-xs flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 shrink-0" />
                            <span>{feedback}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full h-12 rounded-full bg-gold text-teal-deep font-bold text-sm uppercase tracking-wider hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <CalendarCheck className="h-4 w-4" />
                              Book Appointment Now
                            </>
                          )}
                        </button>

                        <p className="text-[11px] text-center text-ivory/50">
                          🔒 Direct clinic booking · No advance fee required
                        </p>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Doctors Sneak Peek Section */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-ink/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-teal-mist text-teal-deep border border-teal/20">
              Expert Clinical Leadership
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink font-semibold mt-3">
              Consult Our Specialist Doctors
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Combining world-class orthodontic precision with comprehensive, painless restorative dental care in Latur.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {DOCTORS.map((doc) => (
              <div
                key={doc.name}
                className="group rounded-3xl bg-card border border-ink/10 overflow-hidden hover:border-gold/50 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-44 h-56 sm:h-auto shrink-0 bg-teal-mist/40">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/30 to-transparent sm:hidden" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-deep bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30">
                      {doc.exp}
                    </span>
                    <h3 className="font-display font-bold text-xl text-ink mt-2">{doc.name}</h3>
                    <p className="text-xs font-bold text-teal mt-0.5">{doc.qual}</p>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">{doc.role}</p>
                    <p className="text-xs text-muted-foreground/90 mt-3 leading-relaxed">{doc.focus}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ink/10 flex items-center gap-2">
                    <a
                      href="tel:+919404330627"
                      className="text-xs font-bold text-teal hover:text-gold-deep flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" />
                      Consult Doctor
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Treatments Sneak Peek */}
        <section className="py-16 px-4 sm:px-6 bg-ivory-deep/50 border-y border-ink/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  Active Clinical Specialties
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink font-semibold mt-1">
                  Treatments Available Today
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                Equipped with modern dental operatory, digital X-rays, rotary RCT systems, and strict sterilization protocols.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HIGHLIGHT_SERVICES.map((srv) => (
                <div
                  key={srv.title}
                  className="rounded-3xl bg-card border border-ink/8 p-6 shadow-xs hover:border-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-teal text-ivory flex items-center justify-center shadow-xs">
                        <srv.icon className="h-6 w-6 text-gold-light" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-mist text-teal-deep">
                        {srv.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-ink mt-4">{srv.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{srv.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-ink/8">
                    <a
                      href={"https://wa.me/919404330627?text=Hi%2C%20I%20am%20interested%20in%20" + encodeURIComponent(srv.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-gold-deep hover:text-teal flex items-center gap-1"
                    >
                      Inquire via WhatsApp <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Temporary FAQ Section */}
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl text-ink font-semibold mt-1">
              Clinic &amp; Maintenance FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-2xl bg-card border border-ink/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left font-display font-semibold text-base text-ink flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gold-deep shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground border-t border-ink/5 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-teal-deep text-ivory border-t border-gold/20 pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 pb-10 border-b border-ivory/15">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center p-1">
                <Image
                  src="/logo-emblem.png"
                  alt="Latur Dental Clinic"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-ivory">Latur Dental Clinic</h3>
                <p className="text-xs text-gold-light">Orthodontic &amp; Aesthetic Dental Centre</p>
              </div>
            </div>
            <p className="text-xs text-ivory/70 max-w-sm leading-relaxed">
              Bringing life to your smile with over 15 years of dedicated orthodontic and restorative dental care in Latur.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-ivory/60">Clinic Tagline:</span>
              <span className="italic text-xs font-serif text-gold-light">&ldquo;Bringing Life to Your Smile!&rdquo;</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h4 className="font-display font-bold text-sm text-gold-light uppercase tracking-wider">
              Clinic Location &amp; Hours
            </h4>
            <p className="text-xs text-ivory/80 flex items-start gap-2 pt-1">
              <MapPin className="h-4 w-4 text-gold-light shrink-0 mt-0.5" />
              Lokhand Galli, Ganj Golai, Latur, Maharashtra 413512
            </p>
            <p className="text-xs text-ivory/80 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-light shrink-0" />
              Monday – Saturday: 10:00 AM – 8:00 PM
            </p>
            <p className="text-xs text-ivory/80 flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-light shrink-0" />
              Emergency &amp; Appointments: +91 94043 30627
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-display font-bold text-sm text-gold-light uppercase tracking-wider">
                Direct Contact
              </h4>
              <p className="text-xs text-ivory/70 mt-1">
                Reach Dr. Siddharth &amp; Dr. Jyoti Phadkule directly on WhatsApp or Call.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/919404330627?text=Hello%20Doctor%2C%20I%20would%20like%20to%20consult%20at%20Latur%20Dental%20Clinic."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1fa85a] text-white text-xs font-bold hover:bg-[#188c49] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+919404330627"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-ivory/15 border border-ivory/25 text-ivory text-xs font-bold hover:bg-ivory hover:text-teal-deep transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call +91 94043 30627
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} Latur Dental Clinic &amp; Orthodontic Centre. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Wrench className="h-3 w-3" />
              Website Under Scheduled Maintenance
            </span>
            {onPreviewFullSite && (
              <button
                type="button"
                onClick={onPreviewFullSite}
                className="text-gold-light hover:underline font-semibold cursor-pointer"
              >
                Preview Full Site Draft →
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919404330627?text=Hi%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Latur%20Dental%20Clinic."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-transform"
        >
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
          <MessageCircle className="h-7 w-7" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-teal-deep/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-ivory shadow-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            Chat on WhatsApp
          </span>
        </a>

        <a
          href="tel:+919404330627"
          aria-label="Call clinic directly"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-teal text-ivory shadow-[0_10px_24px_rgba(10,53,48,0.45)] hover:scale-110 active:scale-95 transition-transform"
        >
          <Phone className="h-5 w-5" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-teal-deep/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-ivory shadow-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            Call +91 94043 30627
          </span>
        </a>
      </aside>
    </div>
  );
}
