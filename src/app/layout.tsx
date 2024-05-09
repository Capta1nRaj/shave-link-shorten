import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import NavBarLayout from "@/layouts/NavBarLayout";
import FooterLayout from "@/layouts/FooterLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}`),
  title: {
    default: "Shave - Short Your Links",
    template: "%s - Shave - Short Your Links"
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
        <NavBarLayout />
        {children}
        <FooterLayout />
        <GoogleAnalytics gaId={`G-R5X8FW71Y1`} />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
      </body>
    </html>
  );
}
