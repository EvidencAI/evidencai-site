import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionaries';
import { getAlternates } from '@/i18n/metadata';
import { locales, type Locale } from '@/i18n/config';
import { getAllPosts, CATEGORY_LABELS, type BlogCategory } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.blog.metadata.title,
    description: dict.blog.metadata.description,
    openGraph: {
      title: dict.blog.metadata.title,
      description: dict.blog.metadata.description,
      url: `https://www.evidencai.com/${locale}/blog`,
    },
    ...getAlternates(locale as Locale, '/blog'),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const posts = getAllPosts(loc);

  const breadcrumbSchema = buildBreadcrumbSchema(loc, [
    { name: 'Blog', url: `/${loc}/blog` },
  ]);

  return (
    <div className="bg-bleu-nuit min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            {dict.blog.title}
          </h1>
          <p className="text-xl text-ambre font-medium mb-2">
            {dict.blog.subtitle}
          </p>
          <p className="text-text-secondary text-lg">
            {dict.blog.description}
          </p>
        </div>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} locale={loc} />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-16">
            <p className="text-text-secondary text-lg">
              {dict.blog.empty}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
