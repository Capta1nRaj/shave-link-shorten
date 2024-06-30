import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavBarLayout from "@/layouts/NavBarLayout";
import FooterLayout from "@/layouts/FooterLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllInOneAnalytics } from "@/analytics/AllInOneAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}`),
  title: {
    default: "ShaveLinks - Shorten and Track Links Easily",
    template: ""
  },
  description: "Shorten links with ease using our URL shortener. Access free, advanced analytics, custom features, and efficient link management for global tracking.",
  keywords: "links, features, free, analytics, pricing, URL shortener, link manager, social media, web trimming, digital platform, streamlined, accessibility, customized, concise, efficient, shave links, custom short links, link tracking, global tracking, advanced analytics",
  twitter: {
    card: "summary_large_image"
  },
  openGraph: {
    images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
  },
  alternates: {
    canonical: './',
  }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarLayout />
        {children}
        <FooterLayout />
        <AllInOneAnalytics />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
      </body>
    </html>
  );
}
