'use client'
import React, { useState, useEffect } from 'react';

const ShowAdComponent = ({ destinationURL }: { destinationURL: string }) => {
    const [seconds, setSeconds] = useState(3000);

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

            const handleInstagramRedirection = () => {
                const instagramPath = destinationURL.split('https://www.instagram.com/')[1];

                if (isAndroid) {
                    if (instagramPath.startsWith('reels/')) {
                        // For Instagram reels
                        window.location.href = `intent://www.instagram.com/reels/C8Ykp_SP6dM/#Intent;package=com.instagram.android;scheme=https;end`;
                    } else if (instagramPath.startsWith('p/')) {
                        // For Instagram posts
                        window.location.href = `intent://instagram.com/_u/${instagramPath}#Intent;package=com.instagram.android;scheme=https;end`;
                    } else {
                        // For user profiles
                        window.location.href = `intent://instagram.com/_u/${instagramPath}#Intent;package=com.instagram.android;scheme=https;end`;
                    }
                } else if (isIOS) {
                    if (instagramPath.startsWith('reels/')) {
                        // For Instagram reels
                        window.location.href = `instagram://reel?id=${instagramPath.split('/')[1]}`;
                    } else if (instagramPath.startsWith('p/')) {
                        // For Instagram posts
                        window.location.href = `instagram://media?id=${instagramPath.split('/')[1]}`;
                    } else {
                        // For user profiles
                        window.location.href = `instagram://user?username=${instagramPath}`;
                    }
                } else {
                    window.location.href = destinationURL;
                }
            };

            const urlCase = (url: string) => {
                if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
                if (url.includes('x.com')) return 'x';
                // Add additional cases here
                if (url.includes('instagram.com')) return 'instagram';
                return 'default';
            };

            switch (urlCase(destinationURL)) {
                case 'youtube':
                    handleYouTubeRedirection();
                    break;
                case 'x':
                    const twitterStatusId = destinationURL.split("/status/")[1];
                    const userId = destinationURL.split('x.com/')[1];
                    handleXRedirection(twitterStatusId, userId);
                    break;
                // Add additional cases here
                case 'instagram':
                    handleInstagramRedirection()
                    break;
                default:
                    window.location.href = destinationURL;
            }
        }
    }, [seconds, destinationURL]);



    const adCSS = `w-[250px] h-[250px] bg-primary-3 text-primary-1 flex justify-center items-center uppercase font-bold text-2xl`;

    async function asdf() {
        window.open('intent://www.instagram.com/reels/C8Ykp_SP6dM/#Intent;package=com.instagram.android;scheme=https;end')
    }

    return (
        <>
            <button onClick={asdf}>asdasd</button>
            <div className="flex justify-center items-center flex-col py-10">
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