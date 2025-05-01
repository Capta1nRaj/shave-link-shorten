import FooterLayout from '@/layouts/FooterLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Terms and Conditions - ShaveLinks",
    description: "Read our Terms and Conditions to understand the rules, guidelines, and legal agreements between you and ShaveLinks for using our services.",
    keywords: "terms and conditions, user agreement, service terms, legal terms, usage guidelines, service agreement, terms of use",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/terms-and-conditions',
    }
};

export default function TermsAndConditionsPage() {
    return (
        <>
            <NavBarLayout />
            <main className="bg-custom-dark min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue bg-clip-text text-transparent">
                            Terms and Conditions
                        </h1>
                        <div className="mt-4 flex justify-center">
                            <div className="h-1 w-24 bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue rounded-full"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-12">
                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Agreement to Terms</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                By accessing and using <span className="text-custom-blue font-semibold">ShaveLinks</span>, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Use License</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Permission is granted to temporarily use our link shortening services for personal, non-commercial purposes. This license does not include the right to modify, copy, or distribute our services without explicit permission.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">User Responsibilities</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to use our services only for lawful purposes and in accordance with these terms.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Intellectual Property</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                All content, features, and functionality of our services are owned by <span className="text-custom-blue font-semibold">ShaveLinks</span> and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Limitation of Liability</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                In no event shall <span className="text-custom-blue font-semibold">ShaveLinks</span> be liable for any damages arising out of the use or inability to use our services, even if we have been notified of the possibility of such damages.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Changes to Terms</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of these terms. Your continued use of our services after such modifications constitutes your acceptance of the new terms.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Contact Information</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                If you have any questions about these Terms and Conditions, please{' '}
                                <Link href="/contact-us" className="text-custom-crimson hover:text-custom-crimson/80 font-semibold transition-colors duration-200">
                                    contact us
                                </Link>
                                . We are here to help clarify any concerns you may have.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <FooterLayout />
        </>
    );
}