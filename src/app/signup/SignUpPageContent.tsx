'use client'

import LoadingSceneComponent from "@/components/LoadingSceneComponent";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { giving14DaysFreeTrial } from "./actions/giving14DaysFreeTrial";
import { sendingWelcomeEmail } from "./actions/sendingWelcomeEmail";
import NavBarLayout from "@/layouts/NavBarLayout";
import FooterLayout from "@/layouts/FooterLayout";
import { SessionCheck } from "@/states/SessionCheck";

type FormData = {
    userFullName: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userReferredBy: string;
    userAgent: string;
};

const SignUpPageContent = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const referral = searchParams.get('referral');

    const { isValidated, isLoggedIn } = SessionCheck();
    // Toggle loading scene based on validation
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setstatus] = useState<number | null>(null);

    useEffect(() => { if (isValidated) { if (isLoggedIn) { window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_2 || "http://localhost:3001"; } else { setLoading(false); } } }, [isLoggedIn, isValidated])

    //! Initial input fields
    const [formData, setFormData] = useState<FormData>({
        userFullName: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userReferredBy: referral || '',
        userAgent: ''
    });

    //! Fetching user agent at initial load
    useEffect(() => {
        setFormData((prevState: FormData) => ({
            ...prevState,
            userAgent: window.navigator.userAgent,
        }));
    }, []);

    //! Detect onChange values
    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: FormData) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const [message, setmessage] = useState('');

    //! Only for development purpose
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true') {
            setFormData({
                userFullName: "Priyal Raj",
                userName: "priyalcoc2",
                userEmail: "priyalcoc2@gmail.com",
                userPassword: "priyalcoc2",
                userReferredBy: "Captain",
                userAgent: window.navigator.userAgent
            })
        }
    }, [])

    //! Sign Up user data send to backend
    const signUpUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if any required field (except 'userReferredBy') is empty or false.
        const hasEmptyValue = Object.entries(formData).some(([key, value]) => key !== 'userReferredBy' && ((typeof value === 'string' && !value.trim()) || (typeof value === 'boolean' && false)));

        // If a required field is empty, exit the function.
        if (hasEmptyValue) { return console.warn("A required field is empty."); }

        try {
            setstatus(null);
            setIsSubmitting(true);
            setmessage("Creating your account...");

            // Send sign-up data to the server.
            const { data: { status, message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signUpAPI`, formData);

            // Set feedback message for the user.
            setmessage(message);

            // Set status for the user.
            setstatus(status);
            // If successful (status 202), send emails and redirect the user.
            if (status === 202) {
                // Start sending emails
                const emailPromise = Promise.all([
                    sendingWelcomeEmail(formData.userName),
                    giving14DaysFreeTrial(formData.userName)
                ]);

                // Update messages while emails are being sent
                const messages = [
                    "Sending your welcome emails...",
                    "Preparing your 14-day free trial...",
                    "Check your email for a surprise 🎁",
                    "Almost there...",
                    "Redirecting to your dashboard..."
                ];

                let messageIndex = 0;
                const messageInterval = setInterval(() => {
                    if (messageIndex < messages.length) {
                        setmessage(messages[messageIndex]);
                        messageIndex++;
                    } else {
                        clearInterval(messageInterval);
                    }
                }, 1500);

                // Wait for emails to be sent
                await emailPromise;

                // Clear the interval if it's still running
                clearInterval(messageInterval);

                // Show final message and redirect
                setmessage("Redirecting to your dashboard...");

                // Redirect to the new domain's "links" page.
                return router.push(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/links`);
            }

        } catch (error) {
            // Log error and set a generic error message.
            console.error(error);
            setmessage("Internal Server Error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NavBarLayout />
            {/* Initial loading screen */}
            {loading && <LoadingSceneComponent />}

            {/* Initial Scene */}
            <section className="bg-custom-dark min-h-screen flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Card Container */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden relative">
                        {/* Loading Overlay */}
                        {isSubmitting && (
                            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue mx-auto"></div>
                                    <p className="mt-4 text-custom-white font-medium">{message}</p>
                                </div>
                            </div>
                        )}

                        {/* Gradient Top Border */}
                        <div className="h-1 bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue"></div>

                        <div className="p-8">
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-custom-white">
                                    Let&apos;s <span className="text-custom-blue">Boom</span>
                                    <br />
                                    Your <span className="text-custom-blue">Business</span>
                                </h1>
                                <p className="mt-3 text-sm text-custom-white/70">
                                    Join thousands of successful businesses
                                </p>
                            </div>

                            {/* Form Section */}
                            <form className="space-y-5" onSubmit={signUpUserFunction}>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-custom-white/90">Full Name</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.userFullName}
                                        onChange={handleChange('userFullName')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="username" className="block text-sm font-medium text-custom-white/90">Username</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                        type="text"
                                        placeholder="johndoe"
                                        value={formData.userName}
                                        onChange={handleChange('userName')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-custom-white/90">Email Address</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.userEmail}
                                        onChange={handleChange('userEmail')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-custom-white/90">Password</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.userPassword}
                                        onChange={handleChange('userPassword')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="referredBy" className="block text-sm font-medium text-custom-white/90">
                                        Referral Code <span className="text-custom-white/50">(Optional)</span>
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                        type="text"
                                        placeholder="Enter referral code"
                                        value={formData.userReferredBy}
                                        onChange={handleChange('userReferredBy')}
                                    />
                                </div>

                                {status && status !== 202 && (
                                    <div className={`p-3 rounded-lg text-center text-sm font-medium bg-red-500 text-white`}>
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 rounded-lg bg-custom-blue text-white font-semibold 
                                        ${isSubmitting
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-custom-blue/90 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 focus:ring-offset-gray-800'
                                        } transition-all duration-200`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    ) : (
                                        'Start Your Journey'
                                    )}
                                </button>

                                <p className="text-center text-sm text-custom-white/70">
                                    Already have an account?{' '}
                                    <Link
                                        href="/signin"
                                        className={`font-medium text-custom-blue hover:text-custom-blue/90 transition-colors duration-200 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <FooterLayout />
        </>
    );
};

export default SignUpPageContent;
