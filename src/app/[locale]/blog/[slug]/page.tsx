import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { locales, type Locale } from '@/i18n/config';
import { getAlternates } from '@/i18n/metadata';
import { getPostBySlug, getPostSlugs, getRelatedPosts, CATEGORY_LABELS } from '@/lib/blog';
import SignalArticle from '@/components/blog/SignalArticle';
import RelatedArticles from '@/components/blog/RelatedArticles';
import DownloadCTAButton from '@/components/blog/DownloadCTAButton';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const slugs = getPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as Locale);
  if (!post) return {};

  const url = `https://www.evidencai.com/${locale}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    ...getAlternates(locale as Locale, `/blog/${slug}`),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.coAuthor],
      siteName: 'EvidencAI',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const post = getPostBySlug(slug, loc);
  if (!post) notFound();

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: loc === 'fr' ? 'Accueil' : 'Home',
        item: `https://www.evidencai.com/${loc}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `https://www.evidencai.com/${loc}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.evidencai.com/${loc}/blog/${slug}`,
      },
    ],
  };

  const relatedPosts = getRelatedPosts(slug, loc);

  const formattedDate = new Date(post.date).toLocaleDateString(
    loc === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    image: `https://www.evidencai.com/og-image.png`,
    author: {
      '@type': 'Person',
      name: 'Stéphane Commenge',
      url: 'https://www.evidencai.com/fr/a-propos',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EvidencAI',
      url: 'https://www.evidencai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.evidencai.com/logo-evidencai.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.evidencai.com/${loc}/blog/${slug}`,
    },
    inLanguage: loc === 'fr' ? 'fr-FR' : 'en-US',
  };

  // FAQPage schema (optionnel, alimenté via frontmatter)
  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="bg-bleu-nuit min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb visuel */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-text-secondary">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href={`/${loc}`} className="hover:text-ambre transition-colors">
                    {loc === 'fr' ? 'Accueil' : 'Home'}
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link href={`/${loc}/blog`} className="hover:text-ambre transition-colors">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li className="text-white/70 truncate max-w-[250px]" title={post.title}>
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <time dateTime={post.date}>{formattedDate}</time>
                <span>·</span>
                <span>{post.readingTime.replace('read', loc === 'fr' ? 'de lecture' : 'read')}</span>
                <span>·</span>
                <span>{post.coAuthor}</span>
              </div>
            </header>

            {/* Signal IA - 3 blocs */}
            <SignalArticle signal={post.signal} category={post.category} locale={loc} />

            {/* Contenu MDX libre (bonus) */}
            {post.content.trim() && (
              <div className="mt-12 prose prose-invert prose-lg max-w-none
                prose-headings:font-playfair prose-headings:text-white
                prose-a:text-ambre prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-p:text-text-secondary
                prose-li:text-text-secondary
                prose-p:mb-6 prose-headings:mt-12 prose-headings:mb-6
                prose-h3:mt-10">
                <MDXRemote source={post.content} />
              </div>
            )}

            {/* Articles liés */}
            <RelatedArticles posts={relatedPosts} locale={loc} />

            {/* CTA */}
            <div className="mt-16 p-8 bg-bleu-nuit-light rounded-xl border border-white/10 text-center">
              <p className="text-white text-lg mb-4 font-medium">
                {loc === 'fr'
                  ? 'Envie d\'aller plus loin ?'
                  : 'Want to go further?'}
              </p>
              {post.cta.href.match(/\.\w+$/) ? (
                <DownloadCTAButton href={post.cta.href} label={post.cta.label} />
              ) : (
                <Link
                  href={`/${loc}${post.cta.href.replace(/^\/(fr|en)/, '')}`}
                  className="inline-block min-h-[48px] px-8 py-3 bg-ambre text-white font-semibold
                    rounded-lg hover:bg-ambre-light transition-all"
                >
                  {post.cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
