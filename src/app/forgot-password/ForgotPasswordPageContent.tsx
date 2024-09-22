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

//! Reuse CSS
const labelCSS = `block mb-2 text-sm font-medium text-white`;
const inputCSS = `bg-gray-50 border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-custom-blue border-2`;
const buttonCSS = `w-full text-custom-white font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-green-400/50 hover:bg-green-500 defaultTransitionCSS`;

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
    const [isLoading, setisLoading] = useState(false);

    //! Send OTP to the user
    const sendOTPToUserFunction = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLParagraphElement>) => {
        e?.preventDefault();

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.post(`/api/EmailArmorAPIs/forgotPassword`, formData);

            if (status === 201) { setotpScene(true); }

            setmessage(message);
            setisLoading(false);
        } catch (error) {
            console.error(error);
            setmessage("Internal Server Error.");
        }
    };


    //! Update new password with OTP verification
    const updateUserPasswordFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!userOTP) { setmessage("Please enter OTP!"); return; }

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.put(`/api/EmailArmorAPIs/forgotPassword`, { username: formData.username, userOTP, userNewPassword });

            if (status === 201) { setTimeout(() => { router.push('/signin'); }, 1000); }

            setmessage(message);
            setisLoading(false);
        } catch (error) {
            console.error(error);
            setmessage('Internal Server Error.');
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
            {loading &&
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary-1"></div>
            }

            {/* Initial Scene */}
            {!otpScene ?
                <section className="bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                    Reset you password
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={sendOTPToUserFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Email/Username</label>
                                        <input className={inputCSS} type="text" placeholder="Username" value={formData.username} onChange={handleChange('username')} />
                                    </div>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}> Send OTP </button>
                                    <p className="text-sm font-light tracking-tight text-custom-white">
                                        Don`t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline text-primary-500">Sign up</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                :

                //! If user email exist, then, send OTP, & show this screen
                <section className="bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                    Enter OTP & New Password
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={updateUserPasswordFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}> Enter OTP </label>
                                        <input className={inputCSS} type="text" placeholder="OTP" value={userOTP} onChange={(e) => setuserOTP(e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="name" className={labelCSS}> Enter New Password </label>
                                        <input className={inputCSS} type="password" placeholder="New Password" value={userNewPassword} onChange={(e) => setuserNewPassword(e.target.value)} />
                                    </div>

                                    <p onClick={(e) => sendOTPToUserFunction(e)} className="text-right text-xs cursor-pointer text-custom-white">RESEND OTP</p>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={`${buttonCSS} uppercase`}> update </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }

            {/* Loading Component */}
            {isLoading &&
                <LoadingSceneComponent />
            }

            <FooterLayout />
        </>
    )
}

export default ForgotPasswordPageContent