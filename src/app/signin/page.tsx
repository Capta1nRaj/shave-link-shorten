import React, { Suspense } from 'react';
import SignInPageContent from './SignInPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign In to Your Account",
    description: "Sign in to ShaveLinks to access your dashboard, track engagement, shorten links, and boost your business with personalized settings.",
    keywords: "sign in, user login, dashboard access, engagement tracking, personalized settings, account management, secure login, business tools, link analytics",
    twitter: {
        card: "summary_large_image"
    },
    openGraph: {
        images: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png',
    },
    alternates: {
        canonical: '/signin',
    }
};

const SignInPage = () => (
    <Suspense>
        <SignInPageContent />
    </Suspense>
);

export default SignInPage;
