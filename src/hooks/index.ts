import { useEffect, useState } from 'react';
import { sanityQuery } from '../lib/sanity';

const PROJECTS_QUERY = `*[_type == "project" && visible != false] | order(order asc, _createdAt asc) {
  _id, _type, titleEn, titleAr, slug, subtitleEn, subtitleAr,
  descriptionEn, descriptionAr, categoryEn, categoryAr,
  "coverUrl": coalesce(coverImage.asset->url, coverImageUrl),
  "uploadedGallery": gallery[]{"url": asset->url}, galleryUrls,
  locationEn, locationAr, year, area, client, status, roleEn, roleAr,
  scopeEn, scopeAr, conceptEn, conceptAr, methodologyEn, methodologyAr,
  software, featured, order
}`;

const FEATURED_PROJECTS_QUERY = `*[_type == "project" && visible != false && featured == true] | order(order asc, _createdAt asc) [0...6] {
  _id, _type, titleEn, titleAr, slug, subtitleEn, subtitleAr,
  descriptionEn, descriptionAr, categoryEn, categoryAr,
  "coverUrl": coalesce(coverImage.asset->url, coverImageUrl),
  "uploadedGallery": gallery[]{"url": asset->url}, galleryUrls,
  locationEn, locationAr, year, area, client, status, roleEn, roleAr,
  scopeEn, scopeAr, conceptEn, conceptAr, methodologyEn, methodologyAr,
  software, featured, order
}`;

const SERVICES_QUERY = `*[_type == "service" && visible != false] | order(order asc, _createdAt asc) {
  _id, titleEn, titleAr, descriptionEn, descriptionAr, icon,
  "imageUrl": coalesce(image.asset->url, imageUrl),
  "uploadedGallery": gallery[]{"url": asset->url}, galleryUrls,
  upworkUrl, startingPrice, currency, packages, order
}`;

const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id, siteName, fullNameEn, fullNameAr, roleEn, roleAr,
  descriptorEn, descriptorAr, summaryEn, summaryAr,
  "logoUrl": logo.asset->url, "logoLightUrl": logoLight.asset->url, logoScale, socialLinks[]{_key, platform, label, url, enabled},
  email, phone, whatsapp, "location": locationEn, "locationAr": locationAr,
  "nationality": nationalityEn, "nationalityAr": nationalityAr,
  seoTitle, seoDescription, seoTitleAr, seoTitleEn, seoDescriptionAr, seoDescriptionEn,
  "profileImage": {"url": profileImage.asset->url, "hotspot": profileImage.hotspot, "crop": profileImage.crop},
  "heroBackground": {"url": heroBackground.asset->url, "hotspot": heroBackground.hotspot, "crop": heroBackground.crop},
  "shareImage": {"url": shareImage.asset->url, "hotspot": shareImage.hotspot, "crop": shareImage.crop},
  "shareImageUrl": shareImage.asset->url
}`;

const SITE_COPY_QUERY = `*[_type == "siteCopy"]{entries[]{key, english, arabic}}`;
const PROFILE_CONTENT_QUERY = `*[_type == "profileContent"][0]{
  cvNameAr, cvNameEn, cvRoleAr, cvRoleEn, cvDescriptorAr, cvDescriptorEn, linkedinUrl,
  summaryAr, summaryEn,
  personalSkills[]{en,ar}, software[]{en,ar},
  technicalSkillGroups[]{titleEn,titleAr,skills[]{nameEn,nameAr,levelEn,levelAr,descriptionEn,descriptionAr}},
  education[]{degreeEn,degreeAr,institutionEn,institutionAr,periodEn,periodAr,departmentEn,departmentAr,gradeEn,gradeAr,detailsEn,detailsAr},
  experience[]{roleEn,roleAr,companyEn,companyAr,locationEn,locationAr,periodEn,periodAr,descriptionEn,descriptionAr,responsibilitiesEn,responsibilitiesAr},
  training[]{titleEn,titleAr,organizationEn,organizationAr,detailsEn,detailsAr},
  selectedProjects[]{titleEn,titleAr,metaEn,metaAr,descriptionEn,descriptionAr},
  professionalSkills[]{en,ar},
  languages[]{nameEn,nameAr,levelEn,levelAr}
}`;

interface RemoteState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  hasData: boolean;
}

function useRemote<T>(query: string, initial: T): RemoteState<T> {
  const [state, setState] = useState<RemoteState<T>>({
    data: initial,
    loading: true,
    error: null,
    hasData: false,
  });

  useEffect(() => {
    let active = true;
    sanityQuery<T>(query)
      .then((data: T) => {
        if (!active) return;
        const hasData = Array.isArray(data) ? data.length > 0 : data !== null && data !== undefined;
        setState({ data, loading: false, error: null, hasData });
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setState({
          data: initial,
          loading: false,
          error: reason instanceof Error ? reason : new Error('Unable to load CMS content'),
          hasData: false,
        });
      });
    return () => { active = false; };
  }, [query]);

  return state;
}

function mapProject(record: any) {
  const uploadedGallery = Array.isArray(record.uploadedGallery) ? record.uploadedGallery.map((item: any) => item?.url).filter(Boolean) : [];
  const gallery = uploadedGallery.length > 0
    ? uploadedGallery
    : (Array.isArray(record.galleryUrls) ? record.galleryUrls : []);
  return {
    _id: record._id,
    _type: 'project',
    title: { en: record.titleEn || '', ar: record.titleAr || '' },
    slug: record.slug?.current ? record.slug : { current: record.slug || record._id },
    subtitle: { en: record.subtitleEn || '', ar: record.subtitleAr || '' },
    description: { en: record.descriptionEn || '', ar: record.descriptionAr || '' },
    category: {
      _id: record.categoryEn || 'Other',
      _type: 'category',
      nameEn: record.categoryEn || '',
      nameAr: record.categoryAr || '',
    },
    coverImage: record.coverUrl || gallery[0],
    gallery,
    location: { en: record.locationEn || '', ar: record.locationAr || '' },
    year: record.year,
    area: record.area,
    client: record.client,
    status: record.status,
    role: { en: record.roleEn || '', ar: record.roleAr || '' },
    scope: { en: record.scopeEn || '', ar: record.scopeAr || '' },
    designConcept: { en: record.conceptEn || '', ar: record.conceptAr || '' },
    methodology: { en: record.methodologyEn || '', ar: record.methodologyAr || '' },
    software: record.software || [],
    featured: Boolean(record.featured),
    order: record.order,
  };
}

export function useProjects() {
  const remote = useRemote<any[]>(PROJECTS_QUERY, []);
  return { ...remote, projects: remote.data.map(mapProject) };
}

export function useFeaturedProjects() {
  const remote = useRemote<any[]>(FEATURED_PROJECTS_QUERY, []);
  return { ...remote, projects: remote.data.map(mapProject) };
}

export function useProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == ${JSON.stringify(slug)} && visible != false][0] {
    _id, _type, titleEn, titleAr, slug, subtitleEn, subtitleAr,
    descriptionEn, descriptionAr, categoryEn, categoryAr,
    "coverUrl": coalesce(coverImage.asset->url, coverImageUrl),
    "uploadedGallery": gallery[]{"url": asset->url}, galleryUrls,
    locationEn, locationAr, year, area, client, status, roleEn, roleAr,
    scopeEn, scopeAr, conceptEn, conceptAr, methodologyEn, methodologyAr,
    software, featured, order
  }`;
  const remote = useRemote<any | null>(query, null);
  return { ...remote, project: remote.data ? mapProject(remote.data) : null };
}

