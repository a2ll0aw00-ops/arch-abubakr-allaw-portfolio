/**
 * Local image settings for project-category banners. The home hero background
 * is managed only through the published Sanity site settings.
 */
export const siteMedia = {
  projectHeaders: {
    all: '/images/projects-header.webp',
    residential: '/images/stock/modern-villa-pool.webp',
    commercial: '/images/stock/office-building-01.webp',
    interior: '/images/projects/luxury-interior-design-cover.webp',
    visualization: '/images/projects/architectural-visualization-cover.webp',
  },
} as const;

export type ProjectHeaderKey = keyof typeof siteMedia.projectHeaders;

/** Resolve English or Arabic category names to their corresponding banner. */
export function getProjectHeaderKey(categoryName: string): ProjectHeaderKey {
  const name = categoryName.trim().toLocaleLowerCase();

  if (name.includes('residential') || name.includes('سكن')) return 'residential';
  if (name.includes('commercial') || name.includes('تجار')) return 'commercial';
  if (name.includes('interior') || name.includes('داخلي')) return 'interior';
  if (name.includes('visualization') || name.includes('visualisation') || name.includes('إظهار') || name.includes('اظهار')) {
    return 'visualization';
  }

  return 'all';
}
