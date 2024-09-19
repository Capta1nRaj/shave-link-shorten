import FooterLayout from '@/layouts/FooterLayout';
import NavBarLayout from '@/layouts/NavBarLayout';
import { legalMainDivCSS, legalH1CSS, legalH2CSS, legalPCSS } from '@/misc/CommonCSS';
import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: "Return & Refund Policy Details",
    description: "Learn about ShaveLinks return and refund policy for digital services, including guidelines on cancellations and non-refundable services.",
    keywords: "refund policy, returns, digital services, cancellation guidelines, service terms, refund eligibility, non-refundable services, policy details, customer rights",
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
            <main className='bg-custom-dark'>
                <section className={`${legalMainDivCSS}`}>
                    <h1 className={`${legalH1CSS}`}>Return/Refund Policy</h1>

                    <section className="mt-6 mb-6">
                        <h2 className={`${legalH2CSS}`}>Service-Based Nature:</h2>
                        <p className={`${legalPCSS}`}>
                            As a link shortener service with tiered plans, <span className="text-custom-blue font-semibold">ShaveLinks</span> offers digital services rather than physical products. Therefore, our services are non-refundable. We work closely with clients to ensure their satisfaction and address any concerns during the project.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Cancellation Policy:</h2>
                        <p className={`${legalPCSS}`}>
                            Once a client has purchased a plan and payment has been completed, the subscription cannot be canceled, and no refunds will be provided.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className={`${legalH2CSS}`}>Modification of Services:</h2>
                        <p className={`${legalPCSS}`}>
                            <span className="text-custom-blue font-semibold">ShaveLinks</span> reserves the right to modify or discontinue services, temporarily or permanently, with or without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className={`${legalH2CSS}`}>Contact Us:</h2>
                        <p className={`${legalPCSS}`}>
                            If you have any questions or concerns about our Privacy Policy, Terms and Conditions, or Return/Refund Policy, please <Link href="/contact-us" className="text-custom-crimson underline">contact us</Link>. This information is provided to ensure transparency and trust between <span className="text-custom-blue font-semibold">ShaveLinks</span> and its clients.
                        </p>
                    </section>
                </section>
            </main>
            <FooterLayout />
        </>
    )
}
