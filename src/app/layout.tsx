import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteUrl = "https://laturdentalclinic.com";

export const metadata: Metadata = {
  title: "Latur Dental Clinic & Orthodontic Centre | Best Dentist in Latur",
  description:
    "Premium dental care in Latur with 15+ years of excellence. Braces, clear aligners, implants, smile makeovers & painless treatments by Dr. Siddharth Phadkule (MDS Orthodontics). 10,000+ happy patients.",
  keywords: [
    "dentist in Latur",
    "Latur Dental Clinic",
    "orthodontist Latur",
    "braces Latur",
    "clear aligners Latur",
    "dental implants Latur",
    "smile makeover Latur",
    "Dr. Phadkule",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Latur Dental Clinic & Orthodontic Centre",
    description:
      "Expert dental care in Latur. Smile with complete confidence — braces, aligners, implants & painless dentistry.",
    url: siteUrl,
    siteName: "Latur Dental Clinic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latur Dental Clinic & Orthodontic Centre",
    description: "Expert dental care in Latur. Smile with complete confidence.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A3530",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Latur Dental Clinic & Orthodontic Centre",
  url: siteUrl,
  telephone: "+91 94043 30627",
  email: "info@laturdentalclinic.com",
  priceRange: "₹₹",
  logo: `${siteUrl}/logo-emblem.png`,
  image: [`${siteUrl}/logo-full.png`, `${siteUrl}/images/hero-clinic.jpg`],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lokhand Galli, Ganj Golai",
    addressLocality: "Latur",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 18.4036, longitude: 76.5611 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "480" },
  founder: {
    "@type": "Person",
    name: "Dr. Siddharth Phadkule",
    jobTitle: "Orthodontist & Aligners Specialist",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${manrope.variable} antialiased bg-background text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
