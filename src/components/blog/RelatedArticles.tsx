import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/blog';
import type { Locale } from '@/i18n/config';

interface RelatedArticlesProps {
  posts: BlogPost[];
  locale: Locale;
}

export default function RelatedArticles({ posts, locale }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="font-playfair text-2xl font-bold text-white mb-6">
        {locale === 'fr' ? 'À lire aussi' : 'You might also like'}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group block bg-bleu-nuit-light rounded-xl p-5
              border border-white/10 hover:border-ambre/40
              transition-all duration-300 hover:-translate-y-1"
          >
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${CATEGORY_COLORS[post.category]}`}>
              {CATEGORY_LABELS[post.category][locale]}
            </span>
            <h3 className="font-playfair text-base font-bold text-white mb-2
              group-hover:text-ambre transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-text-secondary text-sm line-clamp-2 mb-3">
              {post.description}
            </p>
            <span className="text-ambre text-xs group-hover:underline">
              {locale === 'fr' ? 'Lire →' : 'Read →'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
