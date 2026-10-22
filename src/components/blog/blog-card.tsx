"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <motion.article
      className="group relative flex flex-col h-full rounded-[2rem] bg-card border border-ink/8 overflow-hidden transition-all duration-500 hover:border-gold/50 hover:shadow-[0_28px_60px_-24px_rgba(11,36,31,0.25)] hover:-translate-y-1.5"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Featured image container */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-teal-deep/10"
        aria-label={`Read article: ${post.title}`}
      >
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge on top of image */}
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-ivory/95 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-deep shadow-sm">
          {post.category}
        </span>

        {/* Placeholder label badge if applicable */}
        {post.slug === "why-choose-latur-dental-clinic" && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ivory/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-deep shadow-sm border border-ink/10">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Add Your Image Here
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Meta row: Date and Reading Time */}
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
            {post.displayDate}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-deep" aria-hidden />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-[22px] font-bold leading-snug text-ink group-hover:text-teal transition-colors duration-300">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Description / Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>

        {/* Card Footer: Read Article CTA */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-ink/6">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal hover:text-gold-deep transition-colors"
          >
            <span>Read Article</span>
            <span className="grid place-items-center h-7 w-7 rounded-full bg-teal-mist/60 text-teal transition-transform duration-300 group-hover:bg-teal group-hover:text-ivory group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>

          <span className="text-[11px] font-semibold text-muted-foreground/80">
            By Dr. Siddharth
          </span>
        </div>
      </div>
    </motion.article>
  );
}
