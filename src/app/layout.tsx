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
    default: "Shave - Short Your Links with Worldwide Tracking Analytics",
    template: ""
  },
  description: "Effortlessly shorten links with our URL shortener. Access free, advanced analytics, customized features, and efficient link management for streamlined digital platform integration and global tracking.",
  keywords: "links, features, free ,analytics, pricing, url shortener, link manager, social media, web trimming, digital platform, streamlined, accessibility, customized, concise, efficient",
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
