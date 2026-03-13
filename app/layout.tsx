import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Spotlight } from "@/components/ui/spotlight";
import CookieConsent from "@/components/ui/cookie-consent";
import AnalyticsScripts from "@/components/ui/analytics-scripts";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
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
  logo: "https://amplitude.ventures/logo-main.png",
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
    "https://www.linkedin.com/company/amplitudeventures/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: [
              "try{",
              "if(localStorage.getItem('av-theme')==='dark')",
              "document.documentElement.classList.add('dark');",
              "document.documentElement.classList.add('no-transition');",
              "requestAnimationFrame(function(){requestAnimationFrame(function(){",
              "document.documentElement.classList.remove('no-transition')",
              "})})",
              "}catch(e){}",
            ].join(""),
          }}
        />

        {/* Security meta tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${bebas.variable} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider>
          <Spotlight size={700} />
          {children}
          <CookieConsent />
          <AnalyticsScripts />
        </ThemeProvider>
      </body>
    </html>
  );
}
