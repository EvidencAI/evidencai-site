'use client';

import { clarityEvent } from '@/lib/clarity';

interface ReserverAtelierButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ReserverAtelierButton({ href, children, className }: ReserverAtelierButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => clarityEvent('cta_reserver_atelier')}
      className={className}
    >
      {children}
    </a>
  );
}
