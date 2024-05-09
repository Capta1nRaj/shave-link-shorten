import ShowAdComponent from "@/components/ShowAdComponent";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
    async function getLink() {
        try {
            if (params.slug.length > 1) { return { statusCode: 404 }; }

            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/RedirectToLink?alias=${params.slug[0]}`, { cache: 'no-store' })

            const data = await response.json(); return data;

        } catch (error) {
            return { primaryURL: "" };
        }
    }

    const { primaryURL } = await getLink()

    if (!primaryURL) { notFound(); }

    if (primaryURL) { return (<ShowAdComponent primaryURL={primaryURL} />); }

    redirect(primaryURL);
}