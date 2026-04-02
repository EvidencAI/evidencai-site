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

  const locales = ['fr', 'en'] as const;

  // Static pages
  const staticEntries = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: locale === 'fr' ? page.priority : page.priority * 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
        ),
      },
    }))
  );

  // Blog articles
  const frSlugs = getPostSlugs('fr');
  const blogEntries = frSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: locale === 'fr' ? 0.7 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...blogEntries];
}
