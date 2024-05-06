'use client'

import { raleway } from '@/fonts/Fonts';
import { useState } from 'react';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Assuming you have an endpoint to send the form data to
        const response = await fetch('/api/ContactUsAPI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            resetForm();
            console.log('Form data submitted successfully!');
        } else {
            // Handle error
            console.error('Failed to submit form data');
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            companyName: '',
            email: '',
            phoneNumber: '',
            message: ''
        });
    };


    return (
        <div className="isolate bg-primary-1 my-20 lg:px-8 px-4 relative">

            <h2 className={`titleCSS titleDropShadowCSS text-primary-3 ${raleway.className} teeny:block hidden`}> contact us </h2>

            <form onSubmit={handleSubmit} className="mx-auto max-w-xl mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-primary-4">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="firstName"
                                id="first-name"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-primary-4">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="lastName"
                                id="last-name"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-primary-4">
                            Company Name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="companyName"
                                id="company"
                                autoComplete="organization"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-primary-4">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-primary-4">
                            Phone number
                        </label>
                        <div className="relative mt-2.5">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <label htmlFor="country" className="sr-only">
                                    Country
                                </label>
                            </div>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phone-number"
                                autoComplete="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-primary-4">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-primary-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-primary-3 hover:bg-primary-5 defaultTransitionCSS px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Get In Touch
                    </button>
                </div>
            </form>
        </div>
    )
}
