'use client'

import { raleway } from '@/fonts/Fonts';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const inputCSS = `block w-full rounded-md border-0 px-3.5 py-2 text-primary-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;

export default function ContactUsPage() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', companyName: '', email: '', phoneNumber: '', message: '' });

    const handleChange = (e: { target: { name: any; value: any; }; }) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        try {
            e.preventDefault();

            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.message) { toast.error("Please fill in all required fields!"); return; }

            const { data: { message, status } } = await axios.post('/api/ContactUsAPI', formData);

            if (status !== 200) { toast.error(message); return; }
            resetForm(); toast.success(message)
        } catch (error) {
            toast.error("Internal Server Error.");
        }
    };

    const resetForm = () => { setFormData({ firstName: '', lastName: '', companyName: '', email: '', phoneNumber: '', message: '' }); };

    const RedAsterisk = () => { return <span className='text-red-600'>*</span>; };

    return (
        <div className="isolate bg-primary-1 my-20 lg:px-8 px-4 relative">

            <h2 className={`lg:text-7xl md:text-6xl text-5xl text-center uppercase font-extrabold titleDropShadowCSS text-primary-3 ${raleway.className}`}> contact us </h2>

            <form onSubmit={handleSubmit} className="mx-auto max-w-xl mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-primary-4">
                            First name <RedAsterisk />
                        </label>
                        <div className="mt-2.5">
                            <input type="text" name="firstName" id="first-name" autoComplete="given-name" value={formData.firstName} onChange={handleChange} className={`${inputCSS}`} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-primary-4">
                            Last name <RedAsterisk />
                        </label>
                        <div className="mt-2.5">
                            <input type="text" name="lastName" id="last-name" autoComplete="family-name" value={formData.lastName} onChange={handleChange} className={`${inputCSS}`} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-primary-4">
                            Company Name
                        </label>
                        <div className="mt-2.5">
                            <input type="text" name="companyName" id="company" autoComplete="organization" value={formData.companyName} onChange={handleChange} className={`${inputCSS}`} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-primary-4">
                            Email <RedAsterisk />
                        </label>
                        <div className="mt-2.5">
                            <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} className={`${inputCSS}`} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-primary-4">
                            Phone number <RedAsterisk />
                        </label>
                        <div className="relative mt-2.5">
                            <input type="tel" name="phoneNumber" id="phone-number" autoComplete="tel" value={formData.phoneNumber} onChange={handleChange} className={`${inputCSS}`} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-primary-4">
                            Message <RedAsterisk />
                        </label>
                        <div className="mt-2.5">
                            <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputCSS}`} />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button type="submit" className="block w-full rounded-md bg-primary-3 hover:bg-primary-5 defaultTransitionCSS px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Get In Touch
                    </button>
                </div>
            </form>
        </div>
    )
}
