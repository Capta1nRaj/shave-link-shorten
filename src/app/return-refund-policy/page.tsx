import { legalH1CSS, legalMainDivCSS, legalH2CSS, legalPCSS } from '@/CommonCSS'
import Link from 'next/link'
import React from 'react'

const ReturnRefundPolicyPage = () => {
    return (
        <section className={`${legalMainDivCSS}`}>
            <h1 className={`${legalH1CSS}`}>Return/Refund Policy</h1>

            <section className="mt-6 mb-6">
                <h2 className={`${legalH2CSS}`}>Service-Based Nature:</h2>
                <p className={`${legalPCSS}`}>
                    As a link shortener service with tiered plans, ShaveLinks offers digital services rather than physical products. Therefore, our services are non-refundable. We work closely with clients to ensure their satisfaction and address any concerns during the project.
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
                    ShaveLinks reserves the right to modify or discontinue services, temporarily or permanently, with or without notice.
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

export default ReturnRefundPolicyPage
