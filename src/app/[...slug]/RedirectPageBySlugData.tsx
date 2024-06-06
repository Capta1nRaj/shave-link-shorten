'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { notFound, useParams, useRouter } from 'next/navigation';
import ShowAdComponent from '@/components/ShowAdComponent';
import axios from 'axios';

const RedirectPageBySlugData = () => {

    const router = useRouter();
    const params = useParams();

    const [loading, setloading] = useState(true);
    const [formData, setFormData] = useState({ destinationURL: '', status: false, statusCode: 200 })

    async function redirectLink() {
        const { data: { destinationURL, status, statusCode } } = await axios.get(`/api/RedirectToLink?alias=${params.slug[0]}`);
        if (statusCode === 200 && destinationURL) { router.push(destinationURL); return; }
        setFormData({ destinationURL, status, statusCode });
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

    if (formData.statusCode === 404) {
        window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_1 || ' http://localhost:3000';
        return (
            <section className='fixed top-0 left-0 right-0 bottom-0 bg-primary-1'></section>
        );
    }

    return (
        <ShowAdComponent destinationURL={formData.destinationURL} />
    )
}

export default RedirectPageBySlugData