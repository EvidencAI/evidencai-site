import { MetadataRoute } from 'next';
import { getPostSlugs, getPostBySlug } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.evidencai.com';
  const lastModified = new Date();

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/ateliers', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/formations', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/formations/decider-avec-ia', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/solutions', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/outils', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/a-propos', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/mentions-legales', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // Pages statiques — uniquement FR
  const staticEntries = pages.map((page) => ({
    url: `${baseUrl}/fr${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Articles de blog — uniquement FR, avec lastmod par article
  const frSlugs = getPostSlugs('fr');
  const blogEntries = frSlugs.map((slug) => {
    const post = getPostBySlug(slug, 'fr');
    const articleDate = post?.dateModified || post?.date;
    return {
      url: `${baseUrl}/fr/blog/${slug}`,
      lastModified: articleDate ? new Date(articleDate) : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...staticEntries, ...blogEntries];
}
