import { cn } from '@/lib/utils';

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  optional?: boolean;
  isFilled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ icon, title, optional, isFilled, children, className }: SectionCardProps) {
  return (
    <div
      className={cn('rounded-xl border p-5', className)}
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-warm-sm)',
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--color-brand-100)', color: 'var(--accent)' }}
        >
          {icon}
        </div>
        <h3
          className="font-semibold text-base flex-1"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {isFilled && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: '#EDFAF3', color: 'var(--color-success)' }}
            >
              ✓
            </span>
          )}
          {optional && (
            <span
              className="text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{ color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
            >
              Optional
            </span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

interface FieldGroupProps {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export function FieldGroup({ label, required, error, htmlFor, children }: FieldGroupProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
        {required && (
          <span className="ml-0.5" style={{ color: 'var(--color-error)' }} aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs" style={{ color: 'var(--color-error)' }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
