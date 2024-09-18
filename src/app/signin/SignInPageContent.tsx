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

//! Reuse CSS
const labelCSS = `block mb-2 text-sm font-medium text-white`;
const inputCSS = `bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-custom-blue border-2`;
const buttonCSS = `w-full text-custom-white font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-green-400/50 hover:bg-green-500 defaultTransitionCSS`;

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

    //! Sign In user API call
    const signInUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send sign-in request to the server
            const { data: { status, message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signInAPI`, formData);

            setmessage(message); // Set message for user feedback

            // Redirect if login is successful (status 202)
            if (status === 202) { router.push(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/links`); }

        } catch (error) {
            console.error(error); // Log error for debugging
            setmessage("Internal Server Error."); // Show error message to user
        }
    };

    // Toggle loading scene based on validation
    const [loading, setLoading] = useState(true);
    useEffect(() => { if (isValidated) { if (isLoggedIn) { window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_2 || "http://localhost:3001"; } else { setLoading(false); } } }, [isLoggedIn, isValidated])

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

            {/* Initial Scene */}
            <section className="bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-custom-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={signInUserFunction}>
                                <div>
                                    <label htmlFor="name" className={labelCSS}>Email/Username</label>
                                    <input className={`${inputCSS} active:!ring-custom-blue`} type="text" placeholder="Username" value={formData.username} onChange={handleChange('username')} />
                                </div>
                                <div>
                                    <label htmlFor="name" className={labelCSS}>Password</label>
                                    <input className={inputCSS} type="password" placeholder="••••••••" value={formData.userpassword} onChange={handleChange('userpassword')} />
                                </div>
                                <div className="flex items-center justify-end text-custom-white">
                                    <Link href="/forgotpassword" className="text-sm font-medium hover:underline">Forgot password?</Link>
                                </div>

                                {message &&
                                    <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                }

                                <button type="submit" className={`${buttonCSS}`}>
                                    SIGN IN
                                </button>

                                <p className="text-sm font-light tracking-tight text-custom-white">
                                    Don`t have an account yet? <Link href="/signup" className="font-medium hover:underline">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <FooterLayout />
        </>
    )
}

export default SignInPageContent