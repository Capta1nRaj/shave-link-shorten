import FooterLayout from '@/layouts/FooterLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Return and Refund Policy - ShaveLinks",
    description: "Learn about our return and refund policies. Understand your rights and our procedures for handling returns and refunds for our services.",
    keywords: "return policy, refund policy, money back guarantee, service refund, return process, refund process, customer refund, service return",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/return-refund-policy',
    }
};

export default function ReturnRefundPolicyPage() {
    return (
        <>
            <NavBarLayout />
            <main className="bg-custom-dark min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue bg-clip-text text-transparent">
                            Return and Refund Policy
                        </h1>
                        <div className="mt-4 flex justify-center">
                            <div className="h-1 w-24 bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue rounded-full"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-12">
                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Overview</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                At <span className="text-custom-blue font-semibold">ShaveLinks</span>, we strive to ensure complete satisfaction with our services. This policy outlines our procedures for returns and refunds.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Eligibility for Refunds</h2>
                            <div className="text-custom-white/90 leading-relaxed">
                                Refunds may be issued in the following circumstances:
                                <ul className="list-disc list-inside mt-2 space-y-2">
                                    <li>Service not delivered as promised</li>
                                    <li>Technical issues preventing service usage</li>
                                    <li>Duplicate charges or billing errors</li>
                                    <li>Service cancellation within the cooling-off period</li>
                                </ul>
                            </div>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Refund Process</h2>
                            <div className="text-custom-white/90 leading-relaxed">
                                To request a refund:
                                <ol className="list-decimal list-inside mt-2 space-y-2">
                                    <li>Contact our support team within 7 days of purchase</li>
                                    <li>Provide your order details and reason for refund</li>
                                    <li>Allow 5-7 business days for review</li>
                                    <li>If approved, refund will be processed to original payment method</li>
                                </ol>
                            </div>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Non-Refundable Items</h2>
                            <div className="text-custom-white/90 leading-relaxed">
                                The following are not eligible for refunds:
                                <ul className="list-disc list-inside mt-2 space-y-2">
                                    <li>Services already used or consumed</li>
                                    <li>Custom or personalized services</li>
                                    <li>Services purchased during promotional periods</li>
                                </ul>
                            </div>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Processing Time</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Refunds are typically processed within 7-10 business days after approval. The time it takes for the refund to appear in your account may vary depending on your payment provider.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Contact Us</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                If you have any questions about our Return and Refund Policy, please{' '}
                                <Link href="/contact-us" className="text-custom-crimson hover:text-custom-crimson/80 font-semibold transition-colors duration-200">
                                    contact us
                                </Link>
                                . Our support team is here to assist you with any concerns.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <FooterLayout />
        </>
    );
}
