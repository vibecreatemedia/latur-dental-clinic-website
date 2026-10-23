"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal, SectionHeading, StaggerGroup, StaggerItem } from "@/components/site/reveal";

export function BlogHomeSection() {
  const posts = getAllBlogPosts();

  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-ivory overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-teal-mist/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header container */}
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            eyebrow="Knowledge & Advice"
            title="Dental Blogs &"
            accent="Orthodontic Guides"
            description="Discover helpful dental advice, explore orthodontic treatments, and learn how to make informed decisions about your smile."
          />
        </div>

        {/* 5-Card Responsive Grid: 3 per row on desktop, 2 on tablet, 1 on mobile */}
        <StaggerGroup
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          amount={0.1}
        >
          {posts.map((post, idx) => (
            <StaggerItem
              key={post.slug}
              className={
                // For the 5th card on large screens, or standard layout
                "h-full"
              }
            >
              <BlogCard post={post} priority={idx === 0} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Bottom CTA bar: "View All Blogs" button linking to /blog */}
        <Reveal delay={0.25} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              if (document.documentElement) document.documentElement.scrollTop = 0;
              if (document.body) document.body.scrollTop = 0;
            }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-teal px-8 h-[52px] text-sm font-bold text-ivory shadow-[0_14px_36px_-12px_rgba(17,75,68,0.55)] transition-all duration-300 hover:bg-teal-deep hover:shadow-[0_20px_44px_-12px_rgba(10,53,48,0.7)] hover:-translate-y-0.5"
          >
            <BookOpen className="h-4 w-4 text-gold-light" aria-hidden />
            <span>View All Blogs &amp; Guides</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
          <p className="text-xs text-muted-foreground">
            Written &amp; clinically reviewed by specialist orthodontist Dr. Siddharth Phadkule
          </p>
        </Reveal>
      </div>
    </section>
  );
}
