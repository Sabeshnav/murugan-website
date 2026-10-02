export function VelIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 64" className={className} aria-hidden>
      <path d="M12 1 C18 10 20 17 12 27 C4 17 6 10 12 1 Z" fill="currentColor" />
      <path d="M8.5 12.5h7M8 15.5h8M8.5 18.5h7" stroke="var(--vel-stripe, #fff8e8)" strokeWidth="1.2" />
      <circle cx="12" cy="22" r="1.4" fill="#c0281c" />
      <rect x="10.6" y="27" width="2.8" height="36" rx="1.4" fill="currentColor" />
      <rect x="8.5" y="27.5" width="7" height="3" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LotusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 4c2 2.6 2.6 5.4 0 9-2.6-3.6-2-6.4 0-9zM12 13c-2.8-1-5.6-.6-8 1.6 2.6 2.2 5.4 2.4 8 .4 2.6 2 5.4 1.8 8-.4-2.4-2.2-5.2-2.6-8-1.6zM4 18.5h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 20l1-4L16 5l3 3L8 19l-4 1zM14 7l3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
