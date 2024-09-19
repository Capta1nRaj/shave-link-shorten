import FooterLayout from '@/layouts/FooterLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import { legalH1CSS, legalMainDivCSS, legalH2CSS, legalPCSS } from '@/misc/CommonCSS'
import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'

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
            <main className='bg-custom-dark'>
                <section className={`${legalMainDivCSS}`}>
                    <h1 className={`${legalH1CSS}`}>Privacy Policy</h1>

                    <section className="mt-6 mb-6">
                        <h2 className={`${legalH2CSS}`}>Introduction:</h2>
                        <p className={`${legalPCSS}`}>
                            Welcome to <span className="text-custom-blue font-semibold">ShaveLinks</span> Privacy Policy. This document outlines how we collect, use, and protect your information when you use our website or avail our services. By engaging with us, you agree to the terms laid out in this policy.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Information We Collect:</h2>
                        <p className={`${legalPCSS}`}>
                            We collect personal and non-personal information to provide our link shortening services effectively. This includes, but is not limited to, your name, contact details, and usage data. We do not collect sensitive personal information without your explicit consent.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>How We Use Your Information:</h2>
                        <p className={`${legalPCSS}`}>
                            The information collected is used to understand your needs and provide you with better services. We may also use it for internal record keeping and to improve our products and services. Your information is never shared with third parties without your consent.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Security Measures:</h2>
                        <p className={`${legalPCSS}`}>
                            We are committed to ensuring that your information is secure. We have implemented physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Cookies:</h2>
                        <p className={`${legalPCSS}`}>
                            Our website may use cookies to enhance your browsing experience. These cookies do not give us access to your computer or any personal information about you.
                        </p>
                    </section>

                    <section className='mb-6'>
                        <h2 className={`${legalH2CSS}`}>Changes to Privacy Policy:</h2>
                        <p className={`${legalPCSS}`}>
                            We may update this policy from time to time, and any changes will be reflected on this page. It is advised to check this page periodically to ensure you are comfortable with the modifications.
                        </p>
                    </section>

                    <section>
                        <h2 className={`${legalH2CSS}`}>Contact Us:</h2>
                        <p className={`${legalPCSS}`}>
                            If you have any questions or concerns about our Privacy Policy, Terms and Conditions, or Return/Refund Policy, please <Link href="/contact-us" className="text-custom-crimson underline font-semibold">contact us</Link>. This information is provided to ensure transparency and trust between <span className="text-custom-blue font-semibold">ShaveLinks</span> and its clients.
                        </p>
                    </section>
                </section>
            </main>
            <FooterLayout />
        </>
    )
}

