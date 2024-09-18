'use client'
import { NavBarConstants } from '@/constants/NavBarConstants'
import { SessionCheck } from '@/states/SessionCheck'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function NavBarSessionCheck({ loggedInButtonCSS }: { loggedInButtonCSS: string }) {

    const [isLoading, setIsLoading] = useState(true);

    const { isValidated, isLoggedIn, checkSession } = SessionCheck();

    async function validateSession() {
        if (!isValidated) { await checkSession(); }
        setIsLoading(false);
    }

    useEffect(() => {
        validateSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {isLoading ?
                <div className='sm:w-52 w-44 flex justify-center'>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="40" height="40" style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }}>
                        <g>
                            <path stroke="none" fill="#00abf0" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50">
                                <animateTransform values="0 50 51;360 50 51" keyTimes="0;1" repeatCount="indefinite" dur="1s" type="rotate" attributeName="transform"></animateTransform>
                            </path>
                        </g>
                    </svg>
                </div>
                :
                <div className={`right-side ${loggedInButtonCSS} gap-x-6`}>
                    {isLoggedIn ?
                        <>
                            <Link className={NavBarConstants[4].css} href={NavBarConstants[4].link} title={NavBarConstants[4].title}>
                                {NavBarConstants[4].title}
                            </Link>
                        </>
                        :
                        <>
                            {NavBarConstants.slice(2, 4).map((item, index) => {
                                return (
                                    <Link key={index} className={item.css} href={item.link} title={item.title}>
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </>
                    }
                </div>
            }

        </>
    )
}