export function useSiteSettings() {
  const remote = useRemote<any | null>(SETTINGS_QUERY, null);
  return { ...remote, settings: remote.data };
}

export function useHeroSettings() {
  const remote = useSiteSettings();
  const hero: any = remote.settings?.heroBackground?.url
    ? { backgroundImage: remote.settings.heroBackground }
    : null;
  return { ...remote, hero };
}

export function useServices() {
  const remote = useRemote<any[]>(SERVICES_QUERY, []);
  const services = remote.data.map((record: any) => ({
    _id: record._id,
    title: record.titleEn || '',
    titleAr: record.titleAr || '',
    description: record.descriptionEn || '',
    descriptionAr: record.descriptionAr || '',
    icon: record.icon || 'building',
    image: record.imageUrl || record.galleryUrls?.[0] || record.uploadedGallery?.[0]?.url,
    gallery: Array.isArray(record.uploadedGallery) && record.uploadedGallery.length > 0
      ? record.uploadedGallery.map((item: any) => item?.url).filter(Boolean)
      : (Array.isArray(record.galleryUrls) ? record.galleryUrls : []),
    upworkUrl: record.upworkUrl || '',
    startingPrice: record.startingPrice || '',
    currency: record.currency || '',
    packages: record.packages || [],
    order: record.order,
  }));
  return { ...remote, services };
}

export function useSocialLinks() {
  const { settings, loading, error, hasData } = useSiteSettings();
  const links = Array.isArray(settings?.socialLinks)
    ? settings.socialLinks.filter((item: any) => item.enabled !== false && item.platform && item.url).map((item: any) => ({
      _id: item._key || `${item.platform}-${item.url}`,
      platform: item.label || String(item.platform || 'Other').replace(/^./, (letter) => letter.toUpperCase()),
      icon: String(item.platform || 'website').toLowerCase(),
      url: String(item.url).trim().startsWith('http://') || String(item.url).trim().startsWith('https://')
        ? String(item.url).trim()
        : `https://${String(item.url).trim()}`,
      visible: true,
    }))
    : [];
  return { socialLinks: hasData ? links : defaultSocialLinks, loading, error, hasData };
}

export function useSiteCopy() {
  return useRemote<Array<{ entries?: Array<{ key: string; english?: string; arabic?: string }> }>>(SITE_COPY_QUERY, []);
}

export function useProfileContent() {
  return useRemote<any | null>(PROFILE_CONTENT_QUERY, null);
}

export function useSkills() { return { skills: null as any, loading: false, error: null, hasData: false }; }
export function useEducation() { return { education: [] as any[], loading: false, error: null, hasData: false }; }
export function useExperience() { return { experience: [] as any[], loading: false, error: null, hasData: false }; }
export function useLanguages() { return { languages: [] as any[], loading: false, error: null, hasData: false }; }

const defaultSocialLinks = [
  { _id: 'default-instagram', platform: 'Instagram', url: 'https://instagram.com/abubakrallaw', icon: 'instagram', order: 1, visible: true },
  { _id: 'default-linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/in/abubakrallaw', icon: 'linkedin', order: 2, visible: true },
  { _id: 'default-behance', platform: 'Behance', url: 'https://behance.net/abubakrallaw', icon: 'behance', order: 3, visible: true },
];
