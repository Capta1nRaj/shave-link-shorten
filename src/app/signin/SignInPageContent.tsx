'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSceneComponent from "@/components/LoadingSceneComponent";
import NavBarLayout from "@/layouts/NavBarLayout";
import FooterLayout from "@/layouts/FooterLayout";
import { SessionCheck } from "@/states/SessionCheck";

type FormData = {
    username: string;
    userpassword: string;
};

const SignInPageContent = () => {
    const router = useRouter();

    const { isValidated, isLoggedIn } = SessionCheck();

    //! Initial input fields
    const [formData, setFormData] = useState<FormData>({
        username: '',
        userpassword: '',
    });

    //! Detect onChange values
    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: FormData) => ({ ...prevState, [field]: e.target.value, }));
    };

    const [message, setmessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Searching for your digital footprint... 🔍");
    const [status, setstatus] = useState<number | null>(null);

    useEffect(() => { if (isValidated) { if (isLoggedIn) { window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_2 || "http://localhost:3001"; } else { setLoading(false); } } }, [isLoggedIn, isValidated])

    //! Sign In user API call
    const signInUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setstatus(null);
            setIsSubmitting(true);
            setLoadingMessage("Validating your credentials... 🔐");

            // Send sign-in request to the server
            const { data: { status, message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signInAPI`, formData);

            setmessage(message);
            setstatus(status);

            // Redirect if login is successful (status 202)
            if (status === 202) {
                setLoadingMessage("Welcome back! Preparing your dashboard... ✨");
                router.push(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/links`);
            }

        } catch (error) {
            console.error(error);
            setmessage("Internal Server Error.");
            setstatus(500);
        } finally {
            setIsSubmitting(false);
        }
    };

    //! Only for development purpose
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true') {
            setFormData({
                username: "priyalcoc2@gmail.com",
                userpassword: "priyalcoc2"
            })
        }
    }, [])

    return (
        <>
            <NavBarLayout />
            {/* Initial loading screen */}
            {loading && <LoadingSceneComponent />}

            {/* Loading Overlay */}
            {isSubmitting && (
                <div className="fixed inset-0 bg-custom-dark/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-[3px] border-t-custom-crimson border-r-custom-blue border-b-custom-crimson border-l-custom-blue rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-custom-white font-medium text-lg">{loadingMessage}</p>
                    </div>
                </div>
            )}

            {/* Initial Scene */}
            <section className="bg-custom-dark min-h-screen flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Card Container */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
                        {/* Gradient Top Border */}
                        <div className="h-1 bg-gradient-to-r from-custom-blue via-custom-crimson to-custom-blue"></div>

                        <div className="p-8">
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-custom-white">
                                    Welcome <span className="text-custom-blue">Back</span>
                                </h1>
                                <p className="mt-3 text-sm text-custom-white/70">
                                    Let&apos;s continue your success story
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={signInUserFunction}>
                                <div className="space-y-2">
                                    <label htmlFor="username" className="block text-sm font-medium text-custom-white/90">Email/Username</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                        type="text"
                                        placeholder="Enter your email or username"
                                        value={formData.username}
                                        onChange={handleChange('username')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-custom-white/90">Password</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.userpassword}
                                        onChange={handleChange('userpassword')}
                                    />
                                </div>

                                <div className="flex items-center justify-end">
                                    <Link href="/forgot-password" className="text-sm font-medium text-custom-blue hover:text-custom-blue/90 transition-colors duration-200">
                                        Forgot password?
                                    </Link>
                                </div>

                                {status && status !== 202 && (
                                    <div className="p-3 rounded-lg text-center text-sm font-medium bg-red-500 text-white">
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
                                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                                </button>

                                <p className="text-center text-sm text-custom-white/70">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        href="/signup"
                                        className={`font-medium text-custom-blue hover:text-custom-blue/90 transition-colors duration-200 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        Sign Up
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
}

export default SignInPageContent;