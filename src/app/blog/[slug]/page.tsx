import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { BlogPostView } from "@/components/blog/blog-post-view";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog-data";

const siteUrl = "https://laturdentalclinic.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Latur Dental Clinic",
    };
  }

  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const fullCoverImageUrl = `${siteUrl}${post.coverImage}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: articleUrl,
      siteName: "Latur Dental Clinic & Orthodontic Centre",
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      images: [
        {
          url: fullCoverImageUrl,
          width: 1200,
          height: 675,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [fullCoverImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug);
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const fullCoverImageUrl = `${siteUrl}${post.coverImage}`;

  // Article / BlogPosting Schema
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [fullCoverImageUrl],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${siteUrl}/#doctors`,
    },
    publisher: {
      "@type": "Dentist",
      name: "Latur Dental Clinic & Orthodontic Centre",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-emblem.png`,
      },
    },
  };

  // BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  // FAQPage Schema
  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink overflow-x-clip">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28">
        <BlogPostView post={post} relatedPosts={relatedPosts} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
