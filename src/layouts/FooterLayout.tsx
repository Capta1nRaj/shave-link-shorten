import Link from "next/link";
import { FooterConstants } from '@/constants/FooterConstants'
import { SocialMediaConstants } from "@/constants/SocialMediaConstants";
import { CompanyTextLogo1 } from "@/images/ImagesExport";
import { raleway, roboto } from "@/misc/Fonts";
import Image from "next/image";

export default function FooterLayout({ footerColor }: { footerColor?: string }) {
    return (
        <>
            <footer className={`FooterLayout-section ${raleway.className} font-extrabold ${footerColor ? footerColor : "bg-custom-dark"} relative overflow-hidden`}>
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,171,240,0.03),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,171,240,0.03),transparent_50%)]"></div>

                <section className="max-width relative py-20">
                    <section className="flex sm:flex-row flex-col justify-between">
                        <div className={`left-side ${roboto.className} font-normal text-custom-white/80 sm:w-96 w-full flex flex-col justify-center sm:text-left text-center group`}>
                            <CompanyTextLogo1 className="sm:mx-0 mx-auto mb-4 sm:w-32 w-20 transition-transform duration-300 group-hover:scale-110" />
                            <p className="leading-relaxed"> At <span className="text-custom-blue">ShaveLinks</span>, we simplify link sharing with our link shortener, advanced analytics, customizable QR codes, and seamless app redirection. Optimize marketing, track performance, and guide users to shared websites effortlessly. </p>
                        </div>

                        <div className="right-side text-lg flex text-left justify-between sm:mt-0 mt-10 gap-x-16 text-custom-white">
                            <div className="box-1 flex flex-col gap-y-3">
                                <p className="uppercase text-xl text-custom-blue font-bold"> home </p>
                                {FooterConstants.slice(1, 5).map((item) => {
                                    return (
                                        <Link key={item.title}
                                            className={`${item.css} text-base font-medium text-custom-white/70 hover:text-custom-blue transition-colors duration-300`}
                                            href={item.link}
                                            title={item.title}
                                        >
                                            {item.title}
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="box-1 flex flex-col gap-y-3">
                                <p className="uppercase text-xl text-custom-blue font-bold"> legal </p>
                                {FooterConstants.slice(5).map((item) => {
                                    return (
                                        <Link key={item.title}
                                            className={`${item.css} text-base font-medium text-custom-white/70 hover:text-custom-blue transition-colors duration-300`}
                                            href={item.link}
                                            title={item.title}
                                        >
                                            {item.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    <hr className="my-8 border-custom-white/10" />

                    <section className="bottom-section flex flex-col items-center gap-y-4">
                        <div className="flex items-center gap-x-4">
                            {SocialMediaConstants.map((item) => (
                                <Link key={item.link}
                                    href={item.link}
                                    title={item.title}
                                    target="_blank"
                                    className="group"
                                >
                                    <div className="p-2 rounded-full bg-custom-blue/10 border border-custom-blue/20 
                                                  group-hover:bg-custom-blue/20 group-hover:border-custom-blue/30 
                                                  transition-all duration-300">
                                        <Image
                                            className="scale-100 group-hover:scale-110 transition-transform duration-300"
                                            width={24}
                                            height={24}
                                            src={item.image}
                                            alt={item.alt}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <p className="font-normal text-center text-sm text-custom-white/60">
                            © {new Date().getFullYear()} <span className="text-custom-blue font-semibold">ShaveLinks</span>. All rights reserved.
                        </p>
                    </section>
                </section>
            </footer>
        </>
    )
}