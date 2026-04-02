import Link from 'next/link';
import type { BlogPost, BlogCategory } from '@/lib/blog';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/blog';
import type { Locale } from '@/i18n/config';

interface BlogCardProps {
  post: BlogPost;
  locale: Locale;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block bg-bleu-nuit-light rounded-xl p-6 
        border border-white/10 hover:border-ambre/40 
        transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[post.category]}`}>
          {CATEGORY_LABELS[post.category][locale]}
        </span>
        <span className="text-text-secondary text-sm">{formattedDate}</span>
      </div>

      <h2 className="font-playfair text-xl font-bold text-white mb-3 
        group-hover:text-ambre transition-colors">
        {post.title}
      </h2>

      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {post.description}
      </p>

      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>{post.readingTime.replace('read', locale === 'fr' ? 'de lecture' : 'read')}</span>
        <span className="text-ambre group-hover:underline">
          {locale === 'fr' ? 'Lire →' : 'Read →'}
        </span>
      </div>
    </Link>
  );
}
