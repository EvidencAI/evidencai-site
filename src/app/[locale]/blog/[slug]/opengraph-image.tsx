import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';
import { CATEGORY_LABELS } from '@/lib/blog';
import type { Locale } from '@/i18n/config';

export const alt = 'Le Signal IA - EvidencAI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  reglementation: '#ef4444',
  adoption: '#E07A5F',
  outils: '#3b82f6',
  competences: '#10b981',
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const post = getPostBySlug(slug, loc);
  if (!post) {
    return new ImageResponse(<div>Not found</div>, { ...size });
  }

  const badgeColor = CATEGORY_BADGE_COLORS[post.category] || '#E07A5F';
  const categoryLabel = CATEGORY_LABELS[post.category][loc];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1a1a2e',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: category badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              backgroundColor: badgeColor,
              color: 'white',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Center: title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            {post.description}
          </div>
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#E07A5F',
              }}
            >
              Le Signal IA
            </div>
            <div style={{ color: '#64748b', fontSize: '24px' }}>|</div>
            <div style={{ color: '#94a3b8', fontSize: '22px' }}>
              evidencai.com
            </div>
          </div>
          <div style={{ color: '#64748b', fontSize: '18px' }}>
            {post.coAuthor}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
