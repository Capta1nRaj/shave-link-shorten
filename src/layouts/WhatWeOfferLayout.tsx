import FeaturesWeOfferBox from "@/components/FeaturesWeOfferBox";
import { WhatWeOfferConstants } from "@/constants/WhatWeOfferConstants";
import { raleway } from "@/fonts/Fonts";

export default async function WhatWeOfferLayout() {
    return (
        <>
            <section className="WhatWeOfferLayout-section bg-primary-2">
                <section className="max-width py-8">
                    <h2 className={`titleCSS ${raleway.className} teeny:block hidden`}>
                        <span className="font-extrabold"> features  </span>
                        <span className="font-normal"> 〰 </span>
                        <span className="font-normal"> we </span>
                        <span className="titleDropShadowCSS underline decoration-4 underline-offset-8"> offer </span>
                    </h2>

                    <h2 className={`titleCSS ${raleway.className} teeny:hidden block`}>
                        <div className="font-extrabold"> features  </div>
                        <span className="font-normal"> we </span>
                        <span className="titleDropShadowCSS underline decoration-4 underline-offset-8"> offer </span>
                    </h2>

                    <section className="features-box-grid my-8 flex flex-wrap justify-center gap-8">
                        {WhatWeOfferConstants.map((item) => {
                            return (
                                <>
                                    <FeaturesWeOfferBox image={item.image} title={item.title} description={item.description} />
                                </>
                            )
                        })}
                    </section>
                </section>
            </section>
        </>
    )
}