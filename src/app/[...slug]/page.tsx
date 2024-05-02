import ShowAdComponent from "@/components/ShowAdComponent";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
    async function getLink() {

        if (params.slug.length > 1) {
            return { statusCode: 404 };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/RedirectToLink?alias=${params.slug[0]}`, { cache: 'no-store' })
        const data = await response.json()
        return data;
    }

    const { primaryURL, toSupport } = await getLink()

    if (!primaryURL) {
        notFound();
        return;
    }

    if (toSupport) {
        return (
            <ShowAdComponent
                primaryURL={primaryURL}
            />
        );
    }

    redirect(primaryURL);
}