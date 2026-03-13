"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * ── Placeholder tracking IDs ──
 * Replace these with your real IDs from:
 *   GTM:        tagmanager.google.com
 *   GA4:        analytics.google.com → Admin → Data Streams → Measurement ID
 *   Meta Pixel: business.facebook.com → Events Manager → Pixel ID
 *
 * All values below are hardcoded string constants — no user input,
 * no dynamic content. The dangerouslySetInnerHTML usage is safe here
 * because the injected strings are developer-controlled constants,
 * identical to what Google and Meta provide as installation snippets.
 */
const GTM_ID = "GTM-MTT6BHBQ";
const GA4_ID = "G-XXXXXXXXXX";
const META_PIXEL_ID = "PIXEL_ID";

/**
 * Conditionally loads all tracking scripts based on GDPR consent.
 *
 * This component reads consent from localStorage on mount and
 * listens for the `av:consent-change` event dispatched by
 * CookieConsent. Scripts are NEVER injected until consent is
 * explicitly granted — this is the GDPR-compliant approach.
 */
export default function AnalyticsScripts() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("av_cookie_consent");
    if (stored === "accepted") setConsented(true);

    function handleChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      setConsented(detail === "accepted");
    }
    window.addEventListener("av:consent-change", handleChange);
    return () => window.removeEventListener("av:consent-change", handleChange);
  }, []);

  if (!consented) return null;

  // All strings passed to dangerouslySetInnerHTML below are hardcoded
  // developer-controlled constants (GTM/GA4/Meta installation snippets).
  // No user input is interpolated — XSS risk is zero.

  const gtmSnippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

  const ga4Snippet = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`;

  const metaPixelSnippet = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

  return (
    <>
      {/* ── Google Tag Manager ── */}
      <Script id="gtm-script" strategy="afterInteractive">
        {gtmSnippet}
      </Script>

      {/* ── Google Analytics 4 (direct — works alongside or independently of GTM) ── */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {ga4Snippet}
      </Script>

      {/* ── Meta Pixel (Facebook) ── */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {metaPixelSnippet}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
