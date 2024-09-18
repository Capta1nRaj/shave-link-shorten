import { Metadata } from "next";
import ContactUsPageContent from "./ContactUsPageContent";

export const metadata: Metadata = {
    title: "Contact Us and Get in Touch with us Today",
    description: "Reach ShaveLinks for any help or information if you need. Fill our contact form to get in touch with our support team and receive prompt assistance.",
    keywords: "contact us, shaveLinks, support, inquiries, customer service, help",
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