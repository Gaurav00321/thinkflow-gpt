import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',       // Disallow crawling of internal API routes to save crawl budget
                '/dashboard/', // Disallow private logged-in routes
                '/admin/',     // Disallow admin areas
            ],
        },
        sitemap: 'https://thinkflowgpt.vercel.app/sitemap.xml',
    };
}
