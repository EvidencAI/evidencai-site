import { MetadataRoute } from 'next';
import { getPostSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.evidencai.com';
  const lastModified = new Date();

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/ateliers', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/formation', changeFrequency: 'monthly' as const, priority: 0.8 },
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

  // Articles de blog — uniquement FR
  const frSlugs = getPostSlugs('fr');
  const blogEntries = frSlugs.map((slug) => ({
    url: `${baseUrl}/fr/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
