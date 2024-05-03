import { montserrat, raleway } from "@/fonts/Fonts";
import { ReactNode } from "react";

interface FeaturesWeOfferBoxInterface {
    image: ReactNode,
    title: string,
    description: string
}

export default async function FeaturesWeOfferBox({ image, title, description }: FeaturesWeOfferBoxInterface) {
    return (
        <>
            <section className="FeaturesWeOfferBox-section">
                <section className="box- sm:w-[474px] w-auto h-full min-h-[210px] bg-primary-1 p-5 rounded-xl drop-shadow-[0_0px_4px_rgba(242,242,242,0.25)]">

                    <div className={`${raleway.className} font-bold capitalize image-and-title flex items-center teeny:text-4xl text-3xl text-primary-3 gap-3`}>
                        {image} {title}
                    </div>

                    <p className={`${montserrat.className} font-medium description sm:text-xl text-base mt-4`}>
                        {description}
                    </p>

                </section>
            </section>
        </>
    )
}