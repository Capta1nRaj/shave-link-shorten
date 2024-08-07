import { legalH1CSS, legalMainDivCSS, legalH2CSS, legalPCSS } from '@/CommonCSS';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Transparent Terms and Conditions",
    description: "Review the terms and conditions of using ShaveLinks. Understand our service engagement policies, intellectual property rights, and limitation of liability.",
    keywords: "terms and conditions, shaveLinks, service engagement, intellectual property, limitation of liability, governing law, contact us",
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

const TermsAndConditionsPage = () => {
    return (
        <section className={`${legalMainDivCSS}`}>
            <h1 className={`${legalH1CSS}`}>Terms and Conditions</h1>

            <section className="mt-6 mb-6">
                <h2 className={`${legalH2CSS}`}>Acceptance of Terms:</h2>
                <p className={`${legalPCSS}`}>
                    By accessing or using our website and services, you agree to comply with and be bound by the terms and conditions outlined below. If you do not agree with any part of these terms, we kindly ask that you refrain from using our website.
                </p>
            </section>

            <section className="mb-6">
                <h2 className={`${legalH2CSS}`}>Intellectual Property:</h2>
                <p className={`${legalPCSS}`}>
                    All content and materials available on our website are the intellectual property of ShaveLinks. You may not use, modify, reproduce, or distribute any content without our written permission.
                </p>
            </section>

            <section className="mb-6">
                <h2 className={`${legalH2CSS}`}>Service Engagement:</h2>
                <p className={`${legalPCSS}`}>
                    When you engage our services, specific terms and conditions will be provided, outlining the scope of work, timelines, and payment details.
                </p>
            </section>

            <section className="mb-6">
                <h2 className={`${legalH2CSS}`}>Limitation of Liability:</h2>
                <p className={`${legalPCSS}`}>
                    ShaveLinks is not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our services.
                </p>
            </section>

            <section className='mb-6'>
                <h2 className={`${legalH2CSS}`}>Governing Law:</h2>
                <p className={`${legalPCSS}`}>
                    These terms and conditions are governed by and construed in accordance with the laws of India.
                </p>
            </section>

            <section>
                <h2 className={`${legalH2CSS}`}>Contact Us:</h2>
                <p className={`${legalPCSS}`}>
                    If you have any questions or concerns about our Privacy Policy, Terms and Conditions, or Return/Refund Policy, please <Link href="/contact-us" className="text-primary-6 underline">contact us</Link>. This information is provided to ensure transparency and trust between ShaveLinks and its clients.
                </p>
            </section>
        </section>
    );
};

export default TermsAndConditionsPage;
