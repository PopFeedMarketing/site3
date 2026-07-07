import { useEffect, useState } from 'react';
import { Button } from '../primitives/Button';
import { cn } from '../primitives/cn';
import { site } from '../../content/site';
import { copy } from '../../content/copy';

const LINKS = copy.nav;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-base)] ease-[var(--ease-standard)]',
        scrolled || open
          ? 'border-b border-[var(--border-subtle)] bg-[rgba(8,11,15,0.72)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full items-center justify-between"
        style={{ maxWidth: 'var(--content-max)', paddingInline: 'var(--gutter)' }}
      >
        <a
          href="#top"
          className="group inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
          aria-label={`${site.name} — home`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--bg-elev-2)] font-mono text-sm text-[var(--accent-1)] transition-colors duration-[var(--dur-base)] group-hover:border-[rgba(var(--accent-1-rgb),0.4)]">
            {site.monogram}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-primary)]"
            >
              {l.label}
            </a>
          ))}
          <Button as="a" href={site.resumeUrl} variant="ghost" size="md" external className="ml-2">
            {copy.resumeLabel}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] text-[var(--text-primary)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                'absolute left-0 h-0.5 w-5 bg-current transition-all duration-[var(--dur-base)]',
                open ? 'top-1.5 rotate-45' : 'top-0.5',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-[var(--dur-fast)]',
                open && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 h-0.5 w-5 bg-current transition-all duration-[var(--dur-base)]',
                open ? 'top-1.5 -rotate-45' : 'top-2.5',
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile disclosure menu */}
      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden md:hidden transition-[max-height,opacity] duration-[var(--dur-base)] ease-[var(--ease-standard)]',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div
          className="mx-auto flex flex-col gap-1 pb-4"
          style={{ maxWidth: 'var(--content-max)', paddingInline: 'var(--gutter)' }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-elev-2)] hover:text-[var(--text-primary)]"
            >
              {l.label}
            </a>
          ))}
          <Button
            as="a"
            href={site.resumeUrl}
            variant="ghost"
            size="md"
            external
            className="mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            {copy.resumeLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}
