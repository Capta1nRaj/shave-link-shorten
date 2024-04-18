import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}`),
  title: {
    default: "Shave - Short You Links",
    template: "%s - Shave - Short You Links"
  },
  description: "Shorten URLs effortlessly for seamless sharing across all platforms with ease.",
  keywords: "url shortener, link manager, social media, web trimming, digital platform, streamlined, accessibility, customized, concise, efficient",
  twitter: {
    card: "summary_large_image"
  },
  openGraph: {
    images: './opengraph-image.png',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId={`G-R5X8FW71Y1`} />
      </body>
    </html>
  );
}
