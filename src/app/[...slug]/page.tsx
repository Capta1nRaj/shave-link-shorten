'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { notFound, useRouter } from 'next/navigation';
import ShowAdComponent from '@/components/ShowAdComponent';
import axios from 'axios';

const Page = ({ params }: { params: { slug: string } }) => {

    const router = useRouter();

    const [loading, setloading] = useState(true);
    const [formData, setFormData] = useState({ destinationURL: '', toSupport: false, appOpener: false, status: false, statusCode: 200 })

    async function redirectLink() {
        const { data: { destinationURL, toSupport, appOpener, status, statusCode } } = await axios.get(`/api/RedirectToLink?alias=${params.slug[0]}`);
        if (!formData.toSupport && !formData.appOpener && destinationURL) { router.push(destinationURL); return; }
        setFormData({ destinationURL, toSupport, appOpener, status, statusCode });
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

    if (!formData.destinationURL) {
        notFound();
    }

    if (formData.toSupport || formData.appOpener) {
        return (
            <ShowAdComponent destinationURL={formData.destinationURL} />
        )
    }
}

export default Page