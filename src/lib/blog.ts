import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Locale } from '@/i18n/config';

export type BlogCategory = 'reglementation' | 'adoption' | 'outils' | 'competences';

export interface SignalBloc {
  fact: string;
  signal: string;
  action: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  signal: SignalBloc;
  cta: {
    label: string;
    href: string;
  };
  coAuthor: string;
  readingTime: string;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function getPostSlugs(locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    signal: {
      fact: data.fact,
      signal: data.signal,
      action: data.action,
    },
    cta: {
      label: data.ctaLabel || 'Découvrir les ateliers',
      href: data.ctaHref || '/fr/ateliers',
    },
    coAuthor: data.coAuthor || 'Claude & Stéphane Commenge',
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(locale: Locale): BlogPost[] {
  const slugs = getPostSlugs(locale);
  return slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const CATEGORY_LABELS: Record<BlogCategory, Record<Locale, string>> = {
  reglementation: { fr: 'Réglementation', en: 'Regulation' },
  adoption: { fr: 'Adoption', en: 'Adoption' },
  outils: { fr: 'Outils', en: 'Tools' },
  competences: { fr: 'Compétences', en: 'Skills' },
};

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  reglementation: 'bg-red-500/20 text-red-300',
  adoption: 'bg-ambre/20 text-ambre',
  outils: 'bg-blue-500/20 text-blue-300',
  competences: 'bg-emerald-500/20 text-emerald-300',
};
