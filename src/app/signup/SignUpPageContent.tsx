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

//! Reuse CSS
const labelCSS = `block mb-2 text-sm font-medium text-white`;
const inputCSS = `bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-custom-blue border-2`;
const buttonCSS = `w-full text-custom-white font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-green-400/50 hover:bg-green-500 defaultTransitionCSS`;

const SignUpPageContent = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const referral = searchParams.get('referral');

    const { isValidated, isLoggedIn } = SessionCheck();
    // Toggle loading scene based on validation
    const [loading, setLoading] = useState(true);
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

        // Prevent default form submission.
        e.preventDefault();

        // Check if any required field (except 'userReferredBy') is empty or false.
        const hasEmptyValue = Object.entries(formData).some(([key, value]) => key !== 'userReferredBy' && ((typeof value === 'string' && !value.trim()) || (typeof value === 'boolean' && false)));

        // If a required field is empty, exit the function.
        if (hasEmptyValue) { return console.warn("A required field is empty."); }

        try {
            // Send sign-up data to the server.
            const { data: { status, message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signUpAPI`, formData);

            // Set feedback message for the user.
            setmessage(message);

            // If successful (status 202), send emails and redirect the user.
            if (status === 202) {

                let countdown = 5; // Starting from 5 seconds

                const countdownInterval = setInterval(() => {
                    setmessage(`Redirecting to dashboard in ${countdown}...`); // Update message with countdown
                    countdown--;

                    // When the countdown reaches 0, clear the interval
                    if (countdown < 0) { clearInterval(countdownInterval); }
                }, 1000); // Update every second

                await Promise.all([
                    sendingWelcomeEmail(formData.userName), // Send welcome email.
                    giving14DaysFreeTrial(formData.userName) // Start free trial & send email.
                ]);

                // Redirect to the new domain's "links" page.
                return router.push(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/links`);
            }

        } catch (error) {
            // Log error and set a generic error message.
            console.error(error);
            setmessage("Internal Server Error.");
        }
    };

    return (
        <>
            <NavBarLayout />
            {/* Initial loading screen */}
            {loading && <LoadingSceneComponent />}

            {/* Initial Scene */}
            <section className="bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Create a new account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={signUpUserFunction}>
                                <div>
                                    <label htmlFor="name" className={labelCSS}>Name</label>
                                    <input className={inputCSS} type="text" placeholder="Fullname" value={formData.userFullName} onChange={handleChange('userFullName')} />
                                </div>
                                <div>
                                    <label htmlFor="username" className={labelCSS}>Username</label>
                                    <input className={inputCSS} type="text" placeholder="Username" value={formData.userName} onChange={handleChange('userName')} />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelCSS}>Your email</label>
                                    <input className={inputCSS} type="email" placeholder="your@email.com" value={formData.userEmail} onChange={handleChange('userEmail')} />
                                </div>
                                <div>
                                    <label htmlFor="password" className={labelCSS}>Password</label>
                                    <input className={inputCSS} type="password" placeholder="••••••••" value={formData.userPassword} onChange={handleChange('userPassword')} />
                                </div>
                                <div>
                                    <label htmlFor="referredBy" className={labelCSS}>Referred by</label>
                                    <input className={inputCSS} type="text" placeholder="Referral Code" value={formData.userReferredBy} onChange={handleChange('userReferredBy')} />
                                </div>

                                {message &&
                                    <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                }

                                <button type="submit" className={buttonCSS}>SIGN UP</button>
                                <p className="text-sm font-light tracking-tight text-custom-white">
                                    Already have an account? <Link href="/signin" className="font-medium hover:underline">Sign In</Link>
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
