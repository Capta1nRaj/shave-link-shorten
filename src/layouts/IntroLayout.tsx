import { raleway } from "@/fonts/Fonts";
import { DashboardPreview1, JoinWaitlistIcon1 } from "@/images/ImagesExport";
import Link from "next/link";

export const customTitleCSS = `titleCSS lg:leading-7xl md:leading-6xl sm:leading-5xl leading-4xl`;

export default async function IntroLayout() {
    return (
        <>
            <section className={`IntroLayout-section max-width ${raleway.className} font-extrabold my-[100px]`}>

                <div className={`${customTitleCSS}`}> short you <span className={`titleDropShadowCSS`}> links </span> </div>
                <div className={`${customTitleCSS}`}> <span className={`titleDropShadowCSS`}> analyze </span> your reach </div>

                <p className="mt-3 mb-8 text-sm font-bold uppercase text-center"> &#34;shorten links hassle-free and enjoy detailed analytics effortlessly for free .&#34; </p>

                <DashboardPreview1 customCSS="w-full" />
                <p className="text-xs font-normal text-center opacity-50 mt-3 mb-8">(Inspired by the image, our dashboard will look similar., creds: <Link href={'https://twitter.com/RumanArif00'} target="_blank"> @RumanArif00 </Link>)</p>

                <button className="flex items-center gap-2 mx-auto px-8 py-2 bg-primary-3 uppercase rounded-lg sm:text-2xl text-base buttonTransitionCSS">
                    join waitlist <JoinWaitlistIcon1 customCSS="sm:w-8 w-6 -mt-[6px]" />
                </button>
            </section>
        </>
    )
}