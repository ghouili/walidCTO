/**
 * Small "NDA" lock badge shown next to blurred client names in the Work section.
 * Matches `.nda-badge` from the mockup.
 */
export function NDABadge() {
  return (
    <span className="nda-badge-surface text-accent inline-flex items-center gap-[5px] rounded-md py-1 pr-[9px] pl-[7px] font-mono text-[10px] font-medium tracking-[0.06em] whitespace-nowrap uppercase">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-2.5 w-2.5"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
      NDA
    </span>
  );
}
