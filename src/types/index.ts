// Multilingual text object (for internal use)
export interface MultilingualText {
  en?: string;
  ar?: string;
}

// Category reference (from Sanity)
export interface CategoryRef {
  _ref: string;
  _type: 'reference';
}

// Resolved category (after GROQ join) - now returns simplified strings
export interface ResolvedCategory {
  _id: string;
  _type: 'category';
  name?: string; // Simplified by coalesce in GROQ
  nameEn?: string;
  nameAr?: string;
  slug?: { current: string };
}

// Project interface - simplified to match GROQ output
// GROQ queries use coalesce() to return simple strings
export interface Project {
  _id: string;
  _type: string;
  title: string | MultilingualText;
  titleAr?: string;
  titleEn?: string;
  slug?: { current: string };
  subtitle?: string | MultilingualText;
  subtitleAr?: string;
  subtitleEn?: string;
  description?: string | MultilingualText;
  descriptionAr?: string;
  descriptionEn?: string;
  // Category can be resolved object or simple string
  category?: ResolvedCategory | string;
  categoryName?: string;
  categoryNameAr?: string;
  categoryNameEn?: string;
  location?: string | MultilingualText;
  locationAr?: string;
  locationEn?: string;
  year?: string;
  area?: string;
  client?: string;
  status?: string;
  role?: string | MultilingualText;
  roleAr?: string;
  roleEn?: string;
  scope?: string | MultilingualText;
  scopeAr?: string;
  scopeEn?: string;
  designConcept?: string | MultilingualText;
  designConceptAr?: string;
  designConceptEn?: string;
  methodology?: string | MultilingualText;
  methodologyAr?: string;
  methodologyEn?: string;
  software?: string[];
  coverImage?: SanityImage | string;
  gallery?: Array<SanityImage | string>;
  featured?: boolean;
  order?: number;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

export interface Service {
  _id: string;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  icon?: string;
  image?: string;
  gallery?: string[];
  upworkUrl?: string;
  startingPrice?: string;
  currency?: string;
  packages?: Array<{ nameEn?: string; nameAr?: string; price?: string; currency?: string; descriptionEn?: string; descriptionAr?: string; deliveryTime?: string; features?: string[] }>;
}

export interface HeroSettings {
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  description: string;
  descriptionAr?: string;
  ctaText: string;
  ctaTextAr?: string;
  ctaLink: string;
  backgroundImage?: SanityImage;
  overlayOpacity: number;
}

export interface SiteSettings {
  _id?: string;
  siteName?: string;
  tagline?: string;
  fullName?: string;
  fullNameAr?: string;
  about?: string;
  aboutAr?: string;
  aboutImage?: SanityImage;
  email?: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  locationAr?: string;
  nationality?: string;
  nationalityAr?: string;
  cvPdf?: any;
  socialLinks?: { platform: string; url: string }[];
  logoUrl?: string;
  logoLightUrl?: string;
  logoScale?: number;
  shareImage?: { url?: string; hotspot?: {x: number; y: number}; crop?: {top: number; bottom: number; left: number; right: number} };
  shareImageUrl?: string;
}

// Helper function to extract text based on language
// Now handles both simplified strings and multilingual objects
export function getLocalizedText(
  value: string | MultilingualText | undefined,
  lang: 'en' | 'ar',
  fallback?: string
): string {
  if (!value) return fallback || '';
  if (typeof value === 'string') return value;
  if (lang === 'ar' && value.ar) return value.ar;
  if (value.en) return value.en;
  return value.ar || value.en || fallback || '';
}

// Helper to get category name - handles both resolved objects and strings
export function getCategoryName(
  category: ResolvedCategory | string | undefined,
  lang: 'en' | 'ar'
): string {
  if (!category) return '';
  if (typeof category === 'string') return category;
  // Use pre-resolved names from GROQ
  if (lang === 'ar' && category.nameAr) return category.nameAr;
  if (category.nameEn) return category.nameEn;
  if (category.name) return category.name;
  return '';
}

// Helper to get effective cover image (use gallery[0] if coverImage is missing)
export function getEffectiveCoverImage(project: Project): SanityImage | string | undefined {
  if (project.coverImage) return project.coverImage;
  if (project.gallery && project.gallery.length > 0) return project.gallery[0];
  return undefined;
}

// Helper to get project slug (use _id as fallback)
export function getProjectSlug(project: Project): string {
  if (project.slug?.current) return project.slug.current;
  // Fallback to _id for projects without slug
  return project._id;
}
