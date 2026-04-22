'use client';

import Link from 'next/link';
import { clarityEvent } from '@/lib/clarity';

interface CTAAteliersButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function CTAAteliersButton({ href, children, className }: CTAAteliersButtonProps) {
  return (
    <Link
      href={href}
      onClick={() => clarityEvent('cta_header_ateliers')}
      className={className}
    >
      {children}
    </Link>
  );
}
