import type { ReactNode } from 'react';
import { cn } from './cn';

interface GlowContainerProps {
  children: ReactNode;
  className?: string;
  /** 0..2 — selects the accent used for the hover/focus glow. */
  accentIndex?: number;
  as?: 'div' | 'article' | 'section';
}

const accentVar = ['--accent-1', '--accent-2', '--accent-3'] as const;
const accentRgbVar = ['--accent-1-rgb', '--accent-2-rgb', '--accent-3-rgb'] as const;

/**
 * The one consistent card surface treatment (§4 "gloss = depth discipline"):
 * 1px low-alpha border + soft elevation shadow + a faint accent glow that
 * appears ONLY on hover/focus-within. No permanent glow.
 */
export function GlowContainer({
  children,
  className,
  accentIndex = 0,
  as: Tag = 'div',
}: GlowContainerProps) {
  const i = accentIndex % 3;
  const style = {
    '--glow': `var(${accentVar[i]})`,
    '--glow-rgb': `var(${accentRgbVar[i]})`,
  } as React.CSSProperties;

  return (
    <Tag
      style={style}
      className={cn(
        'group relative rounded-[var(--radius-lg)] bg-[var(--bg-elev-1)]',
        'border border-[var(--border-subtle)] shadow-[var(--shadow-card)]',
        'transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]',
        'hover:border-[rgba(var(--glow-rgb),0.35)]',
        'hover:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_24px_56px_-20px_rgba(0,0,0,0.7),0_0_44px_-16px_rgba(var(--glow-rgb),0.55)]',
        'focus-within:border-[rgba(var(--glow-rgb),0.4)]',
        className,
      )}
    >
      {/* top hairline sheen — the quiet "glossy" cue */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[var(--radius-lg)] bg-gradient-to-r from-transparent via-[rgba(var(--glow-rgb),0.4)] to-transparent opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
      />
      {children}
    </Tag>
  );
}
