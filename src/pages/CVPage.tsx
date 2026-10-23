import { useI18n } from '../i18n/I18nContext';
import { Download, ExternalLink, Mail, MapPin, Phone, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileData } from '../data/content';
import { cvResume } from '../data/cvResume';
import { useProfileContent, useSiteSettings } from '../hooks';
import { toTelHref } from '../lib/contactLinks';

type Language = 'ar' | 'en';
type Localized = { ar?: string; en?: string } | string | undefined | null;

const textFor = (value: Localized, lang: Language) => {
  if (typeof value === 'string') return value;
  if (!value) return '';
  return value[lang] || value[lang === 'ar' ? 'en' : 'ar'] || '';
};

const splitParagraphs = (value: string | undefined) =>
  value?.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean) || [];

export default function CVPage() {
  const { t, lang: siteLanguage } = useI18n();
  const lang = siteLanguage as Language;
  const { settings } = useSiteSettings();
  const { data: cvContent } = useProfileContent();
  const cvIsManaged = Boolean(cvContent?.summaryAr?.trim() || cvContent?.summaryEn?.trim());
  const email = settings?.email || profileData.email;
  const phone = settings?.phone || profileData.phone;
  const location = (lang === 'ar' ? settings?.locationAr : settings?.location) || cvResume.location[lang];
  const name = cvIsManaged
    ? textFor({ ar: cvContent.cvNameAr, en: cvContent.cvNameEn }, lang) || cvResume.name[lang]
    : cvResume.name[lang];
  const role = cvIsManaged
    ? textFor({ ar: cvContent.cvRoleAr, en: cvContent.cvRoleEn }, lang) || cvResume.role[lang]
    : cvResume.role[lang];
  const descriptor = cvIsManaged
    ? textFor({ ar: cvContent.cvDescriptorAr, en: cvContent.cvDescriptorEn }, lang) || cvResume.descriptor[lang]
    : cvResume.descriptor[lang];
  const linkedin = (cvIsManaged && cvContent.linkedinUrl) || cvResume.linkedin;
  const summary = cvIsManaged
    ? splitParagraphs(lang === 'ar' ? cvContent.summaryAr || cvContent.summaryEn : cvContent.summaryEn || cvContent.summaryAr)
    : cvResume.summary[lang];

  const experience = cvIsManaged && cvContent.experience?.length
    ? cvContent.experience.map((item: any) => ({
      role: { ar: item.roleAr, en: item.roleEn },
      company: { ar: item.companyAr, en: item.companyEn },
      meta: { ar: [item.locationAr, item.periodAr].filter(Boolean).join(' | '), en: [item.locationEn, item.periodEn].filter(Boolean).join(' | ') },
      responsibilities: (lang === 'ar' ? item.responsibilitiesAr : item.responsibilitiesEn)?.length
        ? (lang === 'ar' ? item.responsibilitiesAr : item.responsibilitiesEn)
        : [lang === 'ar' ? item.descriptionAr : item.descriptionEn].filter(Boolean),
    }))
    : cvResume.experience;

  const skillGroups = cvIsManaged && cvContent.technicalSkillGroups?.length
    ? cvContent.technicalSkillGroups.map((group: any) => ({
      title: { ar: group.titleAr, en: group.titleEn },
      skills: (group.skills || []).map((skill: any) => ({
        name: { ar: skill.nameAr, en: skill.nameEn },
        level: { ar: skill.levelAr, en: skill.levelEn },
        description: { ar: skill.descriptionAr, en: skill.descriptionEn },
      })),
    }))
    : cvResume.technicalSkillGroups;

  const education = cvIsManaged && cvContent.education?.length
    ? cvContent.education.map((item: any) => ({
      degree: { ar: item.degreeAr, en: item.degreeEn },
      institution: { ar: item.institutionAr, en: item.institutionEn },
      details: { ar: [item.departmentAr, item.periodAr, item.gradeAr, item.detailsAr].filter(Boolean).join(' | '), en: [item.departmentEn, item.periodEn, item.gradeEn, item.detailsEn].filter(Boolean).join(' | ') },
    }))
    : cvResume.education;

  const training = cvIsManaged && cvContent.training?.length
    ? cvContent.training.map((item: any) => ({
      title: { ar: item.titleAr, en: item.titleEn },
      organization: { ar: item.organizationAr, en: item.organizationEn },
      details: { ar: item.detailsAr, en: item.detailsEn },
    }))
    : cvResume.training;

  const selectedProjects = cvIsManaged && cvContent.selectedProjects?.length
    ? cvContent.selectedProjects.map((item: any) => ({
      title: { ar: item.titleAr, en: item.titleEn },
      meta: { ar: item.metaAr, en: item.metaEn },
      description: { ar: item.descriptionAr, en: item.descriptionEn },
    }))
    : cvResume.selectedProjects;

  const professionalSkills = cvIsManaged && cvContent.professionalSkills?.length
    ? cvContent.professionalSkills
    : cvResume.professionalSkills;
  const languages = cvIsManaged && cvContent.languages?.length
    ? cvContent.languages.map((item: any) => ({ name: { ar: item.nameAr, en: item.nameEn }, level: { ar: item.levelAr, en: item.levelEn } }))
    : cvResume.languages;

  const sectionTitleClass = 'mb-5 border-b border-navy/10 pb-3 text-sm font-semibold uppercase tracking-widest text-bronze';
  const itemTitleClass = 'text-base font-bold text-navy';
  const metaClass = 'text-xs leading-relaxed text-navy/55';
  const handlePrint = () => window.print();

  return (
    <article className="cv-printable">
      <header className="bg-navy pt-32 pb-12 text-white lg:pt-40 print:bg-white print:pt-4 print:pb-5 print:text-navy">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-bronze">{t('cv.title')}</p>
          <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{name}</h1>
          <p className="mb-2 text-lg text-white/75 print:text-navy/70">{role}</p>
          <p className="text-sm leading-relaxed text-white/55 print:text-navy/60">{descriptor}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70 print:text-navy/70">
            <span className="flex items-center gap-2"><MapPin size={14} className="text-bronze" />{location}</span>
            <a href={toTelHref(phone)} className="flex items-center gap-2" dir="ltr"><Phone size={14} className="text-bronze" />{phone}</a>
            <a href={`mailto:${email}`} className="flex items-center gap-2"><Mail size={14} className="text-bronze" />{email}</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm print:hidden">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-bronze hover:text-white">
              <ExternalLink size={14} />LinkedIn
            </a>
            <Link to="/projects" className="text-bronze hover:text-white">{textFor(cvResume.portfolioLabel, lang)}</Link>
          </div>
        </div>
      </header>

      <main className="bg-white py-10 lg:py-14 print:py-5">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <section className="mb-9 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'الملخص المهني | PROFESSIONAL SUMMARY' : 'Professional Summary'}</h2>
            <div className="space-y-3 text-sm leading-7 text-navy/75">
              {summary.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </section>

          <section className="mb-9 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'الخبرات العملية | PROFESSIONAL EXPERIENCE' : 'Professional Experience'}</h2>
            <div className="space-y-7">
              {experience.map((item: any, index: number) => (
                <div key={index} className="break-inside-avoid">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className={itemTitleClass}>{textFor(item.role, lang)}</h3>
                    <p className={metaClass}>{textFor(item.meta, lang)}</p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-navy/60">{textFor(item.company, lang)}</p>
                  <ul className="mt-3 space-y-1.5 ps-5 text-sm leading-6 text-navy/75">
                    {item.responsibilities.map((responsibility: any, bulletIndex: number) => (
                      <li key={bulletIndex} className="list-disc marker:text-bronze">{textFor(responsibility, lang)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-9 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'المهارات التقنية | TECHNICAL SKILLS' : 'Technical Skills'}</h2>
            <div className="space-y-6">
              {skillGroups.map((group: any, groupIndex: number) => (
                <div key={groupIndex} className="break-inside-avoid">
                  <h3 className="mb-3 text-sm font-bold text-navy">{textFor(group.title, lang)}</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {group.skills.map((skill: any, skillIndex: number) => (
                      <div key={skillIndex} className="border-s-2 border-bronze/50 ps-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <h4 className="text-sm font-semibold text-navy">{textFor(skill.name, lang)}</h4>
                          <span className="text-xs text-navy/55">{textFor(skill.level, lang)}</span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-navy/65">{textFor(skill.description, lang)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-9 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'التعليم | EDUCATION' : 'Education'}</h2>
            <div className="space-y-5">
              {education.map((item: any, index: number) => (
                <div key={index} className="break-inside-avoid">
                  <h3 className={itemTitleClass}>{textFor(item.degree, lang)}</h3>
                  <p className="mt-1 text-sm text-navy/65">{textFor(item.institution, lang)}</p>
                  <p className={`mt-1 ${metaClass}`}>{textFor(item.details, lang)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-9 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'الدورات والشهادات | TRAINING & CERTIFICATIONS' : 'Training & Certifications'}</h2>
            <div className="space-y-4">
              {training.map((item: any, index: number) => (
                <div key={index} className="break-inside-avoid">
                  <h3 className={itemTitleClass}>{textFor(item.title, lang)}</h3>
                  <p className="mt-1 text-sm text-navy/65">{textFor(item.organization, lang)}</p>
                  <p className={`mt-1 ${metaClass}`}>{textFor(item.details, lang)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-9 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'نماذج مختارة من الأعمال | SELECTED PROJECTS' : 'Selected Projects'}</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {selectedProjects.map((item: any, index: number) => (
                <div key={index} className="break-inside-avoid border border-navy/10 p-4">
                  <h3 className={itemTitleClass}>{textFor(item.title, lang)}</h3>
                  <p className={`mt-1 ${metaClass}`}>{textFor(item.meta, lang)}</p>
                  <p className="mt-3 text-sm leading-6 text-navy/70">{textFor(item.description, lang)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-9 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'المهارات المهنية | PROFESSIONAL SKILLS' : 'Professional Skills'}</h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {professionalSkills.map((skill: any, index: number) => (
                <li key={index} className="flex gap-2 text-sm leading-6 text-navy/75">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-bronze" />
                  <span>{textFor(skill, lang)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8 break-inside-avoid">
            <h2 className={sectionTitleClass}>{lang === 'ar' ? 'اللغات | LANGUAGES' : 'Languages'}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {languages.map((language: any, index: number) => (
                <div key={index} className="flex items-center justify-between border border-navy/10 bg-offwhite p-3">
                  <span className="text-sm font-medium text-navy">{textFor(language.name, lang)}</span>
                  <span className="text-xs text-navy/55">{textFor(language.level, lang)}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap justify-center gap-3 pt-3 print:hidden">
            <button onClick={handlePrint} className="inline-flex items-center gap-2 bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light" aria-label={t('cv.print')}>
              <Printer size={16} />{t('cv.print')}
            </button>
            <button onClick={handlePrint} className="inline-flex items-center gap-2 border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-bronze hover:text-bronze" aria-label={t('cv.download')}>
              <Download size={16} />{t('cv.download')}
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-navy/45 print:hidden">
            {lang === 'ar' ? 'اختر «حفظ كملف PDF» من نافذة الطباعة لتنزيل نسخة من السيرة.' : 'Choose “Save as PDF” in the print dialog to download a PDF copy.'}
          </p>
        </div>
      </main>
    </article>
  );
}
