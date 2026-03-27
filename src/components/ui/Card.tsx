import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
}

export default function Card({ children, className = '', hover = false, id }: CardProps) {
  return (
    <div
      id={id}
      className={`
        bg-white rounded-xl shadow-lg p-6 md:p-8
        ${hover ? 'transition-transform duration-300 hover:scale-105 hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
