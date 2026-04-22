import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getPostBySlug, CATEGORY_LABELS } from '@/lib/blog';
import type { Locale } from '@/i18n/config';

// Node.js runtime (needs fs for blog content)

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  reglementation: '#ef4444',
  adoption: '#E07A5F',
  outils: '#3b82f6',
  competences: '#10b981',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || '';
  const locale = (searchParams.get('locale') || 'fr') as Locale;
  const format = searchParams.get('format') || 'linkedin';

  const isSquare = format === 'linkedin';
  const width = isSquare ? 1080 : 1200;
  const height = isSquare ? 1080 : 630;

  const post = getPostBySlug(slug, locale);

  // Fallback : image de marque EvidencAI quand le slug est absent ou invalide
  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a2e',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span
                style={{
                  fontSize: isSquare ? '160px' : '140px',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-2px',
                }}
              >
                Evidenc
              </span>
              <span
                style={{
                  fontSize: isSquare ? '160px' : '140px',
                  fontWeight: 700,
                  color: '#E07A5F',
                  letterSpacing: '-2px',
                }}
              >
                AI
              </span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: isSquare ? '32px' : '28px' }}>
              Pour une IA qui vous ameliore.
            </div>
            <div style={{ color: '#64748b', fontSize: isSquare ? '22px' : '20px', marginTop: '16px' }}>
              evidencai.com
            </div>
          </div>
        </div>
      ),
      { width, height }
    );
  }
  const badgeColor = CATEGORY_BADGE_COLORS[post.category] || '#E07A5F';
  const categoryLabel = CATEGORY_LABELS[post.category][locale];

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
          padding: isSquare ? '80px' : '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: Le Signal IA branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#E07A5F' }}>
            Le Signal IA
          </div>
          <div
            style={{
              backgroundColor: badgeColor,
              color: 'white',
              padding: '6px 16px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Center: title + signal bloc */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: isSquare ? '42px' : '44px',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </div>
          {/* Signal bloc highlight */}
          <div
            style={{
              borderLeft: '4px solid #E07A5F',
              paddingLeft: '20px',
              fontSize: '22px',
              color: '#94a3b8',
              lineHeight: 1.5,
            }}
          >
            {post.signal.signal.length > 160
              ? post.signal.signal.slice(0, 157) + '...'
              : post.signal.signal}
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
          <div style={{ color: '#94a3b8', fontSize: '20px' }}>
            evidencai.com
          </div>
          <div style={{ color: '#64748b', fontSize: '18px' }}>
            {post.coAuthor}
          </div>
        </div>
      </div>
    ),
    { width, height }
  );
}
