import FooterLayout from '@/layouts/FooterLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Fast and Reliable Shipping Policy",
    description: "Review ShaveLinks shipping policy. Understand our digital service delivery, exchange policies, cancellations, and pricing terms.",
    keywords: "shipping policy, digital delivery, exchange terms, service access, cancellation policy, delivery guidelines, pricing terms, digital products, service availability",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/shipping-and-return-policy',
    }
};

export default function ShippingAndReturnPolicyPage() {
    return (
        <>
            <NavBarLayout />
            <main className="bg-custom-dark min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue bg-clip-text text-transparent">
                            Shipping and Return Policy
                        </h1>
                        <div className="mt-4 flex justify-center">
                            <div className="h-1 w-24 bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue rounded-full"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-12">
                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Digital Services</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                As a provider of digital services, there is no physical shipping involved. Our services, including link shortening and data tracking, are delivered and accessed online in real-time, subject to our terms and conditions.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Service Access</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Our services are accessible immediately upon purchasing a tiered plan or starting with a free plan. There are no physical products or shipments involved.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Exchange and Cancellation Policy</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Due to the nature of digital services, exchanges are not applicable. Once a service is purchased, it cannot be exchanged or canceled. If you have concerns about the service, please{' '}
                                <Link href="/contact-us" className="text-custom-crimson hover:text-custom-crimson/80 font-semibold transition-colors duration-200">
                                    contact us
                                </Link>
                                , and we will work with you to address any issues.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Pricing Policy</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                <span className="text-custom-blue font-semibold">ShaveLinks</span> reserves the right to change pricing for our services at any time. However, any pricing changes will not affect your current monthly or annual subscription plan until the end of your current billing cycle.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Return Policy</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Given the nature of our services, returns are not applicable. No returns will be accepted under any circumstances. If you encounter any issues with our services, please{' '}
                                <Link href="/contact-us" className="text-custom-crimson hover:text-custom-crimson/80 font-semibold transition-colors duration-200">
                                    contact us
                                </Link>
                                , and we will address your concerns.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Refund Policy</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                Once payment is completed, no refunds will be provided. If you believe you are eligible for a refund, please contact our customer support team to discuss the situation.
                            </p>
                        </section>

                        <section className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                            <h2 className="text-2xl font-semibold text-custom-blue mb-4">Contact Information</h2>
                            <p className="text-custom-white/90 leading-relaxed">
                                For any questions or concerns regarding our Shipping and Return Policy, please{' '}
                                <Link href="/contact-us" className="text-custom-crimson hover:text-custom-crimson/80 font-semibold transition-colors duration-200">
                                    contact us
                                </Link>
                                . We appreciate your business and strive to provide exceptional service.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <FooterLayout />
        </>
    );
}
