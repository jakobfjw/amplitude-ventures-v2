import type { Metadata } from "next";
import { Bebas_Neue, Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import { Spotlight } from "@/components/ui/spotlight";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amplitude.ventures"),
  title: {
    default: "Amplitude Ventures — Venture Studio",
    template: "%s — Amplitude Ventures",
  },
  description:
    "Pre-seed venture studio based in Stavanger, Norway. We co-build with founders from first idea to investor-ready company — technology, validation, and fundraising storytelling. No deck required to start.",
  keywords: [
    "venture studio",
    "pre-seed investor",
    "startup co-builder",
    "early-stage VC",
    "Norway startup",
    "Stavanger startup",
    "fundraising support",
    "MVP development",
    "founder support",
    "Amplitude Ventures",
  ],
  authors: [{ name: "Amplitude Ventures", url: "https://amplitude.ventures" }],
  creator: "Amplitude Ventures",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amplitude.ventures",
    siteName: "Amplitude Ventures",
    title: "Amplitude Ventures — Venture Studio",
    description:
      "Pre-seed venture studio. We co-build with founders from first idea to investor-ready company — technology, validation, and fundraising storytelling.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amplitude Ventures — Venture Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplitude Ventures — Venture Studio",
    description:
      "Pre-seed venture studio. We co-build with founders from first idea to investor-ready company.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://amplitude.ventures",
  },
};

// JSON-LD Organisation schema — feeds AI answer engines (Perplexity, ChatGPT, Google SGE)
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Amplitude Ventures",
  url: "https://amplitude.ventures",
  logo: "https://amplitude.ventures/logo.png",
  description:
    "Pre-seed venture studio based in Stavanger, Norway. We co-build with founders from first idea to investor-ready company.",
  foundingLocation: {
    "@type": "Place",
    name: "Stavanger, Norway",
  },
  areaServed: "Global",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 70,
  },
  sameAs: [
    "https://www.linkedin.com/company/amplitude-ventures",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${bebas.variable} ${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        <Spotlight size={700} />
        {children}
      </body>
    </html>
  );
}
