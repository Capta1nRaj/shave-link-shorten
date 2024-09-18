'use client'
import { NavBarConstants } from '@/constants/NavBarConstants'
import { SessionCheck } from '@/states/SessionCheck'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function NavBarSessionCheck({ loggedInButtonCSS }: { loggedInButtonCSS: string }) {

    const { isValidated, isLoggedIn, checkSession } = SessionCheck();

    async function validateSession() { if (!isValidated) { await checkSession(); } }

    useEffect(() => {
        validateSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
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
        </>
    )
}
