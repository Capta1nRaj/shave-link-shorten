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
    default: "Shave - Short Your Links",
    template: ""
  },
  description: "Shorten URLs effortlessly for seamless sharing across all platforms with ease.",
  keywords: "url shortener, link manager, social media, web trimming, digital platform, streamlined, accessibility, customized, concise, efficient",
  twitter: {
    card: "summary_large_image"
  },
  openGraph: {
    images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/CompanyLogo1.png',
  },
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
