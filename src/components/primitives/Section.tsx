import type { ReactNode } from 'react';
import { cn } from './cn';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Removes the max-width container for full-bleed sections (e.g. Hero). */
  bleed?: boolean;
  'aria-label'?: string;
}

/** Consistent vertical rhythm + centered content column for every section. */
export function Section({ id, children, className, bleed, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative w-full', className)}
      style={{ paddingBlock: 'var(--section-py)' }}
      {...rest}
    >
      {bleed ? (
        children
      ) : (
        <div
          className="mx-auto w-full"
          style={{ maxWidth: 'var(--content-max)', paddingInline: 'var(--gutter)' }}
        >
          {children}
        </div>
      )}
    </section>
  );
}
