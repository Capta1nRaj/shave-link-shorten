'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteCookie, getCookies } from 'cookies-next';
import LoadingSceneComponent from "@/components/LoadingSceneComponent";
import { SessionCheck } from "@/states/SessionCheck";

type FormData = {
    username: string;
    userpassword: string;
};

const labelCSS = `block mb-2 text-sm font-medium text-white`;
const inputCSS = `bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`;
const buttonCSS = `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800`;

const ForgotPasswordPage = () => {

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

    const [userOTP, setuserOTP] = useState('');
    const [otpScene, setotpScene] = useState(false);
    const [statusCode, setstatusCode] = useState();
    const [message, setmessage] = useState('');
    const [userNewPassword, setuserNewPassword] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const sendOTPToUserFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/forgotPassword`, formData);

            if (status === 201 || status === 401) { setstatusCode(status); setotpScene(true); }

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            console.error(error);
            setmessage("Internal Server Error.");
        }
    };


    const updateUserPasswordFunction = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!userOTP) { setmessage("Please enter OTP!"); return; }

        try {
            setisLoading(true);

            const { data: { status, message } } = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/forgotPassword`, { username: formData.username, userOTP, userNewPassword });

            if (status === 200) {
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }

            setmessage(message);

            setisLoading(false);
        } catch (error) {
            console.error(error);
            setmessage('Internal Server Error.');
        }
    }

    const resendOTP = async () => {
        const data = { userName: formData.username, method: 'forgotPassword' };

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

    const { isLoggedIn, checkSession } = SessionCheck();
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
                                    Reset you password
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={sendOTPToUserFunction}>
                                    <div>
                                        <label htmlFor="name" className={labelCSS}>Username</label>
                                        <input className={inputCSS} type="text" placeholder="Username" value={formData.username} onChange={handleChange('username')} />
                                    </div>

                                    {message &&
                                        <div className={`text-red-500 font-bold text-center`}>{message}</div>
                                    }

                                    <button type="submit" className={buttonCSS}> Send OTP </button>
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

                                    <p onClick={resendOTP} className="text-right text-xs cursor-pointer">RESEND OTP</p>

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

            {isLoading &&
                <LoadingSceneComponent />
            }
        </>
    )
}

export default ForgotPasswordPage