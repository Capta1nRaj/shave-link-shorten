import RedirectPageBySlugData from "./RedirectPageBySlugData";
import { Metadata } from "next";
import linksListModel from "@/models/linksListModel";
import { connect2MongoDB } from "connect2mongodb";
import { ExtractOGMetadata } from "@/utils/ExtractOGMetadata";

async function getDestinationURL(alias: string) {
    'use server'
    if (alias !== '_next') {
        await connect2MongoDB();
        const fetchAliasData = await linksListModel.findOne({ alias: alias }).select('destinationURL');
        return fetchAliasData?.destinationURL || '';
    }
}

export async function generateMetadata({ params }: { params: { slug: [string, string] } }): Promise<Metadata> {
    if (params.slug[0] !== "_next") {
        const url = await getDestinationURL(params.slug[0]);

        const fetchData = async () => {
            const metadata = await ExtractOGMetadata(url);
            return metadata;
        };

        const data = await fetchData(); // Wait for fetchData to resolve

        return {
            title: data.ogTitle || 'Loading....',
            description: data.ogDescription || 'Loading....',
            openGraph: {
                url: url,
                type: 'website',
                title: data.ogTitle || "Shave - Short Your Links",
                description: data.ogDescription || "Shorten URLs effortlessly for seamless sharing across all platforms with ease.",
                images: data.ogImage || "https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png"
            },
            twitter: {
                card: "summary_large_image",
                title: data.ogTitle || "Shave - Short Your Links",
                description: data.ogDescription || "Shorten URLs effortlessly for seamless sharing across all platforms with ease.",
                images: data.ogImage || "https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/OpenGraphImage.png"
            },
        }
    } else {
        return {
            title: 'Loading....', description: 'Loading....',
        }
    }
}

export default async function Page() {
    return (
        <div>
            <RedirectPageBySlugData />
        </div>
    )
}