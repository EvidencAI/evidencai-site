import { permanentRedirect } from 'next/navigation';

export default async function FormationRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  permanentRedirect(`/${locale}/formations`);
}
