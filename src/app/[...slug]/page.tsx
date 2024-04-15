import ShowAdComponent from "@/components/ShowAdComponent";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {

    async function getLink() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/RedirectToLink?alias=${params.slug[0]}`, { cache: 'no-store' })
        return await response.json();
    }

    const { message, statusCode, primaryURL, toSupport } = await getLink()

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