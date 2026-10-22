"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";
import { getAllBlogPosts, type BlogPost } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/site/reveal";

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

  // Featured article (first one)
  const featuredPost = allPosts[0];

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.contentSections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.paragraphs.some((p) => p.toLowerCase().includes(q))
        );

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-8"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <Home className="h-3.5 w-3.5" aria-hidden />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-border" aria-hidden />
          <span className="text-ink">Blog</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
              <span className="h-px w-8 bg-gold-deep/50" />
              Patient Resource Hub
              <span className="h-px w-8 bg-gold-deep/50" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl font-medium tracking-tight text-ink leading-[1.08]">
              Dental Blogs &amp;{" "}
              <em className="text-teal not-italic italic font-display">
                Orthodontic Guides
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Discover helpful dental advice, explore orthodontic treatments, and
              learn how to make informed decisions about your smile. Written and
              medically reviewed by Dr. Siddharth Phadkule (MDS Orthodontics).
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
                    Featured Guide · {featuredPost.category}
                  </div>

                  <h2 className="mt-5 font-display text-2xl sm:text-4xl font-semibold leading-tight text-ivory">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="hover:text-gold-light transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-ivory/75">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-ivory/65">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold-light" />
                      {featuredPost.displayDate}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold-light" />
                      {featuredPost.readingTime}
                    </span>
                    <span className="text-ivory/50">·</span>
                    <span>Reviewed by Dr. Siddharth Phadkule (MDS)</span>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 h-12 text-sm font-bold text-teal-deep shadow-[0_12px_28px_-10px_rgba(196,151,92,0.6)] hover:bg-gold-light transition-all"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[340px] overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.coverImageAlt}
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
                placeholder="Search articles by topic, braces, aligners…"
                className="h-12 w-full rounded-full bg-card border border-ink/10 pl-11 pr-10 text-sm text-ink placeholder:text-muted-foreground/60 shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                aria-label="Search articles"
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
                Filter:
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
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
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter / Filter status */}
        <div className="mt-8 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>
            Showing {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
            {searchQuery ? ` matching "${searchQuery}"` : ""}
          </span>
          {(selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-gold-deep hover:underline"
            >
              Reset all filters
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
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <div className="mt-16 rounded-[2rem] bg-card border border-dashed border-ink/20 p-12 text-center max-w-xl mx-auto">
              <p className="font-display text-2xl font-semibold text-ink">
                No articles found
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We couldn&rsquo;t find any articles matching your search criteria.
                Try adjusting your keywords or clearing the category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-6 rounded-full bg-teal px-6 h-11 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-teal-deep transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* Consultation Call to Action Box */}
        <div className="mt-24 rounded-[2.5rem] bg-ivory-deep border border-ink/10 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
            Personalized Orthodontic Advice
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-medium text-ink">
            Have Questions About Your Teeth or Braces?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every smile is completely unique. Schedule an in-person orthodontic
            consultation with Dr. Siddharth Phadkule at Latur Dental Clinic to receive
            clear, personalized guidance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#appointment"
              className="rounded-full bg-teal px-8 h-12 inline-flex items-center gap-2 text-sm font-bold text-ivory shadow-[0_12px_28px_-10px_rgba(17,75,68,0.6)] hover:bg-teal-deep transition-all"
            >
              Book Your Consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919404330627"
              className="rounded-full border border-ink/20 px-7 h-12 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:border-gold hover:text-gold-deep transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call +91 94043 30627
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
