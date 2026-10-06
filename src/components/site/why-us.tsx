"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  LayoutGrid,
  UserCheck,
  ScanLine,
  MessagesSquare,
  ShieldCheck,
  CalendarHeart,
  Feather,
} from "lucide-react";
import { SectionHeading, StaggerGroup, StaggerItem, Reveal } from "./reveal";

const REASONS = [
  { icon: Award, title: "Specialist Orthodontic Care", desc: "Expert alignment from a qualified MDS specialist." },
  { icon: LayoutGrid, title: "Comprehensive Dentistry", desc: "Every dental need addressed under one roof." },
  { icon: UserCheck, title: "Personalised Planning", desc: "Care plans tailored to your unique dental profile." },
  { icon: ScanLine, title: "Digital Dentistry", desc: "Accurate diagnosis with modern imaging & tech." },
  { icon: MessagesSquare, title: "Transparent Communication", desc: "Clear diagnosis, options and costs — no surprises." },
  { icon: ShieldCheck, title: "Strict Hygiene Protocols", desc: "Uncompromising sterilisation for total safety." },
  { icon: CalendarHeart, title: "Long-term Follow-up", desc: "We keep your smile healthy long after treatment." },
  { icon: Feather, title: "Painless Treatments", desc: "Gentle techniques for comfortable, calm visits." },
];

export function WhyUs() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="why-us" className="relative py-24 sm:py-32 bg-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-16">
          {/* sticky intro + parallax image */}
          <div className="lg:sticky lg:top-32 self-start">
            <SectionHeading
              align="left"
              eyebrow="Why Choose Us"
              title="Care that always"
              accent="puts you first."
              description="Everything we do — from the first consult to long-term follow-up — is designed around your comfort, confidence and lifelong oral health."
            />
            <Reveal delay={0.25}>
              <div ref={imgRef} className="relative mt-10 rounded-[2rem] overflow-hidden aspect-[16/10] shadow-[0_30px_70px_-28px_rgba(11,36,31,0.45)]">
                <motion.div className="absolute inset-[-12%]" style={{ y }}>
                  <Image
                    src="/images/smile-banner.jpg"
                    alt="A confident, radiant smile after cosmetic dental care"
                    fill
                    sizes="(max-width: 1024px) 92vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/45 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 right-5 text-ivory font-display italic text-lg drop-shadow">
                  &ldquo;Healthy teeth. Confident smiles. Specialist care.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          {/* reasons grid */}
          <StaggerGroup className="grid sm:grid-cols-2 gap-4 content-start" amount={0.1}>
            {REASONS.map((r) => (
              <StaggerItem key={r.title} className="h-full">
                <div className="group h-full rounded-3xl border border-ink/8 bg-card p-6 transition-all duration-500 hover:border-gold/50 hover:shadow-[0_24px_50px_-24px_rgba(11,36,31,0.35)] hover:-translate-y-1.5">
                  <span className="grid place-items-center h-12 w-12 rounded-2xl bg-teal-mist text-teal transition-all duration-500 group-hover:bg-teal group-hover:text-ivory group-hover:rotate-6">
                    <r.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
