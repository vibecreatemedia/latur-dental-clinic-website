"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";
import { BLOG_POSTS_MR, CATEGORY_MAP_MR, type BlogLanguage } from "@/lib/blog-data-mr";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  lang?: BlogLanguage;
}

function scrollToTopInstant() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }
}

export function BlogCard({ post, priority = false, lang = "en" }: BlogCardProps) {
  const router = useRouter();

  const isMr = lang === "mr";
  const mrData = isMr ? BLOG_POSTS_MR[post.slug] : undefined;

  const displayTitle = mrData?.title || post.title;
  const displayExcerpt = mrData?.excerpt || post.excerpt;
  const displayCategory = isMr
    ? CATEGORY_MAP_MR[post.category] || post.category
    : post.category;
  const displayDate = mrData?.displayDate || post.displayDate;
  const displayReadingTime = mrData?.readingTime || post.readingTime;
  const ctaLabel = isMr ? "लेख वाचा" : "Read Article";
  const authorLabel = isMr ? "डॉ. सिद्धार्थ" : "By Dr. Siddharth";

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    // If the click was not already on an anchor tag, navigate to the post
    if (!target.closest("a")) {
      scrollToTopInstant();
      router.push(`/blog/${post.slug}`);
    }
  };

  return (
    <motion.article
      onClick={handleCardClick}
      className="group relative flex flex-col h-full rounded-[2rem] bg-card border border-ink/8 overflow-hidden transition-all duration-500 hover:border-gold/50 hover:shadow-[0_28px_60px_-24px_rgba(11,36,31,0.25)] hover:-translate-y-1.5 cursor-pointer"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Featured image container */}
      <Link
        href={`/blog/${post.slug}`}
        onClick={scrollToTopInstant}
        className="relative block aspect-[16/10] overflow-hidden bg-teal-deep/10"
        aria-label={`${ctaLabel}: ${displayTitle}`}
      >
        <Image
          src={post.coverImage}
          alt={mrData?.coverImageAlt || post.coverImageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge on top of image */}
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-ivory/95 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-deep shadow-sm">
          {displayCategory}
        </span>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Meta row: Date and Reading Time */}
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
            {displayDate}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
            {displayReadingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-[22px] font-bold leading-snug text-ink group-hover:text-teal transition-colors duration-300">
          <Link
            href={`/blog/${post.slug}`}
            onClick={scrollToTopInstant}
            className="focus:outline-none"
          >
            {displayTitle}
          </Link>
        </h3>

        {/* Description / Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {displayExcerpt}
        </p>

        {/* Card Footer: Read Article CTA */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-ink/6">
          <Link
            href={`/blog/${post.slug}`}
            onClick={scrollToTopInstant}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal hover:text-gold-deep transition-colors"
          >
            <span>{ctaLabel}</span>
            <span className="grid place-items-center h-7 w-7 rounded-full bg-teal-mist/60 text-teal transition-transform duration-300 group-hover:bg-teal group-hover:text-ivory group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>

          <span className="text-[11px] font-semibold text-muted-foreground/80">
            {authorLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
