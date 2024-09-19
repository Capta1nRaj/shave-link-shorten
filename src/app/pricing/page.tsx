import { Metadata } from "next";
import PricingPageContent from "./PricingPageContent";

export const metadata: Metadata = {
    title: "Compare Our Pricing Plans",
    description: "Explore ShaveLinks pricing plans and compare features. Choose the plan that best suits your business needs with transparent fees and flexibility.",
    keywords: "pricing plans, cost comparison, flexible options, subscription plans, transparent fees, business solutions, premium features, free trial, plan benefits",
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