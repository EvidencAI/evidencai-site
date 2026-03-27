import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  href?: string;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'min-h-[48px] px-6 py-3 font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-ambre text-bleu-nuit hover:bg-ambre-light hover:shadow-lg active:scale-95',
    secondary: 'border-2 border-white text-white hover:bg-white hover:text-bleu-nuit active:scale-95',
    ghost: 'text-white hover:bg-white/10 active:scale-95',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
