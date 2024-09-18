import FooterLayout from '@/layouts/FooterLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import { legalMainDivCSS, legalH1CSS, legalH2CSS, legalPCSS } from '@/misc/CommonCSS';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Fast and Reliable Shipping Policy",
    description: "Review ShaveLinks Shipping and Return Policy. Understand our digital service delivery, exchange and cancellation policies, and pricing terms.",
    keywords: "shipping policy, return policy, shaveLinks, digital services, service access, exchange policy, cancellation policy, pricing policy",
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
            <main className='bg-custom-dark'>
                <section className={`${legalMainDivCSS}`}>
                    <h1 className={`${legalH1CSS}`}>Shipping and Return Policy</h1>

                    <section className="mt-6 mb-6">
                        <h2 className={`${legalH2CSS}`}>Digital Services:</h2>
                        <p className={`${legalPCSS}`}>
                            As a provider of digital services, there is no physical shipping involved. Our services, including link shortening and data tracking, are delivered and accessed online in real-time, subject to our terms and conditions.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Service Access:</h2>
                        <p className={`${legalPCSS}`}>
                            Our services are accessible immediately upon purchasing a tiered plan or starting with a free plan. There are no physical products or shipments involved.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Exchange and Cancellation Policy:</h2>
                        <p className={`${legalPCSS}`}>
                            Due to the nature of digital services, exchanges are not applicable. Once a service is purchased, it cannot be exchanged or canceled. If you have concerns about the service, please <Link href="/contact-us" className="text-custom-crimson underline">contact us</Link>, and we will work with you to address any issues.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Pricing Policy:</h2>
                        <p className={`${legalPCSS}`}>
                            <span className="text-custom-blue font-semibold">ShaveLinks</span> reserves the right to change pricing for our services at any time. However, any pricing changes will not affect your current monthly or annual subscription plan until the end of your current billing cycle.
                        </p>
                    </section>

                    <section>
                        <h2 className={`${legalH2CSS}`}>Additional Information:</h2>
                        <p className={`${legalPCSS}`}>
                            <strong>Return Policy:</strong> Given the nature of our services, returns are not applicable. No returns will be accepted under any circumstances. If you encounter any issues with our services, please <Link href="/contact-us" className="text-custom-crimson underline">contact us</Link>, and we will address your concerns.
                        </p>
                        <p className="text-custom-white mt-2">
                            <strong>Refund Policy:</strong> Once payment is completed, no refunds will be provided. If you believe you are eligible for a refund, please contact our customer support team to discuss the situation.
                        </p>
                        <p className="text-custom-white mt-2">
                            For any questions or concerns regarding our Shipping and Return Policy, please <Link href="/contact-us" className="text-custom-crimson underline">contact us</Link>. We appreciate your business and strive to provide exceptional service.
                        </p>
                    </section>
                </section>
            </main>
            <FooterLayout />
        </>
    );
};
