import React, { Suspense } from 'react';
import SignInPageContent from './SignInPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign In to Your Account",
    description: "Sign in to ShaveLinks to access your dashboard, track engagement, shorten links, and boost your business with personalized settings and content.",
    keywords: "sign in, ShaveLinks, user login, access account, dashboard",
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
