import type { ReactNode } from 'react';
import { GlowContainer } from './GlowContainer';
import { cn } from './cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  accentIndex?: number;
  as?: 'div' | 'article';
  /** Padding preset. */
  padding?: 'sm' | 'md' | 'lg';
}

const pad: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-5',
  md: 'p-6 sm:p-7',
  lg: 'p-7 sm:p-9',
};

/** Padded content surface built on the shared GlowContainer treatment. */
export function Card({
  children,
  className,
  accentIndex = 0,
  as = 'div',
  padding = 'md',
}: CardProps) {
  return (
    <GlowContainer as={as} accentIndex={accentIndex} className={cn(pad[padding], className)}>
      {children}
    </GlowContainer>
  );
}
