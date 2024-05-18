'use client'

import React, { useEffect, useState } from 'react'
import { notFound, useRouter } from 'next/navigation';
import ShowAdComponent from '@/components/ShowAdComponent';
import axios from 'axios';

const Page = ({ params }: { params: { slug: string } }) => {

    const router = useRouter();

    const [loading, setloading] = useState(true);
    const [formData, setFormData] = useState({ primaryURL: '', toSupport: false, appOpener: false, status: false, statusCode: 200 })

    async function redirectLink() {
        const { data: { primaryURL, toSupport, appOpener, status, statusCode } } = await axios.get(`/api/RedirectToLink?alias=${params.slug[0]}`);
        if (!formData.toSupport && !formData.appOpener && primaryURL) { router.push(primaryURL); return; }
        setFormData({ primaryURL, toSupport, appOpener, status, statusCode });
        setloading(false);
    }

    useEffect(() => {
        redirectLink()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (loading) {
        return (
            <section className='fixed top-0 left-0 right-0 bottom-0 bg-primary-1'>
            </section>
        )
    }

    if (!formData.primaryURL) {
        notFound();
    }

    if (formData.toSupport || formData.appOpener) {
        return (
            <ShowAdComponent primaryURL={formData.primaryURL} />
        )
    }
}

export default Page

// export default async function Page({ params }: { params: { slug: string } }) {
//     async function getLink() {
//         try {
//             if (params.slug.length > 1) { return { statusCode: 404 }; }

//             const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/RedirectToLink?alias=${params.slug[0]}`);
//             return data;

//         } catch (error) { console.error(error); return { primaryURL: "" }; }
//     }

//     const { primaryURL, toSupport, appOpener, status } = await getLink()

//     //! If no primaryURL from the alias or the link status is false, then, show notFound page
//     if (!primaryURL || !status) { notFound(); }

//     //! If user enabled to support or wants to open app, then, show the page
//     if (primaryURL && (toSupport || appOpener)) { return (<ShowAdComponent primaryURL={primaryURL} />); }

//     //! Else just redirect the,
//     redirect(primaryURL);
// }