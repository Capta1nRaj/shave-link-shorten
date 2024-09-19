import React, { Suspense } from 'react';
import SignUpPageContent from './SignUpPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign Up Now & Boost Your Business",
    description: "Join ShaveLinks to boost your business. Fill out the form, use a referral code, and enjoy special benefits for new users.",
    keywords: "sign up, registration, new user, referral benefits, business growth, account creation, free trial, onboarding, special offers",
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