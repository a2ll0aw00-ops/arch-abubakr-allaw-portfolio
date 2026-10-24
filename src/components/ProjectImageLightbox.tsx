import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {optimizeImageUrl} from '../lib/sanity';

interface ProjectImageLightboxProps {
  images: string[];
  currentIndex: number;
  title: string;
  lang: 'en' | 'ar';
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function ProjectImageLightbox({
  images,
  currentIndex,
  title,
  lang,
  onClose,
  onIndexChange,
}: ProjectImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageIndex = Math.min(Math.max(currentIndex, 0), images.length - 1);
  const isArabic = lang === 'ar';
  const labels = isArabic
    ? {close: 'إغلاق الصورة', previous: 'الصورة السابقة', next: 'الصورة التالية', count: `الصورة ${imageIndex + 1} من ${images.length}`}
    : {close: 'Close image', previous: 'Previous image', next: 'Next image', count: `Image ${imageIndex + 1} of ${images.length}`};

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (images.length > 1 && event.key === 'ArrowLeft') {
        event.preventDefault();
        onIndexChange((imageIndex + images.length - 1) % images.length);
      } else if (images.length > 1 && event.key === 'ArrowRight') {
        event.preventDefault();
        onIndexChange((imageIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageIndex, images.length, onClose, onIndexChange]);

  if (!images.length || typeof document === 'undefined') return null;

  const imageUrl = optimizeImageUrl(images[imageIndex], {
    width: 1600,
    height: 1200,
    quality: 78,
    fit: 'max',
  });

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isArabic ? `عرض صور مشروع ${title}` : `Project images for ${title}`}
        dir={isArabic ? 'rtl' : 'ltr'}
        className="relative flex h-[calc(100vh-1.5rem)] max-h-[900px] w-full max-w-7xl flex-col items-center justify-between gap-3 text-white sm:h-[calc(100vh-3rem)]"
      >
        <div className="flex w-full shrink-0 items-center justify-between gap-4">
          <p className="min-w-0 truncate text-sm text-white/80">{title}</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="flex min-h-0 w-full flex-1 items-center justify-center gap-2 sm:gap-6">
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => onIndexChange((imageIndex + images.length - 1) % images.length)}
              aria-label={labels.previous}
              className="z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
          )}
          <img
            src={imageUrl}
            alt={`${title} — ${isArabic ? 'صورة' : 'image'} ${imageIndex + 1}`}
            className={`block min-w-0 max-h-full object-contain ${images.length > 1 ? 'max-w-[calc(100%-6.5rem)] sm:max-w-[calc(100%-8.5rem)]' : 'max-w-full'}`}
            loading="eager"
            decoding="async"
          />
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => onIndexChange((imageIndex + 1) % images.length)}
              aria-label={labels.next}
              className="z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          )}
        </div>

        <p aria-live="polite" className="shrink-0 pb-1 text-xs text-white/65">{labels.count}</p>
      </div>
    </div>,
    document.body,
  );
}
