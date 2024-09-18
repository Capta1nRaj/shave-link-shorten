'use client'

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import { SaveUserDataAction } from './SaveUserDataAction';
import LoadingSceneComponent from '@/components/LoadingSceneComponent';
import { montserrat, raleway } from '@/misc/Fonts';
import NavBarLayout from '@/layouts/NavBarLayout';
import FooterLayout from '@/layouts/FooterLayout';

const inputCSS = `${montserrat.className} font-semibold block w-full rounded-md border-0 px-3.5 py-2 text-custom-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;

export default function ContactUsPageContent() {

    const [isLoading, setisLoading] = useState(false);
    const [contactUsFormData, setContactUsFormData] = useState({ firstName: '', lastName: '', companyName: '', email: '', phoneNumber: '', message: '' });

    const handleChange = (e: { target: { name: string; value: string; }; }) => { setContactUsFormData({ ...contactUsFormData, [e.target.name]: e.target.value }); };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        try {
            e.preventDefault();

            //! If any required field null, then, throw error meesage
            if (!contactUsFormData.firstName || !contactUsFormData.lastName || !contactUsFormData.email || !contactUsFormData.phoneNumber || !contactUsFormData.message) { toast.error("Please fill in all required fields!"); return; }

            setisLoading(true);

            //! Else send data to DB
            const { message, status } = await SaveUserDataAction(contactUsFormData);

            //! If any field null, then, throw error meesage
            if (status !== 200) { setisLoading(false); toast.error(message); return; }

            //! Else reset form, & show success message
            resetForm();

            setTimeout(() => {
                toast.success(message);
                setisLoading(false);
            }, 1000);

            await axios.post('/api/ContactUsMailSendAPI', contactUsFormData)
        } catch (error) {
            console.error(error);
            toast.error("Internal Server Error.");
        }
    };

    //! Reset the form fields on success function
    const resetForm = () => { setContactUsFormData({ firstName: '', lastName: '', companyName: '', email: '', phoneNumber: '', message: '' }); };

    //! Red Asterisk reuse CSS function
    const RedAsterisk = () => { return <span className='text-red-600'>*</span>; };

    return (
        <>
            {isLoading &&
                <LoadingSceneComponent />
            }

            <NavBarLayout />
            <div className="isolate bg-custom-dark lg:px-8 px-4 relative z-0 py-20 text-white">

                <h1 className={`lg:text-7xl md:text-6xl text-5xl text-center uppercase font-extrabold titleDropShadowCSS text-custom-blue ${raleway.className}`}> contact us </h1>

                <form onSubmit={handleSubmit} className={`mx-auto max-w-xl mt-10`}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-custom-white">
                                First name <RedAsterisk />
                            </label>
                            <div className="mt-2.5">
                                <input type="text" name="firstName" id="first-name" autoComplete="given-name" value={contactUsFormData.firstName} onChange={handleChange} className={`${inputCSS}`} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-custom-white">
                                Last name <RedAsterisk />
                            </label>
                            <div className="mt-2.5">
                                <input type="text" name="lastName" id="last-name" autoComplete="family-name" value={contactUsFormData.lastName} onChange={handleChange} className={`${inputCSS}`} />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-custom-white">
                                Company Name
                            </label>
                            <div className="mt-2.5">
                                <input type="text" name="companyName" id="company" autoComplete="organization" value={contactUsFormData.companyName} onChange={handleChange} className={`${inputCSS}`} />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-custom-white">
                                Email <RedAsterisk />
                            </label>
                            <div className="mt-2.5">
                                <input type="email" name="email" id="email" autoComplete="email" value={contactUsFormData.email} onChange={handleChange} className={`${inputCSS}`} />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-custom-white">
                                Phone number <RedAsterisk />
                            </label>
                            <div className="relative mt-2.5">
                                <input type="tel" name="phoneNumber" id="phone-number" autoComplete="tel" value={contactUsFormData.phoneNumber} onChange={handleChange} className={`${inputCSS}`} />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-custom-white">
                                Message <RedAsterisk />
                            </label>
                            <div className="mt-2.5">
                                <textarea name="message" id="message" rows={4} value={contactUsFormData.message} onChange={handleChange} className={`${inputCSS}`} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="block w-full rounded-md bg-custom-blue hover:bg-custom-5 defaultTransitionCSS px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Get In Touch
                        </button>
                    </div>
                </form>
            </div>
            <FooterLayout />
        </>
    )
}
