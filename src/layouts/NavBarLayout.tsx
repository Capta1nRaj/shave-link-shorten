'use client'

import { CompanyTextLogo1, LoadingGIF1 } from '@/images/ImagesExport'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavBarConstants from '@/constants/NavBarConstants.json'
import { inter } from '@/fonts/Fonts'
import { usePathname } from 'next/navigation'
import { SessionCheck } from '@/states/SessionCheck'
import { deleteCookie, getCookies } from 'cookies-next'
import { PathNamesList } from '@/constants/PathNamesList'

const loggedInButtonCSS = `flex items-center uppercase font-bold lg:text-base sm:text-lg text-xs ${inter.className}`

export default function NavBarLayout() {

    const pathname = usePathname();

    const [loading, setloading] = useState(true);
    const [isSessionChecked, setisSessionChecked] = useState(false);

    const { isLoggedIn, checkSession } = SessionCheck();

    async function verifySession() {
        if (pathname.length === 1 || PathNamesList.includes(pathname)) {
            await checkSession();
            setloading(false);
            setisSessionChecked(true);
        }
    }

    useEffect(() => {
        if (!isSessionChecked) {
            const data = getCookies();
            if (!data.id && !data.userName && !data.token) {
                deleteCookie("id"); deleteCookie("userName"); deleteCookie("token");
                setloading(false);
                return;
            }
            verifySession();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])


    return (
        <>
            {PathNamesList.includes(pathname) &&
                <nav className="NavBarLayout-section bg-primary-2">
                    <section className="max-width py-4 flex justify-between">

                        <div className="left-side flex items-center">
                            <CompanyTextLogo1 customCSS='sm:w-32 w-20' />
                        </div>

                        <div className={`middle-side ${loggedInButtonCSS} gap-6`}>
                            {NavBarConstants.slice(0, 2).map((item) => {
                                return (
                                    <Link key={item.title} className={item.css} href={item.link} title={item.title}> {item.title} </Link>
                                )
                            })}
                        </div>

                        {loading &&
                            <section className='flex justify-center w-[170px]'>
                                <LoadingGIF1 />
                            </section>
                        }

                        {!loading &&
                            <>
                                {!isLoggedIn ?
                                    <div className={`right-side ${loggedInButtonCSS} ${inter.className} gap-6`}>
                                        {NavBarConstants.slice(2, 4).map((item) => {
                                            return (
                                                <Link key={item.title} className={item.css} href={item.link} title={item.title}> {item.title} </Link>
                                            )
                                        })}
                                    </div>
                                    :
                                    <div className={`right-side ${loggedInButtonCSS} ${inter.className}`}>
                                        {NavBarConstants.slice(4).map((item) => {
                                            return (
                                                <Link key={item.title} className={item.css} href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/links`}> {item.title} </Link>
                                            )
                                        })}
                                    </div>
                                }
                            </>
                        }
                    </section>
                </nav>
            }
        </>
    )
}