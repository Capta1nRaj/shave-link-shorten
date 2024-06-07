'use server'

export const ExtractOGMetadata = async (url: string | URL | Request) => {
    try {
        const response = await fetch(url);
        const html = await response.text();

        const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"\s*\/?>/i);
        const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/i);
        const ogDescriptionMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"\s*\/?>/i);

        const ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;
        const ogImage = ogImageMatch ? ogImageMatch[1] : null;
        const ogDescription = ogDescriptionMatch ? ogDescriptionMatch[1] : null;

        return { ogTitle, ogImage, ogDescription };
    } catch (error) {
        console.error('Error fetching OG metadata:', error);
        return {
            ogTitle: 'Shave - Short Your Links',
            ogDescription: 'Shorten URLs effortlessly for seamless sharing across all platforms with ease.',
            ogImage: 'https://shave-links-production.s3.ap-south-1.amazonaws.com/root-images/CompanyLogo1.png'
        };
    }
};