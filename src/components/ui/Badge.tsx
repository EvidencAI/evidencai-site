import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'debutant' | 'intermediaire' | 'confirme' | 'default';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    debutant: 'bg-green-100 text-green-800 border-green-200',
    intermediaire: 'bg-blue-100 text-blue-800 border-blue-200',
    confirme: 'bg-purple-100 text-purple-800 border-purple-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
