import Link from "next/link";
import { FooterConstants } from '@/constants/FooterConstants'
import { SocialMediaConstants } from "@/constants/SocialMediaConstants";
import { CompanyTextLogo1 } from "@/images/ImagesExport";
import { raleway, roboto } from "@/misc/Fonts";
import Image from "next/image";

export default function FooterLayout() {
    return (
        <>
            <footer className={`FooterLayout-section ${raleway.className} font-extrabold bg-custom-medium`}>
                <section className="max-width py-14">

                    <section className="flex sm:flex-row flex-col justify-between">
                        <div className={`left-side ${roboto.className} font-normal text-custom-white sm:w-96 w-full flex flex-col justify-center sm:text-left text-center`}>
                            <CompanyTextLogo1 className="sm:mx-0 mx-auto mb-2 sm:w-32 w-20" />
                            <p> At <span className="text-custom-blue">ShaveLinks</span>, we simplify link sharing with our link shortener, advanced analytics, customizable QR codes, and seamless app redirection. Optimize marketing, track performance, and guide users to shared websites effortlessly. </p>
                        </div>

                        <div className="right-side text-lg flex text-left justify-between sm:mt-0 mt-10 gap-x-10 text-custom-white">
                            <div className="box-1 flex flex-col gap-y-2">
                                <p className="uppercase text-xl text-custom-blue"> home </p>
                                {FooterConstants.slice(1, 5).map((item) => {
                                    return (
                                        <Link key={item.title} className={`${item.css} text-base font-medium`} href={item.link} title={item.title}> {item.title} </Link>
                                    )
                                })}
                            </div>

                            <div className="box-1 flex flex-col gap-y-2">
                                <p className="uppercase text-xl text-custom-blue"> legal </p>
                                {FooterConstants.slice(5).map((item) => {
                                    return (
                                        <Link key={item.title} className={`${item.css} text-base font-medium`} href={item.link} title={item.title}> {item.title} </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    <hr className="my-4" />

                    <section className="bottom-section flex flex-col items-center gap-y-2">

                        <div className="flex items-center gap-x-2">
                            {SocialMediaConstants.map((item) => (
                                <Link key={item.link} href={item.link} title={item.title} target="_blank">
                                    <Image className="scale-100 hover:scale-150 defaultTransitionCSS" width={35} height={35} src={item.image} alt={item.alt} />
                                </Link>
                            ))}
                        </div>

                        <p className="font-normal text-center text-xs text-white"> © 2024 <span className="text-custom-blue font-semibold">ShaveLinks</span>. All rights reserved. </p>

                    </section>

                </section>


            </footer>
        </>
    )
}