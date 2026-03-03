import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://thinkflowgpt.vercel.app';

    // Core Pages
    const corePages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/features`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/use-cases`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    /* 
     * Placeholder for dynamic routing (Blog Posts, Integrations).
     * In a full implementation, you would fetch these from a database/CMS:
     * 
     * const posts = await getBlogPosts();
     * const postUrls = posts.map(post => ({
     *   url: `${baseUrl}/blog/${post.slug}`,
     *   lastModified: post.updatedAt,
     *   ...
     * }));
     *
     * return [...corePages, ...postUrls];
     */

    return corePages;
}
