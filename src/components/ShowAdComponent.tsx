'use client'
import React, { useState, useEffect } from 'react';

const ShowAdComponent = ({ destinationURL }: { destinationURL: string }) => {
    const [seconds, setSeconds] = useState(1);

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
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const isAndroid = /android/i.test(userAgent);
            const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

            const handleYouTubeRedirection = () => {
                if (isAndroid) {
                    window.location.href = `intent://${destinationURL.split('https://')[1]}#Intent;package=com.google.android.youtube;scheme=https;end`;
                } else if (isIOS) {
                    window.location.href = `vnd.youtube://${destinationURL.split('https://')[1]}`;
                } else {
                    window.location.href = destinationURL;
                }
            };

            const handleXRedirection = (twitterStatusId: string | undefined, userId: string | undefined) => {
                if (twitterStatusId) {
                    const xUrl = `x://status?id=${twitterStatusId}`;
                    window.location.href = isAndroid || isIOS ? xUrl : destinationURL;
                } else if (userId) {
                    const xUrl = `x://user?screen_name=${userId}`;
                    window.location.href = isAndroid || isIOS ? xUrl : destinationURL;
                } else {
                    window.location.href = destinationURL;
                }
            };

            if (destinationURL.includes('youtube.com') || destinationURL.includes('youtu.be')) {
                handleYouTubeRedirection();
            } else if (destinationURL.includes("x.com")) {
                const twitterStatusId = destinationURL.split("/status/")[1];
                const userId = destinationURL.split('x.com/')[1];
                handleXRedirection(twitterStatusId, userId);
            } else {
                window.location.href = destinationURL;
            }
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