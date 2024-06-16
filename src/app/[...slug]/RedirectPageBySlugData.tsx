"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ShowAdComponent from "@/components/ShowAdComponent";
import axios from "axios";

const RedirectPageBySlugData = () => {
    const router = useRouter();
    const params = useParams();

    const [loading, setloading] = useState(true);
    //! Default values for the page data
    const [pageData, setPageData] = useState(
        { statusCode: 200, destinationURL: "", toSupport: false, isApp: false, status: false }
    );

    async function redirectLink() {
        //! Fetching alias data
        const { data: { statusCode, destinationURL, toSupport, status, isApp } } = await axios.get(`/api/RedirectToLink?alias=${params.slug[0]}`);

        // Checking the conditions
        // If statusCode === 200
        // If destinationURL exist
        // If toSupport is false
        // If isApp is false
        // If link status is active/true
        // Then redirect user to the page
        if (statusCode === 200 && destinationURL && !toSupport && !isApp && status) {
            router.push(destinationURL);
            return;
        }

        //! If toSupport/isApp is true, then, show ad
        setPageData({ statusCode, destinationURL, toSupport, isApp, status });

        //! Set loading screen to false
        setloading(false);
    }

    useEffect(() => {
        redirectLink();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //! Show loading screen on initial start
    if (loading) {
        return (
            <section className="fixed top-0 left-0 right-0 bottom-0 bg-primary-1"></section>
        );
    }

    //! If url stats inactive or no url found, redirect to homepage
    if (pageData.statusCode === 404) {
        window.location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME_1 || "http://localhost:3000";
        return (
            <section className="fixed top-0 left-0 right-0 bottom-0 bg-primary-1"></section>
        );
    }

    //! If all success, then, redirect to the destinationURL
    return <ShowAdComponent destinationURL={pageData.destinationURL} />;
};

export default RedirectPageBySlugData;
