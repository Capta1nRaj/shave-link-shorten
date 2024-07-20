import { Metadata } from "next";
import PricingPageContent from "./PricingPageContent";

export const metadata: Metadata = {
    title: "Compare pricing plans",
    description: "Explore ShaveLinks pricing plans and compare features. Choose the plan that best suits your business needs. Transparent fees and total flexibility.",
    keywords: "pricing, compare plans, ShaveLinks, business plans, features, transparent fees, flexible plans",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        title: 'ShaveLinks - Pricing Plans',
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/pricing',
    }
};


export default async function PricingPage() {
    return (
        <div>
            <PricingPageContent />
        </div>
    )
}