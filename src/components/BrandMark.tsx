import { useSiteSettings } from '../hooks';

type BrandMarkProps = {
  className?: string;
};

/** Uses the managed logo when available and preserves the existing facade mark as fallback. */
export default function BrandMark({ className = '' }: BrandMarkProps) {
  const { settings } = useSiteSettings();
  const logoUrl = settings?.logoUrl;
  const scale = Math.min(200, Math.max(50, Number(settings?.logoScale) || 100));

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        aria-hidden="true"
        className={`${className} object-contain`}
        style={{ transform: `scale(${scale / 100})`, transformOrigin: 'center' }}
      />
    );
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M5.5 41.5H42.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M9.5 41.5V17.5L24 7L38.5 17.5V41.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15.5 41.5V21.8L24 15.7L32.5 21.8V41.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M20 41.5V29L24 26L28 29V41.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 17.5H42" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
