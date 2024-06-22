import { legalH1CSS, legalMainDivCSS, legalH2CSS, legalPCSS } from '@/CommonCSS'
import Link from 'next/link'
import React from 'react'

const PrivacyPolicyPage = () => {
    return (
        <section className={`${legalMainDivCSS}`}>
            <h1 className={`${legalH1CSS}`}>Privacy Policy</h1>

            <section className="mt-6 mb-6">
                <h2 className={`${legalH2CSS}`}>Introduction:</h2>
                <p className={`${legalPCSS}`}>
                    Welcome to ShaveLinks Privacy Policy. This document outlines how we collect, use, and protect your information when you use our website or avail our services. By engaging with us, you agree to the terms laid out in this policy.
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
                    If you have any questions or concerns about our Privacy Policy, Terms and Conditions, or Return/Refund Policy, please <Link href="/contact-us" className="text-primary-6 underline">contact us</Link>. This information is provided to ensure transparency and trust between ShaveLinks and its clients.
                </p>
            </section>
        </section>
    )
}

export default PrivacyPolicyPage
