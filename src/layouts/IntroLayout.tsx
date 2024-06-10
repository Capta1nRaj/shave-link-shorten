import { raleway } from "@/fonts/Fonts";
import { DashboardPreview1, JoinWaitlistIcon1 } from "@/images/ImagesExport";
import Link from "next/link";

export const customTitleCSS = `titleCSS lg:leading-7xl md:leading-6xl sm:leading-5xl leading-3xl`;

export default function IntroLayout() {
    return (
        <section id="home" className={`IntroLayout-section max-width ${raleway.className} font-extrabold py-32`}>
            <h1 className={`${customTitleCSS}`}>
                shorten your <span className={`titleDropShadowCSS underline decoration-2 sm:underline-offset-8 underline-offset-4`}>links</span>
            </h1>

            <h2 className={`${customTitleCSS}`}>
                <span className={`titleDropShadowCSS underline decoration-2 sm:underline-offset-8 underline-offset-4`}>analyze</span> your reach
            </h2>

            <p className="mt-3 mb-8 text-sm font-bold uppercase text-center max-w-screen-md mx-auto">
                &#34;shorten links <span className="text-primary-3 underline underline-offset-2">hassle-free</span> and & <span className="text-primary-3 underline underline-offset-2">detailed</span> analytics effortlessly for <span className="text-primary-3 underline underline-offset-2">free</span> .&#34;
            </p>

            <DashboardPreview1 customCSS="w-full" />

            <p className="text-xs font-normal text-center opacity-50 mt-3 mb-8">
                (UI color schema is inspired by <Link className="underline underline-offset-4 decoration-primary-3 text-primary-3 font-bold" href={'https://shavelinks.com/RumanArif00'} target="_blank">@RumanArif00</Link>)
            </p>

            <Link href={'/signUp'} className="w-fit flex items-center gap-2 mx-auto px-8 py-2 bg-primary-3 uppercase rounded-lg sm:text-2xl text-base buttonTransitionCSS">
                get started <JoinWaitlistIcon1 customCSS="sm:w-8 w-6 -mt-[6px]" />
            </Link>
        </section>
    );
}
