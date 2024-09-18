'use client'

import { CompanyTextLogo1 } from '@/images/ImagesExport';
import Link from 'next/link';
import { NavBarConstants } from '@/constants/NavBarConstants';

const loggedInButtonCSS = `flex items-center uppercase font-bold lg:text-base sm:text-lg text-xs`;

export default function NavBarLayout(): JSX.Element {
    return (
        <>
            <nav className={`NavBarLayout-section bg-custom-medium bg-custom-medium`}>
                <section className="max-width py-4 flex justify-between">

                    <div className="left-side flex items-center">
                        <CompanyTextLogo1 className='sm:w-32 w-24' />
                    </div>

                    <div className={`middle-side ${loggedInButtonCSS} gap-x-6`}>
                        {NavBarConstants.slice(0, 2).map((item, index) => {
                            return (
                                <Link key={index} className={item.css} href={item.link} title={item.title}>
                                    {item.title}
                                </Link>
                            )
                        })}
                    </div>

                    <div className={`right-side ${loggedInButtonCSS} gap-x-6`}>
                        {NavBarConstants.slice(2, 4).map((item, index) => {
                            return (
                                <Link key={index} className={item.css} href={item.link} title={item.title}>
                                    {item.title}
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </nav>
        </>
    )
}