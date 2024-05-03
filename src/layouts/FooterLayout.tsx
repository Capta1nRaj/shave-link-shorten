import { raleway, roboto } from "@/fonts/Fonts";
import { CompanyLogo1 } from "@/images/ImagesExport";
import Link from "next/link";
import FooterConstants from '@/constants/FooterConstants.json'

export default function FooterLayout() {
    return (
        <>
            <footer className={`FooterLayout-section ${raleway.className} font-extrabold mt-[100px] bg-primary-2`}>
                <section className="max-width py-10 flex md:flex-row flex-col justify-between">

                    <div className={`left-side ${roboto.className} font-medium text-primary-4 md:w-96 w-full flex flex-col justify-center md:text-left text-center`}>
                        <CompanyLogo1 customCSS="md:mx-0 mx-auto mb-2" />
                        Shave Link Shortener is a tool for streamlined sharing. Create concise, custom links effortlessly. Track engagement seamlessly. Simplify your online presence with Shave Link Shortener.
                    </div>

                    <div className="right-side text-lg flex flex-col sm:text-left text-center gap-y-1 md:mt-0 mt-10">
                        {FooterConstants.map((item) => {
                            return (
                                <Link className={item.css} href={process.env.NEXT_PUBLIC_DOMAIN_NAME_1 + item.link} key={item.title}> {item.title} </Link>
                            )
                        })}
                    </div>

                </section>
            </footer>
        </>
    )
}