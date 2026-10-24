/**
 * Local image settings for project-category banners. The home hero background
 * is managed only through the published Sanity site settings.
 */
export const siteMedia = {
  projectHeaders: {
    all: '/images/projects-header.webp',
    'architectural-design': '/images/stock/modern-villa-pool.webp',
    'architectural-plans': '/images/projects-header.webp',
    'revit-bim-documentation': '/images/projects/architectural-visualization-cover.webp',
    'interior-design': '/images/projects/luxury-interior-design-cover.webp',
  },
} as const;

export type ProjectHeaderKey = keyof typeof siteMedia.projectHeaders;

/** Resolve English or Arabic category names to their corresponding banner. */
export function getProjectHeaderKey(categoryName: string): ProjectHeaderKey {
  const name = categoryName.trim().toLocaleLowerCase();

  if (name.includes('architectural plan') || name.includes('مخطط') || name.includes('مخططات')) return 'architectural-plans';
  if (name.includes('revit') || name.includes('bim') || name.includes('توثيق معماري')) return 'revit-bim-documentation';
  if (name.includes('interior') || name.includes('داخلي')) return 'interior-design';
  if (name.includes('architectural') || name.includes('تصميم معماري') || name.includes('واجهة') || name.includes('تنسيق مواقع')) return 'architectural-design';

  return 'all';
}
