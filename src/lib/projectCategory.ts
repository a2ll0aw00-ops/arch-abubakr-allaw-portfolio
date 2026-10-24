export interface ProjectCategoryRecord {
  categoryKey?: unknown;
  categoryCustomEn?: unknown;
  categoryCustomAr?: unknown;
  categoryEn?: unknown;
  categoryAr?: unknown;
  categoryLabels?: {nameEn?: unknown; nameAr?: unknown} | null;
}

const BUILT_IN_PROJECT_CATEGORIES: Record<string, {en: string; ar: string}> = {
  residential: {en: 'Residential', ar: 'سكني'},
  commercial: {en: 'Commercial', ar: 'تجاري'},
  interior: {en: 'Interior', ar: 'داخلي'},
  visualization: {en: 'Visualization', ar: 'إظهار'},
};

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : '';

/** Keep category identity stable while allowing the displayed bilingual labels to come from CMS. */
export function mapProjectCategory(record: ProjectCategoryRecord) {
  const key = clean(record.categoryKey);
  const builtIn = BUILT_IN_PROJECT_CATEGORIES[key];
  const nameEn = clean(record.categoryLabels?.nameEn)
    || builtIn?.en
    || clean(record.categoryCustomEn)
    || clean(record.categoryEn);
  const nameAr = clean(record.categoryLabels?.nameAr)
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
