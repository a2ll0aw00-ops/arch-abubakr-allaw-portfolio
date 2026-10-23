import {ArrowUpRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useI18n} from '../i18n/I18nContext';
import {useCustomContentSections} from '../hooks';
import {optimizeImageUrl} from '../lib/sanity';

type Props = {page: string};

type ContentSection = {
  _id: string;
  titleAr?: string;
  titleEn?: string;
  bodyAr?: string;
  bodyEn?: string;
  linkUrl?: string;
  linkLabelAr?: string;
  linkLabelEn?: string;
  image?: {url?: string; hotspot?: {x?: number; y?: number}; altAr?: string; altEn?: string};
};

function isSafeHref(value: string) {
  return (value.startsWith('/') && !value.startsWith('//')) || /^(https?:\/\/|mailto:|tel:)/i.test(value);
}

export default function CustomContentSections({page}: Props) {
  const {lang} = useI18n();
  const {sections} = useCustomContentSections(page);
  if (!sections.length) return null;

  return (
    <>
      {sections.map((section: ContentSection) => {
        const title = (lang === 'ar' ? section.titleAr : section.titleEn) || section.titleAr || section.titleEn || '';
        const body = (lang === 'ar' ? section.bodyAr : section.bodyEn) || section.bodyAr || section.bodyEn || '';
        const label = (lang === 'ar' ? section.linkLabelAr : section.linkLabelEn) || section.linkLabelAr || section.linkLabelEn || (lang === 'ar' ? 'اعرف المزيد' : 'Learn more');
        const href = section.linkUrl?.trim() || '';
        const safeHref = href && isSafeHref(href) ? href : '';
        const image = section.image;
        const imageUrl = image?.url || '';
        const focusX = image?.hotspot?.x;
        const focusY = image?.hotspot?.y;
        const srcSet = imageUrl
          ? [480, 760, 1100, 1440].map((width) => `${optimizeImageUrl(imageUrl, {width, height: Math.round(width * 3 / 4), fit: 'crop', quality: 78, focusX, focusY})} ${width}w`).join(', ')
          : undefined;
        const imageSrc = imageUrl ? optimizeImageUrl(imageUrl, {width: 1100, height: 825, fit: 'crop', quality: 78, focusX, focusY}) : '';
        const alt = (lang === 'ar' ? image?.altAr : image?.altEn) || title;
        const internal = safeHref.startsWith('/');

        return (
          <section key={section._id} className="border-t border-navy/10 bg-white py-12 sm:py-16">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-12">
              <div className={imageUrl ? '' : 'max-w-3xl'}>
                <h2 className="mb-5 border-b border-navy/10 pb-3 text-xl font-semibold text-navy sm:text-2xl">
                  {title}
                </h2>
                <p dir={lang === 'ar' ? 'rtl' : 'ltr'} className="whitespace-pre-line text-sm leading-7 text-navy/75 sm:text-base">
                  {body}
                </p>
                {safeHref && (
                  internal ? (
                    <Link to={safeHref} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bronze hover:text-navy">
                      {label}<ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  ) : (
                    <a href={safeHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bronze hover:text-navy">
                      {label}<ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )
                )}
              </div>
              {imageSrc && (
                <div className="aspect-[4/3] overflow-hidden bg-navy/5">
                  <img
                    src={imageSrc}
                    srcSet={srcSet}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{objectPosition: typeof focusX === 'number' && typeof focusY === 'number' ? `${focusX * 100}% ${focusY * 100}%` : 'center'}}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
