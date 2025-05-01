'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSceneComponent from "@/components/LoadingSceneComponent";
import { SessionCheck } from "@/states/SessionCheck";
import NavBarLayout from "@/layouts/NavBarLayout";
import FooterLayout from "@/layouts/FooterLayout";

type FormData = {
    username: string;
    userpassword: string;
};

const ForgotPasswordPageContent = () => {
    const router = useRouter();

    //! Initial input fields
    const [formData, setFormData] = useState<FormData>({
        username: '',
        userpassword: '',
    });

    //! Detect onChange values
    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: FormData) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const [userOTP, setuserOTP] = useState('');
    const [otpScene, setotpScene] = useState(false);
    const [message, setmessage] = useState('');
    const [userNewPassword, setuserNewPassword] = useState('');
    const [isSubmitting, setisSubmitting] = useState(false);
    const [status, setstatus] = useState<number | null>(null);
    const [loadingMessage, setLoadingMessage] = useState("Verifying your identity... 🔍");

    //! Send OTP to the user
    const sendOTPToUserFunction = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLParagraphElement>) => {
        e?.preventDefault();

        try {
            setstatus(null);
            setisSubmitting(true);
            setLoadingMessage("Sending OTP to your email... 📧");

            const { data: { status, message } } = await axios.post(`/api/EmailArmorAPIs/forgotPassword`, formData);

            setmessage(message);
            setstatus(status);

            if (status === 201) {
                setLoadingMessage("OTP sent successfully! Check your email... ✉️");
                setotpScene(true);
            }
        } catch (error) {
            console.error(error);
            setmessage("Internal Server Error.");
            setstatus(500);
        } finally {
            setisSubmitting(false);
        }
    };

    //! Update new password with OTP verification
    const updateUserPasswordFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userOTP) {
            setmessage("Please enter OTP!");
            setstatus(400);
            return;
        }

        try {
            setstatus(null);
            setisSubmitting(true);
            setLoadingMessage("Verifying OTP and updating password... 🔐");

            const { data: { status, message } } = await axios.put(`/api/EmailArmorAPIs/forgotPassword`, {
                username: formData.username,
                userOTP,
                userNewPassword
            });

            setmessage(message);
            setstatus(status);

            if (status === 201) {
                setLoadingMessage("Password updated successfully! Redirecting... ✨");
                setTimeout(() => { router.push('/signin'); }, 1000);
            }
        } catch (error) {
            console.error(error);
            setmessage('Internal Server Error.');
            setstatus(500);
        } finally {
            setisSubmitting(false);
        }
    }

    const { isValidated, isLoggedIn } = SessionCheck();
    // Toggle loading scene based on validation
    const [loading, setLoading] = useState(true);
    useEffect(() => { if (isValidated) { if (isLoggedIn) { window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_2 || "http://localhost:3001"; } else { setLoading(false); } } }, [isLoggedIn, isValidated])

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
                                    {!otpScene ? (
                                        <>Reset Your <span className="text-custom-blue">Password</span></>
                                    ) : (
                                        <>Verify <span className="text-custom-blue">OTP</span></>
                                    )}
                                </h1>
                                <p className="mt-3 text-sm text-custom-white/70">
                                    {!otpScene ?
                                        "Don't worry, we'll help you recover your account" :
                                        "Enter the OTP sent to your email"
                                    }
                                </p>
                            </div>

                            {!otpScene ? (
                                <form className="space-y-5" onSubmit={sendOTPToUserFunction}>
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

                                    {status && status !== 201 && (
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
                                        {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                                    </button>

                                    <p className="text-center text-sm text-custom-white/70">
                                        Remember your password?{' '}
                                        <Link
                                            href="/signin"
                                            className={`font-medium text-custom-blue hover:text-custom-blue/90 transition-colors duration-200 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                                        >
                                            Sign In
                                        </Link>
                                    </p>
                                </form>
                            ) : (
                                <form className="space-y-5" onSubmit={updateUserPasswordFunction}>
                                    <div className="space-y-2">
                                        <label htmlFor="otp" className="block text-sm font-medium text-custom-white/90">Enter OTP</label>
                                        <input
                                            className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                            type="text"
                                            placeholder="Enter OTP from your email"
                                            value={userOTP}
                                            onChange={(e) => setuserOTP(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="newpassword" className="block text-sm font-medium text-custom-white/90">New Password</label>
                                        <input
                                            className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-custom-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                                            type="password"
                                            placeholder="Enter your new password"
                                            value={userNewPassword}
                                            onChange={(e) => setuserNewPassword(e.target.value)}
                                        />
                                    </div>

                                    <p
                                        onClick={(e) => sendOTPToUserFunction(e)}
                                        className="text-right text-sm font-medium text-custom-blue hover:text-custom-blue/90 transition-colors duration-200 cursor-pointer"
                                    >
                                        Resend OTP
                                    </p>

                                    {status && status !== 201 && (
                                        <div className="p-3 rounded-lg text-center text-sm font-medium bg-red-500 text-white">
                                            {message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-4 rounded-lg bg-custom-blue text-white font-semibold uppercase
                                            ${isSubmitting
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-custom-blue/90 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 focus:ring-offset-gray-800'
                                            } transition-all duration-200`}
                                    >
                                        {isSubmitting ? 'Updating...' : 'Update Password'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <FooterLayout />
        </>
    );
}

export default ForgotPasswordPageContent;