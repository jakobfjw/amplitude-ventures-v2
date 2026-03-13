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
              "var t=localStorage.getItem('av-theme');",
              "var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;",
              "if(d)document.documentElement.classList.add('dark');",
              "document.documentElement.classList.add('no-transition');",
              "requestAnimationFrame(function(){requestAnimationFrame(function(){",
              "document.documentElement.classList.remove('no-transition')",
              "})})",
              "}catch(e){}",
            ].join(""),
          }}
        />

        {/* Google Tag Manager — as high in <head> as possible
         * The dangerouslySetInnerHTML below is SAFE: it contains only a
         * hardcoded, developer-controlled GTM installation snippet with
         * a static container ID. No user input is interpolated.
         */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MTT6BHBQ');`,
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
        {/* Google Tag Manager (noscript) — must be immediately after <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MTT6BHBQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
