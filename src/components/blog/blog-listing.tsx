"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Clock,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Home,
  Sparkles,
  Phone,
  Filter,
  Languages,
} from "lucide-react";
import { getAllBlogPosts, type BlogPost } from "@/lib/blog-data";
import {
  BLOG_UI_STRINGS,
  BLOG_POSTS_MR,
  CATEGORY_MAP_MR,
  type BlogLanguage,
} from "@/lib/blog-data-mr";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/site/reveal";

function scrollToTopInstant() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }
}

const CATEGORIES = [
  "All",
  "Braces Guide",
  "Braces Comparison",
  "Orthodontic Treatment",
  "Dental Care in Latur",
  "First-Time Patient Guide",
] as const;

export function BlogListing() {
  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const ui = BLOG_UI_STRINGS[lang];

  useEffect(() => {
    if (window.location.hash) return;
    scrollToTopInstant();
  }, []);

  // Featured article (first one)
  const featuredPost = allPosts[0];
  const featuredMr =
    lang === "mr" && featuredPost ? BLOG_POSTS_MR[featuredPost.slug] : undefined;
  const featuredTitle = featuredMr?.title || featuredPost?.title;
  const featuredExcerpt = featuredMr?.excerpt || featuredPost?.excerpt;
  const featuredCategory =
    lang === "mr" && featuredPost
      ? CATEGORY_MAP_MR[featuredPost.category] || featuredPost.category
      : featuredPost?.category;
  const featuredDisplayDate =
    featuredMr?.displayDate || featuredPost?.displayDate;
  const featuredReadingTime =
    featuredMr?.readingTime || featuredPost?.readingTime;

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const mr = BLOG_POSTS_MR[post.slug];
      const matchesEn =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.contentSections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.paragraphs.some((p) => p.toLowerCase().includes(q))
        );

      const matchesMr = mr
        ? mr.title?.toLowerCase().includes(q) ||
          mr.excerpt?.toLowerCase().includes(q) ||
          (CATEGORY_MAP_MR[post.category] &&
            CATEGORY_MAP_MR[post.category].toLowerCase().includes(q)) ||
          (mr.contentSections &&
            mr.contentSections.some(
              (s) =>
                s.heading.toLowerCase().includes(q) ||
                s.paragraphs.some((p) => p.toLowerCase().includes(q))
            ))
        : false;

      return matchesCategory && (matchesEn || matchesMr);
    });
  }, [allPosts, selectedCategory, searchQuery]);

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb Navigation + Language Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-ink transition-colors"
            >
              <Home className="h-3.5 w-3.5" aria-hidden />
              <span>{ui.home}</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-border" aria-hidden />
            <span className="text-ink">{ui.blog}</span>
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

        {/* Hero Header */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
              <span className="h-px w-8 bg-gold-deep/50" />
              {ui.patientHub}
              <span className="h-px w-8 bg-gold-deep/50" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl font-medium tracking-tight text-ink leading-[1.08]">
              {ui.listingTitle1}
              <em className="text-teal not-italic italic font-display">
                {ui.listingTitle2}
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              {ui.listingDesc}
            </p>
          </Reveal>
        </div>

        {/* Featured Article Spotlight (shown when no search filter active) */}
        {!searchQuery && selectedCategory === "All" && featuredPost && (
          <Reveal delay={0.2} className="mt-12">
            <div className="relative rounded-[2.5rem] bg-teal-deep text-ivory overflow-hidden grain shadow-[0_32px_70px_-28px_rgba(10,53,48,0.7)]">
              <div className="grid lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-light">
                    <Sparkles className="h-3.5 w-3.5 text-gold-light" />
                    {ui.featuredBadge} · {featuredCategory}
                  </div>

                  <h2 className="mt-5 font-display text-2xl sm:text-4xl font-semibold leading-tight text-ivory">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      onClick={scrollToTopInstant}
                      className="hover:text-gold-light transition-colors"
                    >
                      {featuredTitle}
                    </Link>
                  </h2>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-ivory/75">
                    {featuredExcerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-ivory/65">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold-light" />
                      {featuredDisplayDate}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold-light" />
                      {featuredReadingTime}
                    </span>
                    <span className="text-ivory/50">·</span>
                    <span>{ui.reviewedBy}</span>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      onClick={scrollToTopInstant}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 h-12 text-sm font-bold text-teal-deep shadow-[0_12px_28px_-10px_rgba(196,151,92,0.6)] hover:bg-gold-light transition-all"
                    >
                      <span>{ui.readCompleteGuide}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[340px] overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredMr?.coverImageAlt || featuredPost.coverImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-teal-deep via-transparent to-transparent opacity-80" />
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Search & Category Filter Section */}
        <div className="mt-14 pt-8 border-t border-ink/8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
                aria-hidden
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="h-12 w-full rounded-full bg-card border border-ink/10 pl-11 pr-10 text-sm text-ink placeholder:text-muted-foreground/60 shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                aria-label={ui.searchPlaceholder}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink p-1"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
              role="tablist"
              aria-label="Filter by category"
            >
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
                <Filter className="h-3.5 w-3.5" />
                {ui.filterLabel}
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const categoryLabel =
                  lang === "mr" ? CATEGORY_MAP_MR[cat] || cat : cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    role="tab"
                    aria-selected={isActive}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-teal text-ivory shadow-md scale-[1.02]"
                        : "bg-card border border-ink/10 text-muted-foreground hover:border-teal hover:text-ink"
                    }`}
                  >
                    {categoryLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter / Filter status */}
        <div className="mt-8 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>
            {ui.showing} {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? ui.articleSingular : ui.articlePlural}
            {selectedCategory !== "All"
              ? ` ${ui.inCategory} ${
                  lang === "mr"
                    ? CATEGORY_MAP_MR[selectedCategory] || selectedCategory
                    : selectedCategory
                }`
              : ""}
            {searchQuery ? ` (${ui.matching}: "${searchQuery}")` : ""}
          </span>
          {(selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-gold-deep hover:underline"
            >
              {ui.resetFilters}
            </button>
          )}
        </div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div
              layout
              className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <BlogCard post={post} lang={lang} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <div className="mt-16 rounded-[2rem] bg-card border border-dashed border-ink/20 p-12 text-center max-w-xl mx-auto">
              <p className="font-display text-2xl font-semibold text-ink">
                {ui.noArticlesFound}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {ui.noArticlesDesc}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-6 rounded-full bg-teal px-6 h-11 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-teal-deep transition-colors"
              >
                {ui.resetFilters}
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* Consultation Call to Action Box */}
        <div className="mt-24 rounded-[2.5rem] bg-ivory-deep border border-ink/10 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
            {ui.ctaBadge}
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-medium text-ink">
            {ui.ctaTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {ui.ctaDesc}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#appointment"
              className="rounded-full bg-teal px-8 h-12 inline-flex items-center gap-2 text-sm font-bold text-ivory shadow-[0_12px_28px_-10px_rgba(17,75,68,0.6)] hover:bg-teal-deep transition-all"
            >
              {ui.bookConsultation}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919404330627"
              className="rounded-full border border-ink/20 px-7 h-12 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:border-gold hover:text-gold-deep transition-colors"
            >
              <Phone className="h-4 w-4" />
              {ui.callNumber}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
