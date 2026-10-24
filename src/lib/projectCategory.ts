export interface ProjectCategoryRecord {
  categoryKey?: unknown;
  categoryCustomEn?: unknown;
  categoryCustomAr?: unknown;
  categoryEn?: unknown;
  categoryAr?: unknown;
  categoryLabels?: {nameEn?: unknown; nameAr?: unknown} | null;
}

export const PROJECT_CATEGORY_OPTIONS = [
  {key: 'architectural-design', en: 'Architectural Design', ar: 'التصميم المعماري'},
  {key: 'architectural-plans', en: 'Architectural Plans', ar: 'المخططات المعمارية'},
  {key: 'revit-bim-documentation', en: 'Revit BIM Modeling & Documentation', ar: 'نمذجة Revit وBIM والتوثيق المعماري'},
  {key: 'interior-design', en: 'Interior Design', ar: 'التصميم الداخلي'},
] as const;

const BUILT_IN_PROJECT_CATEGORIES: Record<string, {en: string; ar: string}> = {
  'architectural-design': {en: 'Architectural Design', ar: 'التصميم المعماري'},
  'architectural-plans': {en: 'Architectural Plans', ar: 'المخططات المعمارية'},
  'revit-bim-documentation': {en: 'Revit BIM Modeling & Documentation', ar: 'نمذجة Revit وBIM والتوثيق المعماري'},
  'interior-design': {en: 'Interior Design', ar: 'التصميم الداخلي'},
};

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : '';

/** Normalize known historic category values to the current four-category taxonomy. */
export function canonicalProjectCategoryKey(value: unknown): string {
  const raw = clean(value);
  const key = raw.toLocaleLowerCase();
  if (key in BUILT_IN_PROJECT_CATEGORIES) return key;

  const legacyKeyMap: Record<string, string> = {
    residential: 'architectural-design',
    commercial: 'architectural-design',
    visualization: 'architectural-design',
    interior: 'interior-design',
  };
  if (legacyKeyMap[key]) return legacyKeyMap[key];
  if (key.includes('plan') || key.includes('مخطط') || key.includes('مخططات')) return 'architectural-plans';
  if (key.includes('revit') || key.includes('bim') || key.includes('توثيق معماري')) return 'revit-bim-documentation';
  if (key.includes('interior') || key.includes('داخلي')) return 'interior-design';
  if (key.includes('architectural') || key.includes('residential') || key.includes('commercial') || key.includes('hospitality') || key.includes('landscape') || key.includes('facade') || key.includes('سكن') || key.includes('تجار') || key.includes('الضيافة') || key.includes('تنسيق مواقع') || key.includes('واجهة')) return 'architectural-design';
  return raw;
}

export function getProjectCategoryKey(category: unknown): string {
  if (typeof category === 'string') return canonicalProjectCategoryKey(category);
  if (!category || typeof category !== 'object') return '';
  const record = category as Record<string, any>;
  return canonicalProjectCategoryKey(record._id || record.slug?.current || record.key || record.nameEn || record.nameAr || record.name);
}

export function getProjectCategoryDisplayName(category: unknown, lang: 'en' | 'ar'): string {
  if (typeof category === 'string') {
    const option = PROJECT_CATEGORY_OPTIONS.find((item) => item.key === canonicalProjectCategoryKey(category));
    return option ? option[lang] : category.trim();
  }
  if (!category || typeof category !== 'object') return '';
  const record = category as Record<string, any>;
  const rawKey = clean(record._id || record.slug?.current || record.key);
  const key = canonicalProjectCategoryKey(rawKey || record.nameEn || record.nameAr || record.name);
  const option = PROJECT_CATEGORY_OPTIONS.find((item) => item.key === key);
  const isLegacy = Boolean(rawKey && rawKey !== key);
  if (option && isLegacy) return option[lang];
  const cmsLabel = clean(lang === 'ar' ? record.nameAr : record.nameEn) || clean(record.name);
  return cmsLabel || option?.[lang] || '';
}

export function getProjectLandDetails(project: {category?: unknown; landDimensions?: unknown; landArea?: unknown}) {
  if (getProjectCategoryKey(project.category) !== 'architectural-plans') {
    return {landDimensions: '', landArea: ''};
  }
  return {
    landDimensions: clean(project.landDimensions),
    landArea: clean(project.landArea),
  };
}

/** Keep category identity stable while allowing the displayed bilingual labels to come from CMS. */
export function mapProjectCategory(record: ProjectCategoryRecord) {
  const originalKey = clean(record.categoryKey);
  const isLegacyOther = originalKey.toLocaleLowerCase() === 'other';
  const legacyLabel = [record.categoryCustomEn, record.categoryCustomAr, record.categoryEn, record.categoryAr]
    .map(clean)
    .filter(Boolean)
    .join(' ');
  const inferredLegacyKey = isLegacyOther ? canonicalProjectCategoryKey(legacyLabel) : '';
  const inferredLegacyKeyIsKnown = PROJECT_CATEGORY_OPTIONS.some((option) => option.key === inferredLegacyKey);
  const key = isLegacyOther
    ? (inferredLegacyKeyIsKnown ? inferredLegacyKey : 'other')
    : canonicalProjectCategoryKey(originalKey);
  const isLegacyKey = Boolean(originalKey && originalKey !== key);
  const builtIn = BUILT_IN_PROJECT_CATEGORIES[key];
  const nameEn = (isLegacyKey ? '' : clean(record.categoryLabels?.nameEn))
    || builtIn?.en
    || clean(record.categoryCustomEn)
    || clean(record.categoryEn);
  const nameAr = (isLegacyKey ? '' : clean(record.categoryLabels?.nameAr))
    || builtIn?.ar
    || clean(record.categoryCustomAr)
    || clean(record.categoryAr)
    || nameEn;
  const id = builtIn
    ? key
    : key === 'other'
      ? `other:${nameEn.toLocaleLowerCase()}|${nameAr}`
      : nameEn || nameAr || 'other';

  return {_id: id, _type: 'category' as const, nameEn, nameAr};
}
