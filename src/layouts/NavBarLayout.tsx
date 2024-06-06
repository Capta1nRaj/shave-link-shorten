'use client'

import { CompanyLogo1, CompanyLogo2 } from '@/images/ImagesExport'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavBarConstants from '@/constants/NavBarConstants.json'
import { inter } from '@/fonts/Fonts'
import { SessionCheck } from '@/utils/SessionCheck'
import { usePathname } from 'next/navigation'

const NavBarLayout = () => {

    const pathname = usePathname();

    const [loading, setloading] = useState(true);
    const [isLogin, setisLogin] = useState<boolean | null>(null)

    async function checkSession() {
        if (pathname.length === 1) {
            const data = await SessionCheck(false);
            setisLogin(data);
            setloading(false);
        }
    }

    useEffect(() => {
        checkSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <nav className="NavBarLayout-section bg-primary-2">
                <section className="max-width py-4 flex justify-between">

                    <div className="left-side flex items-center">
                        <CompanyLogo2 customCSS='sm:w-32 w-20' />
                    </div>

                    <div className={`middle-side flex items-center uppercase font-bold gap-6 lg:text-base sm:text-lg text-xs ${inter.className}`}>
                        {NavBarConstants.slice(0, 2).map((item) => {
                            return (
                                <Link key={item.title} className={item.css} href={item.link}> {item.title} </Link>
                            )
                        })}
                    </div>

                    {!isLogin ?
                        <div className={`${loading ? "invisible" : "visible"} right-side flex items-center uppercase font-bold gap-6 lg:text-base sm:text-lg text-xs ${inter.className}`}>
                            {NavBarConstants.slice(2, 4).map((item) => {
                                return (
                                    <Link key={item.title} className={item.css} href={item.link}> {item.title} </Link>
                                )
                            })}
                        </div>
                        :
                        <div className={`${loading ? "invisible" : "visible"} right-side flex items-center uppercase font-bold gap-6 lg:text-base sm:text-lg text-xs ${inter.className}`}>
                            {NavBarConstants.slice(4).map((item) => {
                                return (
                                    <Link key={item.title} className={item.css} href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/links`}> {item.title} </Link>
                                )
                            })}
                        </div>
                    }

                </section>
            </nav>
        </>
    )
}

export default NavBarLayout