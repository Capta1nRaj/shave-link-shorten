'use client'
import React, { useState, useEffect } from 'react';

const ShowAdComponent = ({ primaryURL }: { primaryURL: string }) => {
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            window.location.href = primaryURL;
        }
    }, [seconds, primaryURL]);

    const adCSS = `w-[250px] h-[250px] bg-primary-3 text-primary-1 flex justify-center items-center uppercase font-bold text-2xl`;

    return (
        <>
            <div className="flex justify-center items-center h-screen flex-col">
                <div className={`${adCSS} mb-4`}> ad here </div>

                <p className='font-bold mb-2 text-2xl'>Redirecting in</p>
                <div className="bg-primary-1 text-primary-2 p-10 rounded-full min-w-[116px] max-w-[116px] text-center border border-primary-3">
                    <h1 className="text-3xl font-bold">
                        {seconds}
                    </h1>
                </div>
                <div className={`${adCSS} mt-4`}> ad here </div>
            </div>
        </>
    );
};

export default ShowAdComponent;