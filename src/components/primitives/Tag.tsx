import { cn } from './cn';

interface TagProps {
  children: string;
  className?: string;
}

/** Monospace data-flavored pill for stack items and skills. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1',
        'font-mono text-[0.72rem] leading-none tracking-tight',
        'bg-[var(--bg-elev-2)] text-[var(--text-secondary)]',
        'border border-[var(--border-subtle)]',
        'transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)]',
        'hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]',
        className,
      )}
    >
      {children}
    </span>
  );
}
