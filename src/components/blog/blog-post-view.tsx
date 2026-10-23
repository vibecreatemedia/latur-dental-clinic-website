"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Home,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Phone,
  Share2,
  Check,
  BadgeCheck,
  ShieldAlert,
  Languages,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";
import {
  BLOG_UI_STRINGS,
  BLOG_POSTS_MR,
  CATEGORY_MAP_MR,
  type BlogLanguage,
} from "@/lib/blog-data-mr";
import { BlogCard } from "@/components/blog/blog-card";

interface BlogPostViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostView({ post, relatedPosts }: BlogPostViewProps) {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [lang, setLang] = useState<BlogLanguage>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("blog_language");
      if (saved === "mr" || saved === "en") {
        setLang(saved);
      }
    } catch {
      // local storage unavailable
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang: BlogLanguage = lang === "en" ? "mr" : "en";
    setLang(nextLang);
    try {
      localStorage.setItem("blog_language", nextLang);
    } catch {
      // ignore
    }
  };

  const isMr = lang === "mr";
  const mrPost = isMr ? BLOG_POSTS_MR[post.slug] : undefined;
  const ui = BLOG_UI_STRINGS[lang];

  const displayTitle = mrPost?.title || post.title;
  const displayExcerpt = mrPost?.excerpt || post.excerpt;
  const displayCategory = isMr
    ? CATEGORY_MAP_MR[post.category] || post.category
    : post.category;
  const displayDisplayDate = mrPost?.displayDate || post.displayDate;
  const displayReadingTime = mrPost?.readingTime || post.readingTime;
  const displayCoverAlt = mrPost?.coverImageAlt || post.coverImageAlt;
  const displayAuthor = mrPost?.author || post.author;
  const displayToc = mrPost?.tableOfContents || post.tableOfContents;
  const displaySections = mrPost?.contentSections || post.contentSections;
  const displayFaq = mrPost?.faq || post.faq;

  // Guarantee that when an article is opened or switched, it opens at the very top
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
        return;
      }
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    resetScroll();
    const rafId = requestAnimationFrame(resetScroll);
    const timer = setTimeout(resetScroll, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [post.slug]);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: displayTitle,
            text: displayExcerpt,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      } catch {
        // user cancelled or share failed
      }
    }
  };

  return (
    <article className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb Navigation + Language Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              <Home className="h-3.5 w-3.5" aria-hidden />
              <span>{ui.home}</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-border" aria-hidden />
            <Link href="/blog" className="hover:text-ink transition-colors">
              {ui.blog}
            </Link>
            <ChevronRight className="h-3 w-3 text-border" aria-hidden />
            <span className="text-teal font-medium">{displayCategory}</span>
          </nav>

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-card px-4 py-1.5 text-xs font-bold text-teal hover:bg-teal hover:text-ivory shadow-sm transition-all duration-300"
            aria-label={ui.toggleAria}
          >
            <Languages className="h-3.5 w-3.5" aria-hidden />
            <span>{ui.toggleBtn}</span>
          </button>
        </div>

        {/* Article Header Container */}
        <header className="max-w-4xl">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-mist px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
            {displayCategory}
          </div>

          {/* Main H1 Title */}
          <h1 className="mt-5 font-display text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-ink leading-[1.12]">
            {displayTitle}
          </h1>

          {/* Short Introduction / Excerpt */}
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground font-normal">
            {displayExcerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="mt-8 pt-6 border-t border-ink/8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Author details */}
            <div className="flex items-center gap-3.5">
              <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-gold/30 bg-teal shrink-0">
                <Image
                  src={displayAuthor.image}
                  alt={displayAuthor.name}
                  fill
                  className="object-cover object-[center_15%]"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-ink flex items-center gap-1.5">
                  {displayAuthor.name}
                  <BadgeCheck className="h-4 w-4 text-teal" aria-hidden />
                </p>
                <p className="text-xs text-muted-foreground">
                  {displayAuthor.role} · {displayAuthor.creds}
                </p>
              </div>
            </div>

            {/* Dates & Reading Time */}
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
                {ui.published} {displayDisplayDate}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
                {displayReadingTime}
              </span>
              <button
                onClick={handleShare}
                className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-card border border-ink/10 px-3 py-1 text-xs font-semibold text-ink hover:border-gold hover:text-gold-deep transition-colors"
                aria-label="Share article link"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600" />
                    {ui.copied}
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    {ui.share}
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mt-10 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-teal-deep/5 aspect-[16/9] relative shadow-[0_24px_50px_-20px_rgba(11,36,31,0.25)] border border-ink/8">
          <Image
            src={post.coverImage}
            alt={displayCoverAlt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
          />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground italic">
          {displayCoverAlt}
        </p>

        {/* Main Body Grid: Content + Sticky Sidebar */}
        <div className="mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Article Content */}
          <main className="lg:col-span-8 space-y-12">
            {/* Table of Contents for Mobile / In-flow */}
            <div className="rounded-3xl bg-ivory-deep border border-ink/8 p-6 lg:hidden">
              <p className="font-display text-lg font-semibold text-ink mb-3">
                {ui.tableOfContents}
              </p>
              <ul className="space-y-2 text-sm">
                {displayToc.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-teal hover:text-gold-deep flex items-baseline gap-2"
                    >
                      <span className="text-xs text-muted-foreground font-mono">
                        0{idx + 1}.
                      </span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Structured Content Sections */}
            {displaySections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 space-y-5"
              >
                {/* Section H2 Heading */}
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight pt-2 border-b border-ink/6 pb-3">
                  {section.heading}
                </h2>

                {section.subheading && (
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-teal-deep">
                    {section.subheading}
                  </h3>
                )}

                {/* Paragraphs */}
                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base sm:text-[17px] leading-relaxed text-ink/85"
                  >
                    {p}
                  </p>
                ))}

                {/* Bullet Points */}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="my-5 space-y-2.5 pl-1">
                    {section.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-base text-ink/85 leading-relaxed"
                      >
                        <CheckCircle2
                          className="mt-1 h-4 w-4 shrink-0 text-teal"
                          aria-hidden
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Callout Box */}
                {section.callout && (
                  <div
                    className={`my-6 rounded-2xl p-5 border ${
                      section.callout.type === "warning"
                        ? "bg-amber-50/70 border-amber-300/80 text-amber-950"
                        : section.callout.type === "tip"
                        ? "bg-emerald-50/70 border-emerald-300/80 text-emerald-950"
                        : "bg-teal-mist/60 border-teal/20 text-teal-deep"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep"
                        aria-hidden
                      />
                      <div>
                        <p className="font-display font-semibold text-base">
                          {section.callout.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Inline Supporting Image */}
                {section.inlineImage && (
                  <figure className="my-8 rounded-2xl overflow-hidden bg-card border border-ink/8">
                    {section.inlineImage.src.includes("dr-siddharth") ? (
                      <div className="bg-gradient-to-b from-ivory to-teal-mist/15 p-6 sm:p-8 flex flex-col items-center justify-center">
                        <div className="relative aspect-[4/5] w-full max-w-[360px] rounded-2xl overflow-hidden shadow-lg border border-ink/10 bg-white">
                          <Image
                            src={section.inlineImage.src}
                            alt={section.inlineImage.alt}
                            fill
                            priority
                            sizes="(max-width: 640px) 90vw, 360px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={section.inlineImage.src}
                          alt={section.inlineImage.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 760px"
                          className="object-cover object-top"
                        />
                      </div>
                    )}
                    <figcaption className="p-4 text-center text-xs text-muted-foreground italic border-t border-ink/6">
                      {section.inlineImage.caption}
                    </figcaption>
                  </figure>
                )}

                {/* Custom Comparison Table */}
                {section.table && (
                  <div className="my-8 overflow-x-auto rounded-2xl border border-ink/10 bg-card shadow-sm">
                    {section.table.caption && (
                      <div className="p-4 bg-ivory-deep border-b border-ink/8 text-sm font-bold text-ink">
                        {section.table.caption}
                      </div>
                    )}
                    <table className="w-full text-left text-sm">
                      <thead className="bg-teal-deep text-ivory text-xs uppercase tracking-wider font-semibold">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-3.5 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/8 text-ink/85">
                        {section.table.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? "bg-card" : "bg-ivory/50"}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-4 py-3.5 align-top ${
                                  cIdx === 0
                                    ? "font-bold text-ink whitespace-nowrap"
                                    : "text-ink/80 leading-relaxed"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Medical Educational Disclaimer Callout */}
            <div className="mt-14 rounded-3xl bg-card border border-ink/10 p-6 sm:p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="grid place-items-center h-10 w-10 shrink-0 rounded-2xl bg-teal-mist text-teal">
                  <ShieldAlert className="h-5 w-5" aria-hidden />
                </span>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  <p className="font-display font-semibold text-ink text-base">
                    {ui.disclaimerTitle}
                  </p>
                  <p className="mt-1.5">
                    {ui.disclaimerText}
                  </p>
                </div>
              </div>
            </div>

            {/* Frequently Asked Questions Accordion */}
            {displayFaq && displayFaq.length > 0 && (
              <section id="faq" className="scroll-mt-28 pt-4">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight mb-6 flex items-center gap-2.5">
                  <HelpCircle className="h-6 w-6 text-gold-deep" />
                  {ui.faqHeading}
                </h2>

                <div className="space-y-3">
                  {displayFaq.map((item, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-ink/8 bg-card overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() =>
                            setOpenFaqIndex(isOpen ? null : idx)
                          }
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between p-5 text-left font-display text-lg font-semibold text-ink hover:text-teal transition-colors"
                        >
                          <span>{item.question}</span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-teal" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-muted-foreground border-t border-ink/5">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Bottom Consultation CTA */}
            <div className="rounded-[2.5rem] bg-teal-deep text-ivory p-8 sm:p-12 text-center relative overflow-hidden grain shadow-[0_32px_70px_-28px_rgba(10,53,48,0.7)]">
              <div
                aria-hidden
                className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl pointer-events-none"
              />
              <div className="relative max-w-xl mx-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-gold-light">
                  {ui.articleCtaBadge}
                </span>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold leading-snug">
                  {ui.articleCtaTitle}
                </h3>
                <p className="mt-3 text-sm text-ivory/75 leading-relaxed">
                  {ui.articleCtaDesc}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                  <Link
                    href="/#appointment"
                    className="rounded-full bg-gold px-8 h-12 inline-flex items-center gap-2 text-sm font-bold text-teal-deep shadow-md hover:bg-gold-light transition-all"
                  >
                    {ui.bookConsultation}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="tel:+919404330627"
                    className="rounded-full border border-ivory/30 px-7 h-12 inline-flex items-center gap-2 text-sm font-semibold text-ivory hover:bg-ivory hover:text-ink transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {ui.callNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Return to Blog link */}
            <div className="pt-4">
              <Link
                href="/blog"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                  if (document.documentElement) document.documentElement.scrollTop = 0;
                  if (document.body) document.body.scrollTop = 0;
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-teal hover:text-gold-deep transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {ui.backToBlog}
              </Link>
            </div>
          </main>

          {/* Sticky Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            {/* Table of Contents card */}
            <div className="rounded-3xl bg-card border border-ink/8 p-6 shadow-sm">
              <p className="font-display text-base font-bold text-ink uppercase tracking-wider text-xs mb-4 text-gold-deep">
                {ui.onThisPage}
              </p>
              <nav aria-label="Table of contents">
                <ul className="space-y-2.5 text-xs font-medium">
                  {displayToc.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-muted-foreground hover:text-teal flex items-baseline gap-2 py-0.5 transition-colors"
                      >
                        <span className="font-mono text-[10px] text-muted-foreground/60">
                          0{idx + 1}.
                        </span>
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Doctor Bio Card */}
            <div className="rounded-3xl bg-card border border-ink/8 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-full overflow-hidden bg-teal shrink-0 ring-2 ring-gold/40">
                  <Image
                    src={displayAuthor.image}
                    alt={displayAuthor.name}
                    fill
                    className="object-cover object-[center_15%]"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">
                    {displayAuthor.name}
                  </p>
                  <p className="text-xs text-gold-deep font-semibold">
                    {ui.specialistTitle}
                  </p>
                </div>
              </div>
              <p className="mt-3.5 text-xs text-muted-foreground leading-relaxed">
                {ui.specialistBio}
              </p>
              <Link
                href="/#appointment"
                className="mt-4 w-full rounded-full bg-teal text-ivory text-xs font-bold py-2.5 px-4 text-center block hover:bg-teal-deep transition-colors"
              >
                {ui.bookWithDoctor}
              </Link>
            </div>

            {/* Clinic Quick Contact Widget */}
            <div className="rounded-3xl bg-ivory-deep border border-ink/8 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-deep">
                {ui.quickContactTitle}
              </p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {ui.quickContactDesc}
              </p>
              <a
                href="tel:+919404330627"
                className="mt-3.5 inline-flex items-center gap-2 text-xs font-bold text-teal hover:underline"
              >
                <Phone className="h-3.5 w-3.5 text-gold-deep" />
                +91 94043 30627
              </a>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-28 pt-16 border-t border-ink/8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  {ui.keepLearning}
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink">
                  {ui.relatedGuides}
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold uppercase tracking-wider text-teal hover:text-gold-deep flex items-center gap-1"
              >
                {ui.viewAllArticles} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} lang={lang} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
