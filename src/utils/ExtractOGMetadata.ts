'use server'
// Import necessary modules and functions
import MetadataDefaultValuesJSON from '@/constants/MetadataDefaultValuesJSON.json'; // Import default values for metadata
import { JSDOM } from 'jsdom'; // Import JSDOM for HTML parsing
import { GetDomainFromUrl } from './GetDomainFromUrl';

// Define the function to extract Open Graph metadata from a URL
export const ExtractOGMetadata = async (url: string | URL | Request) => {
    // Clear console for debugging purposes

    try {
        // Fetch HTML content from the provided URL
        const response = await fetch(url);
        const html = await response.text();

        // Create a DOM object from the HTML content
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Helper function to extract content from meta tags
        const getMetaContent = (property: string, isOg: boolean = true) => {
            const metaTag = document.querySelector(`meta[${isOg ? 'property' : 'name'}="${property}"]`);
            return metaTag ? metaTag.getAttribute('content') : null;
        };

        // Extract Open Graph metadata or fallback to standard values
        const ogTitle = getMetaContent('og:title') || document.title; // Fallback to standard description;
        const ogDescription = getMetaContent('og:description') || getMetaContent('description', false); // Fallback to standard description
        let ogImage = getMetaContent('og:image') || getMetaContent('image', false);

        // Get the domain from the provided URL
        const domain = GetDomainFromUrl(url as string);

        // If no image found, try to get the favicon.ico
        if (!ogImage) {
            const faviconLink = document.querySelector(`link[rel="icon"]`);
            ogImage = faviconLink ? "https://" + domain + faviconLink.getAttribute('href') : ''; // Construct absolute URL for favicon
        }

        // Return the extracted metadata
        return {
            ogTitle: ogTitle || MetadataDefaultValuesJSON[0].ogTitle,
            ogDescription: ogDescription || MetadataDefaultValuesJSON[0].ogDescription,
            ogImage: ogImage || "", // Fallback to empty string if no image found
            ogURL: url
        };
    } catch (error) {
        // Log and handle errors
        console.error('Error fetching OG metadata:', error);
        return {
            ogTitle: MetadataDefaultValuesJSON[0].ogTitle,
            ogDescription: MetadataDefaultValuesJSON[0].ogDescription,
            ogImage: '', // Fallback to empty string in case of error
            ogURL: MetadataDefaultValuesJSON[0].ogURL
        };
    }
};
