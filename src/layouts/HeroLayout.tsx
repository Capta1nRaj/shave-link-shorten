import { DashboardPreview1 } from "@/images/ImagesExport";
import { raleway } from "@/misc/Fonts";
import Link from "next/link";

export const customTitleCSS = `lg:text-7xl md:text-6xl sm:text-5xl text-3xl text-center uppercase font-extrabold lg:leading-7xl md:leading-6xl sm:leading-5xl leading-3xl uppercase`;

export default function HeroLayout() {
    return (
        <section id="home" className={`IntroLayout-section ${raleway.className} font-extrabold py-16 bg-custom-dark`}>
            <section className="max-width">
                <h1 className={`${customTitleCSS} whitespace-nowrap text-custom-white`}>
                    shorten your <span className={`text-custom-blue drop-shadow-[0_1px_1px_rgba(0,171,240,1)]`}>links</span> <br />
                    maximize your <span className={`text-custom-blue drop-shadow-[0_1px_1px_rgba(0,171,240,1)]`}>reach</span> <br />
                </h1>


                <h3 className="mt-3 mb-8 sm:text-base text-xs font-bold uppercase text-center mx-auto lg:w-fit sm:w-[30rem] w-80 text-custom-white">
                    &#34;get real-time <span className="text-custom-blue underline underline-offset-2">click analytics</span> with the <span className="text-custom-blue underline underline-offset-2">link shortener</span> that <span className="text-custom-blue underline underline-offset-2">boosts</span> your business for <span className="text-custom-blue underline underline-offset-2">free</span>.&#34;
                </h3>

                <DashboardPreview1 className="w-full" />

                <p className="text-xs font-normal text-center mt-3 mb-8 text-white/50">
                    (UI color schema is inspired by <Link href={'https://shavel.ink/RumanArif00'} title="RumanArif00 twitter" className="underline underline-offset-4 decoration-sectext-custom-crimson text-custom-blue hover:text-custom-crimson defaultTransitionCSS font-bold" target="_blank">@RumanArif00</Link>)
                </p>

                <Link href={'/signup'} className="w-fit flex items-center gap-2 mx-auto px-8 py-2 bg-custom-blue text-custom-white uppercase rounded-lg sm:text-2xl text-base hover:bg-custom-white hover:text-custom-dark transition-all ease-in-out duration-500">
                    start boosting business
                </Link>
            </section>
        </section>
    );
}