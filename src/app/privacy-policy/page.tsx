import FooterLayout from '@/layouts/FooterLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Our Commitment to Protecting Your Data",
    description: "How ShaveLinks collects, uses, and protects user information. Read our Privacy Policy to know more about data security and privacy practices.",
    keywords: "privacy policy, data security, information use, user privacy, data collection, cookies policy, data protection, personal information, security practices",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/privacy-policy',
    }
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <NavBarLayout />
            <main className="bg-custom-dark min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <div className="mt-4 flex justify-center">
                            <div className="h-1 w-24 bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue rounded-full"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-12">
                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Introduction</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Welcome to <span className="text-custom-blue font-semibold">ShaveLinks</span> Privacy Policy. This document outlines how we collect, use, and protect your information when you use our website or avail our services. By engaging with us, you agree to the terms laid out in this policy.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Information We Collect</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                We collect personal and non-personal information to provide our link shortening services effectively. This includes, but is not limited to, your name, contact details, and usage data. We do not collect sensitive personal information without your explicit consent.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">How We Use Your Information</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                The information collected is used to understand your needs and provide you with better services. We may also use it for internal record keeping and to improve our products and services. Your information is never shared with third parties without your consent.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Security Measures</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                We are committed to ensuring that your information is secure. We have implemented physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Cookies</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Our website may use cookies to enhance your browsing experience. These cookies do not give us access to your computer or any personal information about you.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Changes to Privacy Policy</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                We may update this policy from time to time, and any changes will be reflected on this page. It is advised to check this page periodically to ensure you are comfortable with the modifications.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Contact Us</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                If you have any questions or concerns about our Privacy Policy, Terms and Conditions, or Return/Refund Policy, please{' '}
                                <Link href="/contact-us" className="text-custom-crimson hover:text-custom-crimson/80 font-semibold transition-colors duration-200">
                                    contact us
                                </Link>
                                . This information is provided to ensure transparency and trust between{' '}
                                <span className="text-custom-blue font-semibold">ShaveLinks</span> and its clients.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <FooterLayout />
        </>
    );
}

