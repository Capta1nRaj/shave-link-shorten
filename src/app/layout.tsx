import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from '@/misc/Fonts'
import { Toaster } from "sonner";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}`),
  title: {
    default: "ShaveLinks URL Shortener - Shorten Links, Boost Engagement",
    template: "ShaveLinks - %s"
  },
  description: "Streamline your online presence with ShaveLinks: a powerful URL shortener with free analytics, custom features, and more to boost your business.",
  keywords: "shavelinks, url shortener, link management, analytics, custom features, free, social media, engagement, business growth",
  twitter: {
    card: "summary_large_image"
  },
  openGraph: {
    images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
  },
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      //! Android Icons
      { rel: "icon", type: "image/png", sizes: "36x36", url: "/favicon/android-icon-36x36.png", },
      { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon/android-icon-48x48.png", },
      { rel: "icon", type: "image/png", sizes: "72x72", url: "/favicon/android-icon-72x72.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/android-icon-96x96.png", },
      { rel: "icon", type: "image/png", sizes: "144x144", url: "/favicon/android-icon-144x144.png", },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/favicon/android-icon-192x192.png", },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/favicon/android-icon-512x512.png", },

      //! Apple Icons
      { rel: "apple-touch-icon", type: "image/ico", url: "/favicon/apple-icon.png", },
      { rel: "apple-touch-icon", sizes: "57x57", url: "/favicon/apple-icon-57x57.png", },
      { rel: "apple-touch-icon", sizes: "60x60", url: "/favicon/apple-icon-60x60.png", },
      { rel: "apple-touch-icon", sizes: "72x72", url: "/favicon/apple-icon-72x72.png", },
      { rel: "apple-touch-icon", sizes: "76x76", url: "/favicon/apple-icon-76x76.png", },
      { rel: "apple-touch-icon", sizes: "114x114", url: "/favicon/apple-icon-114x114.png", },
      { rel: "apple-touch-icon", sizes: "120x120", url: "/favicon/apple-icon-120x120.png", },
      { rel: "apple-touch-icon", sizes: "144x144", url: "/favicon/apple-icon-144x144.png", },
      { rel: "apple-touch-icon", sizes: "152x152", url: "/favicon/apple-icon-152x152.png", },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon/apple-icon-180x180.png", },

      //! Favion Icons
      { rel: "icon", type: "image/ico", url: "/favicon/favicon.ico", },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png", },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/favicon-96x96.png", },
    ],

    //! Other Icons
    other: [{ rel: 'apple-touch-icon-precomposed', url: '/favicon/apple-icon-precomposed.png', },],
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`} />
      <Toaster position="top-right" expand={true} richColors />
      <body className={`${montserrat.className}`}>

        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`}
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}>
          </iframe>
        </noscript>

        {children}
      </body>
    </html>
  );
}
