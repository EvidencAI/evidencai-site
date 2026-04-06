import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { locales, type Locale } from '@/i18n/config';
import { getAlternates } from '@/i18n/metadata';
import { getPostBySlug, getPostSlugs, CATEGORY_LABELS } from '@/lib/blog';
import SignalArticle from '@/components/blog/SignalArticle';

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

  const url = `https://evidencai.com/${locale}/blog/${slug}`;
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

  const formattedDate = new Date(post.date).toLocaleDateString(
    loc === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Stéphane Commenge',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EvidencAI',
      url: 'https://evidencai.com',
    },
    mainEntityOfPage: `https://evidencai.com/${loc}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-bleu-nuit min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href={`/${loc}/blog`}
              className="inline-flex items-center text-text-secondary hover:text-ambre transition-colors mb-8"
            >
              ← {loc === 'fr' ? 'Retour au blog' : 'Back to blog'}
            </Link>

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

            {/* CTA */}
            <div className="mt-16 p-8 bg-bleu-nuit-light rounded-xl border border-white/10 text-center">
              <p className="text-white text-lg mb-4 font-medium">
                {loc === 'fr'
                  ? 'Envie d\'aller plus loin ?'
                  : 'Want to go further?'}
              </p>
              {post.cta.href.match(/\.\w+$/) ? (
                <a
                  href={post.cta.href}
                  download
                  className="inline-block min-h-[48px] px-8 py-3 bg-ambre text-white font-semibold 
                    rounded-lg hover:bg-ambre-light transition-all"
                >
                  {post.cta.label}
                </a>
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
