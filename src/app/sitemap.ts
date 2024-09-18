import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        { url: `https://shavelinks.com/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/about-us`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/privacy-policy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/shipping-and-return-Policy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/signup`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/forgotpassword`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/return-refund-policy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
        { url: `https://shavelinks.com/contact-us`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
    ]
}