import { CompanyLogo1 } from '@/images/ImagesExport'
import Link from 'next/link'
import React from 'react'
import NavBarConstants from '@/constants/NavBarConstants.json'

const NavBarLayout = () => {
    return (
        <>
            <main className="NavBarLayout-section bg-primary-2">
                <section className="max-width max-w-[1440px] sm:px-10 px-4 py-4 mx-auto flex justify-between">

                    <div className="left-side">
                        <CompanyLogo1 customCSS='sm:w-16 w-14' />
                    </div>

                    <div className="right-side flex items-center uppercase font-bold gap-6 lg:text-base sm:text-lg text-xs">
                        {NavBarConstants.map((item) => {
                            return (
                                <Link className={item.css} href={item.link} key={item.title}> {item.title} </Link>
                            )
                        })}
                    </div>

                </section>
            </main>
        </>
    )
}

export default NavBarLayout