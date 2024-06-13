"use client";

import React, { useCallback, useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import ShowAdComponent from "@/components/ShowAdComponent";
import axios from "axios";

const RedirectPageBySlugData = () => {
    const router = useRouter();
    const params = useParams();

    const [loading, setloading] = useState(true);
    const [formData, setFormData] = useState(
        { destinationURL: "", status: false, statusCode: 200, toSupport: false }
    );

    async function redirectLink() {
        const { data: { statusCode, destinationURL, toSupport, status, isApp } } = await axios.get(`/api/RedirectToLink?alias=${params.slug[0]}`);

        // Checking the conditions, if toSupport is false, isApp is false, link status is active/true, statusCode === 200, & destinationURL exist, then, redirect user to the page
        if (!toSupport && !isApp && status && statusCode === 200 && destinationURL) {
            router.push(destinationURL);
            return;
        }

        setFormData({ destinationURL, status, statusCode, toSupport });

        setloading(false);
    }

    useEffect(() => {
        redirectLink();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <section className="fixed top-0 left-0 right-0 bottom-0 bg-primary-1"></section>
        );
    }

    if (!formData.status || formData.statusCode === 404) {
        window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_1 || "http://localhost:3000";
        return (
            <section className="fixed top-0 left-0 right-0 bottom-0 bg-primary-1"></section>
        );
    }

    return <ShowAdComponent destinationURL={formData.destinationURL} />;
};

export default RedirectPageBySlugData;
