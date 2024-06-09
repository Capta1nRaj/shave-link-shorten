'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookies } from 'cookies-next';
import LoadingSceneComponent from "@/components/LoadingSceneComponent";
import { SessionCheck } from "@/states/SessionCheck";

type FormData = {
    username: string;
    userpassword: string;
};

const labelCSS = `block mb-2 text-sm font-medium text-white`;
const inputCSS = `bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`;
const buttonCSS = `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800`;

const SignInPage = () => {

    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        username: '',
        userpassword: '',
    });

    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const [OTP, setOTP] = useState('');
    const [otpScene, setotpScene] = useState(false);
    const [statusCode, setstatusCode] = useState();
    const [message, setmessage] = useState('');
    const [isLoading, setisLoading] = useState(false);


    const signInUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setisLoading(true);
            const { data: { status, message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signInAPI`, formData);

            if (status === 201 || status === 401) { setstatusCode(status); setotpScene(true); }

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            setmessage("Internal Server Error.");
        }
    };

    const signInUserVerifyFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!OTP) {
            setmessage("Please enter OTP!");
            return;
        }

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signInAPI`, { username: formData.username, OTP });

            if (status === 202) {
                setTimeout(() => { router.push(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/links`); }, 1000);
            }

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            setmessage("Internal Server Error.");
        }
    }

    const signUpUserVerifyFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!OTP) { setmessage("Please enter OTP!"); return; }

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/signUpAPI`, { userName: formData.username, OTP });

            if (status === 202) {
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            setmessage('Internal Server Error.');
        }
    }

    const resendOTP = async () => {
        const data = { userName: formData.username, method: statusCode === 201 ? 'oldUserVerification' : 'newUserVerification' };

        try {
            setisLoading(true);

            const { data: { message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/resendOTP`, data);

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            setmessage("Internal Server Error.");
        }
    }

    const { isLoggedIn, checkSession } = SessionCheck();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = getCookies();
        if (!data.id && !data.userName && !data.token) {
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

    if (loading) {
        return <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary-1"></div>
    }

    return (
        <>
            {!otpScene ?
                <section className="bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={signInUserFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Username</label>
                                        <input className={inputCSS} type="text" placeholder="Username" value={formData.username} onChange={handleChange('username')} />
                                    </div>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Password</label>
                                        <input className={inputCSS} type="password" placeholder="••••••••" value={formData.userpassword} onChange={handleChange('userpassword')} />
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Link href="/forgotPassword" className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot password?</Link>
                                    </div>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}>SIGN IN</button>
                                    <p className="text-sm font-light text-gray-400">
                                        Don`t have an account yet? <Link href="/signUp" className="font-medium text-primary-600 hover:underline text-primary-500">Sign up</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                :

                <section className="bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                    Enter OTP
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={statusCode === 201 ? signInUserVerifyFunction : signUpUserVerifyFunction}>
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
    )
}

export default SignInPage