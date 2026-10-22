import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { BlogListing } from "@/components/blog/blog-listing";

const siteUrl = "https://laturdentalclinic.com";

export const metadata: Metadata = {
  title: "Dental Blogs & Orthodontic Guides | Latur Dental Clinic",
  description:
    "Explore educational dental and orthodontic articles on braces types, clear aligners, self-ligating brackets, and first braces visits by Dr. Siddharth Phadkule (MDS Orthodontics).",
  keywords: [
    "dental blog Latur",
    "orthodontic guides",
    "types of braces",
    "clear aligners Latur",
    "traditional vs self ligating braces",
    "first braces appointment",
    "braces treatment in Latur",
    "Dr. Siddharth Phadkule",
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Dental Blogs & Orthodontic Guides | Latur Dental Clinic",
    description:
      "Expert orthodontic guides and dental advice from Latur Dental Clinic & Orthodontic Centre. Learn about braces, aligners, and dental health.",
    url: `${siteUrl}/blog`,
    siteName: "Latur Dental Clinic & Orthodontic Centre",
    images: [
      {
        url: `${siteUrl}/images/blog/types-of-braces-guide.jpg`,
        width: 1200,
        height: 675,
        alt: "Dental Blogs and Orthodontic Guides - Latur Dental Clinic",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Blogs & Orthodontic Guides | Latur Dental Clinic",
    description:
      "Expert orthodontic guides and dental advice from Dr. Siddharth Phadkule at Latur Dental Clinic & Orthodontic Centre.",
    images: [`${siteUrl}/images/blog/types-of-braces-guide.jpg`],
  },
};

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
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28">
        <BlogListing />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
