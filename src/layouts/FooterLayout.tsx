'use client'

import { raleway, roboto } from "@/fonts/Fonts";
import { CompanyLogo2 } from "@/images/ImagesExport";
import Link from "next/link";
import FooterConstants from '@/constants/FooterConstants.json'
import { SocialMediaConstants } from "@/constants/SocialMediaConstants";
import { usePathname } from "next/navigation";
import { PathNamesList } from "@/constants/PathNamesList";

export default function FooterLayout() {

    const pathname = usePathname();

    return (
        <>
            {PathNamesList.includes(pathname) &&
                <footer className={`FooterLayout-section ${raleway.className} font-extrabold bg-primary-2`}>
                    <section className="max-width py-32">

                        <section className="flex sm:flex-row flex-col justify-between">
                            <div className={`left-side ${roboto.className} font-normal text-primary-4 sm:w-96 w-full flex flex-col justify-center sm:text-left text-center`}>
                                <CompanyLogo2 customCSS="sm:mx-0 mx-auto mb-2 sm:w-32 w-20" />
                                At ShaveLinks Shortener, we streamline link sharing with advanced analytics, customizable QR codes, and seamless app redirection. Optimize marketing efforts, track performance, and effortlessly open apps based on your links.
                            </div>

                            <div className="right-side text-lg flex flex-col sm:text-left text-center justify-between sm:mt-0 mt-10 sm:gap-0 gap-y-2">
                                {FooterConstants.map((item) => {
                                    return (
                                        <Link key={item.title} className={item.css} href={item.link}> {item.title} </Link>
                                    )
                                })}
                            </div>
                        </section>

                        <hr className="my-4" />

                        <section className="bottom-section flex flex-col items-center gap-y-2">

                            <div className="flex items-center gap-x-2">
                                {SocialMediaConstants.map((item) => (
                                    <Link key={item.link} href={item.link} target="_blank">
                                        {item.image}
                                    </Link>
                                ))}
                            </div>

                            <p className="font-normal text-center text-xs"> © 2024 ShaveLinks. All rights reserved. </p>

                        </section>

                    </section>


                </footer>
            }
        </>
    )
}