import React, { Suspense } from 'react';
import SignUpPageContent from './SignUpPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign Up Now and Boost Your Business today",
    description: "Join ShaveLinks to boost your business from now. Fill the form, boost your business. Enter a referral code during sign up to enjoy special benefits.",
    keywords: "sign up, boost your business, ShaveLinks, referral code, new user registration",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/signup',
    }
};

const SignUpPage = () => (
    <Suspense>
        <SignUpPageContent />
    </Suspense>
);

export default SignUpPage;