import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import telegramUrls from "./telegram-urls.json"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jess ❤️ — Disponibile Ora",
  description: "Connettiti con me su Telegram. Online e in cerca di un compagno per contenuti vicino a te.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1558886002425046');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1558886002425046&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* 1) Choose random Instagram target URL */}
        <Script id="ig-url-picker" strategy="beforeInteractive">
          {`
            (function () {
              const urls = ${JSON.stringify(telegramUrls)};
              window.TGTRACKER_TARGET_URL = urls[Math.floor(Math.random() * urls.length)];
            })();
          `}
        </Script>

        {/* 2) TG Tracker button script */}
        <Script
          id="tgtrc-script"
          src="https://dash.tgtracker.io/api/v2/button-script.js"
          data-target-url=""
          data-target-fbp="1558886002425046"
          strategy="afterInteractive"
        />

        {/* 3) Set the data-target-url attribute after script loads */}
        <Script id="tg-url-setter" strategy="afterInteractive">
          {`
            (function () {
              const el = document.getElementById("tgtrc-script");
              if (el && window.TGTRACKER_TARGET_URL) {
                el.setAttribute("data-target-url", window.TGTRACKER_TARGET_URL);
              }
            })();
          `}
        </Script>

        <Script id="fb-contact-on-button-click" strategy="afterInteractive">
          {`
            (function () {
              const bindContactTracking = function () {
                const button = document.getElementById("tgtrc-button");
                if (!button || button.dataset.fbContactBound === "true") return;

                button.dataset.fbContactBound = "true";
                button.addEventListener("click", function () {
                  if (typeof window.fbq === "function") {
                    window.fbq("track", "Contact");
                  }
                });
              };

              if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", bindContactTracking);
              } else {
                bindContactTracking();
              }
            })();
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
