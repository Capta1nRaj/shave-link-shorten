import { Metadata } from "next";
import ContactUsPageContent from "./ContactUsPageContent";

export const metadata: Metadata = {
    title: "Contact Us for Support & Assistance",
    description: "Reach ShaveLinks for help or information. Fill out our contact form to connect with our support team and receive prompt assistance.",
    keywords: "contact support, customer service, inquiries, assistance, help center, support team, get in touch, contact form, feedback",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/contact-us',
    }
};

export default async function ContactUsPage() {
    return (
        <div>
            <ContactUsPageContent />
        </div>
    )
}