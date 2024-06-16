'use client'

import LoadingSceneComponent from "@/components/LoadingSceneComponent";
import { SessionCheck } from "@/states/SessionCheck";
import axios from "axios";
import { deleteCookie, getCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
const inputCSS = `bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`;
const buttonCSS = `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800`;

const SignUpPage = () => {

    const router = useRouter();

    //! Initial input fields
    const [formData, setFormData] = useState<FormData>({
        userFullName: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userReferredBy: '',
        userAgent: ''
    });

    //! Fetching user agent at initial load
    useEffect(() => {
        setFormData((prevState: any) => ({
            ...prevState,
            userAgent: window.navigator.userAgent,
        }));
    }, []);

    //! Detect onChange values
    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const [message, setmessage] = useState('');

    const [OTP, setOTP] = useState('');
    const [otpScene, setotpScene] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    //! Sign Up user data send to backend
    const signUpUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const hasEmptyValue = Object.entries(formData).some(([key, value]) => key !== 'userReferredBy' && ((typeof value === 'string' && !value.trim()) || (typeof value === 'boolean' && false)));
        if (hasEmptyValue) {
            console.warn("is empty");
            return;
        }

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signUpAPI`, formData);

            if (status === 201) {
                setotpScene(true);
            }

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            console.error(error);
            setmessage("Internal Server Error.");
        }

    };

    //! Verify the Sign Up user
    const signUpUserVerifyFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!OTP) {
            setmessage("Please enter OTP!");
            return;
        }

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signUpAPI`, { userName: formData.userName, OTP });

            if (status === 202) {
                window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_2 + '/links' || "http://localhost:3001/links";
            }

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            console.error(error);
            setmessage("Internal Server Error.");
        }
    }

    //! Resend OTP to the user
    const resendOTP = async () => {

        const data = { userName: formData.userName, method: 'newUserVerification' }

        try {
            setisLoading(true);

            const { data: { message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/resendOTP`, data);

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            console.error(error);
            setmessage("Internal Server Error.");
        }
    }

    const { checkSession } = SessionCheck();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = getCookies();
        if (!data.id && !data.userName && !data.token) {
            deleteCookie("id"); deleteCookie("userName"); deleteCookie("token");
            setLoading(false);
            return;
        } else {
            checkSession().then((data) => {
                if (data.isLoggedIn) {
                    router.push('/');
                    return;
                }
                setLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //! Initial loading screen
    if (loading) {
        return <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary-1"></div>
    }

    return (
        <>
            {/* Initial Scene */}
            {!otpScene ?
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
                                    <p className="text-sm font-light text-gray-400">
                                        Already have an account? <Link href="/signIn" className="font-medium text-primary-600 hover:underline text-primary-500">Sign In</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                :

                //! If everything success, then, show this scene
                <section className="bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                    Enter OTP
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={signUpUserVerifyFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Enter OTP</label>
                                        <input className={inputCSS} type="text" placeholder="OTP" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                                    </div>

                                    <p onClick={resendOTP} className="text-right text-xs cursor-pointer">RESEND OTP</p>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}>VERIFY</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }

            {isLoading &&
                <LoadingSceneComponent />
            }
        </>
    );
};

export default SignUpPage;
