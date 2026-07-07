import { site } from '../../content/site';
import { copy } from '../../content/copy';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border-subtle)]">
      <div
        className="mx-auto flex w-full flex-col items-center justify-between gap-4 py-8 sm:flex-row"
        style={{ maxWidth: 'var(--content-max)', paddingInline: 'var(--gutter)' }}
      >
        <p className="text-sm text-[var(--text-muted)]">
          © {year} {site.name}
        </p>
        <p className="font-mono text-[0.72rem] tracking-tight text-[var(--text-muted)]">
          {copy.footerNote}
        </p>
        <div className="flex gap-4">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-1)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
