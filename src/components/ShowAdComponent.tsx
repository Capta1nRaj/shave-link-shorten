'use client'
import React, { useState, useEffect } from 'react';

const ShowAdComponent = ({ destinationURL }: { destinationURL: string }) => {
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(timer); // Clear interval when seconds reach 0
                }
                return prevSeconds > 0 ? prevSeconds - 1 : 0; // Decrement seconds if greater than 0
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            window.location.href = destinationURL;
        }
    }, [seconds, destinationURL]);

    const adCSS = `w-[250px] h-[250px] bg-primary-3 text-primary-1 flex justify-center items-center uppercase font-bold text-2xl`;

    return (
        <>
            <div className="flex justify-center items-center h-screen flex-col">
                <div className={`${adCSS} mb-4`}> ad here </div>

                <p className='font-bold mb-2 text-2xl'> Redirecting in </p>
                <div className="bg-primary-1 text-primary-2 p-10 rounded-full min-w-[116px] max-w-[116px] text-center border border-primary-3">
                    <h1 className="text-3xl font-bold text-primary-4">
                        {seconds}
                    </h1>
                </div>
                <div className={`${adCSS} mt-4`}> ad here </div>
            </div>
        </>
    );
};

export default ShowAdComponent;

//! This will redirect them to YouYube app
// var userAgent = navigator.userAgent || navigator.vendor || window.opera;

// if (/android/i.test(userAgent)) {
//     window.location.href = "intent://www.youtube.com/watch?v=sSFM_hCFgko#Intent;package=com.google.android.youtube;scheme=https;end";
// } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//     window.location.href = "vnd.youtube://www.youtube.com/watch?v=sSFM_hCFgko";
// } else {
//     window.location.href = "https://www.youtube.com/watch?v=sSFM_hCFgko";
// }

// return;

//! For Twitter
// var userAgent = navigator.userAgent || navigator.vendor || window.opera;
// var twitterUrl = "https://x.com/RVCJ_FB/status/1793359412993937498";

// if (/android/i.test(userAgent)) {
//     window.location.href = "twitter://status?id=1793359412993937498";
// } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//     window.location.href = "twitter://status?id=1793359412993937498";
// } else {
//     window.location.href = twitterUrl;
// }

// return;