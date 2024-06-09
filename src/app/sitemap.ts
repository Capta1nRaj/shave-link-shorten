import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    return [
        {
            url: `https://shavelinks.com`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `https://shavelinks.com/about-us`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }, {
            url: `https://shavelinks.com/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    ]
}