import type { ReactNode } from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps {
  as?: 'a' | 'button';
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-medium ' +
  'transition-[transform,background-color,border-color,box-shadow] ' +
  'duration-[var(--dur-base)] ease-[var(--ease-standard)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-1)] ' +
  'active:translate-y-px select-none whitespace-nowrap';

const sizes: Record<Size, string> = {
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3',
};

const variants: Record<Variant, string> = {
  primary:
    'text-[#04110f] bg-[var(--accent-1)] border border-transparent ' +
    'shadow-[0_8px_30px_-10px_rgba(var(--accent-1-rgb),0.6)] ' +
    'hover:brightness-110 hover:-translate-y-0.5',
  ghost:
    'text-[var(--text-primary)] bg-[rgba(255,255,255,0.02)] ' +
    'border border-[var(--border-strong)] backdrop-blur-sm ' +
    'hover:border-[rgba(var(--accent-1-rgb),0.4)] hover:-translate-y-0.5 ' +
    'hover:bg-[rgba(var(--accent-1-rgb),0.06)]',
};

export function Button({
  as = 'button',
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className,
  ariaLabel,
  external,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (as === 'a') {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
