import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { profileData, skillsData, educationData, experienceData, languagesData } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { Download, Mail, MapPin, Phone, Printer } from 'lucide-react';
import { getLocalizedText } from '../types';
import { useProfileContent, useSiteSettings } from '../hooks';

export default function CVPage() {
  const { t, lang } = useI18n();
  const { settings } = useSiteSettings();
  const { data: cvContent } = useProfileContent();
  const email = settings?.email || profileData.email;
  const phone = settings?.phone || profileData.phone;
  const location = lang === 'ar' ? settings?.locationAr || 'إب، اليمن' : settings?.location || profileData.location;
  const nationality = lang === 'ar' ? settings?.nationalityAr || 'يمني' : settings?.nationality || profileData.nationality;
  const education = cvContent?.education?.length ? cvContent.education.map((item: any) => ({ degree: { en: item.degreeEn, ar: item.degreeAr }, institution: { en: item.institutionEn, ar: item.institutionAr }, period: { en: item.periodEn, ar: item.periodAr } })) : educationData;
  const experience = cvContent?.experience?.length ? cvContent.experience.map((item: any) => ({ role: { en: item.roleEn, ar: item.roleAr }, company: { en: item.companyEn, ar: item.companyAr }, location: { en: item.locationEn, ar: item.locationAr }, period: { en: item.periodEn, ar: item.periodAr }, description: { en: item.descriptionEn, ar: item.descriptionAr } })) : experienceData;
  const languages = cvContent?.languages?.length ? cvContent.languages.map((item: any) => ({ name: { en: item.nameEn, ar: item.nameAr }, level: { en: item.levelEn, ar: item.levelAr } })) : languagesData;
  const cvSkills = {
    personal: cvContent?.personalSkills?.length ? cvContent.personalSkills : skillsData.personal,
    software: cvContent?.software?.length ? cvContent.software : skillsData.software,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy text-white print:bg-white print:text-navy print:pt-8 print:pb-4">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block print:text-navy/60">
              {t('cv.title')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {t('cv.heading')}
            </h1>
            <p className="text-white/60 leading-relaxed text-lg print:text-navy/60">
              {t('aboutPage.role')}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70 print:text-navy/60">
              <span>{location}</span>
              <span>·</span>
              <span>{email}</span>
              <span>·</span>
              <span dir="ltr">{phone}</span>
              <span>·</span>
              <span>{t('cv.nationality')}: {nationality}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CV Content */}
      <section className="py-16 lg:py-20 bg-white print:py-4">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Profile Summary */}
          <AnimatedSection>
            <div className="mb-12 pb-10 border-b border-navy/10">
              <h2 className="text-sm tracking-widest uppercase text-bronze font-semibold mb-4">
                {t('cv.profile')}
              </h2>
              <p className="text-navy/70 leading-relaxed">
                {t('aboutPage.summary')}
              </p>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.1}>
            <div className="mb-12 pb-10 border-b border-navy/10">
              <h2 className="text-sm tracking-widest uppercase text-bronze font-semibold mb-4">
                {t('cv.contact')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-navy/70 text-sm">
                  <Mail size={14} className="text-bronze" />
                  {email}
                </a>
                <a href={`tel:${phone}`} className="flex items-center gap-2 text-navy/70 text-sm">
                  <Phone size={14} className="text-bronze" />
                  <span dir="ltr">{phone}</span>
                </a>
                <div className="flex items-center gap-2 text-navy/70 text-sm">
                  <MapPin size={14} className="text-bronze" />
                  {location}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Skills */}
          <AnimatedSection delay={0.2}>
            <div className="mb-12 pb-10 border-b border-navy/10">
              <h2 className="text-sm tracking-widest uppercase text-bronze font-semibold mb-4">
                {t('cv.skillsHeading')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-navy mb-3">
                    {lang === 'ar' ? 'المهارات الشخصية' : 'Personal Skills'}
                  </h3>
                  <div className="space-y-2">
                    {cvSkills.personal.map((skill: any) => (
                          <div key={skill.en} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-bronze rounded-full flex-shrink-0" />
                            <span className="text-navy/70 text-sm">{getLocalizedText(skill, lang)}</span>
                          </div>
                        ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy mb-3">Software</h3>
                  <div className="space-y-2">
                    {cvSkills.software.map((skill: any) => (
                          <div key={skill.en} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-bronze rounded-full flex-shrink-0" />
                            <span className="text-navy/70 text-sm">{getLocalizedText(skill, lang)}</span>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Experience */}
          <AnimatedSection delay={0.3}>
            <div className="mb-12 pb-10 border-b border-navy/10">
              <h2 className="text-sm tracking-widest uppercase text-bronze font-semibold mb-4">
                {t('cv.experience')}
              </h2>
              <div className="space-y-6">
                {(experience.length > 0 ? experience : experienceData).map((exp: any, i: number) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <h3 className="text-base font-bold text-navy">
                        {getLocalizedText(exp.roleAr || exp.role, lang)}
                      </h3>
                      <span className="text-xs text-navy/50 tracking-wider uppercase">
                        {getLocalizedText(exp.periodAr || exp.period, lang)}
                      </span>
                    </div>
                    <p className="text-navy/50 text-sm mb-2">
                      {getLocalizedText(exp.companyAr || exp.company, lang)} — {getLocalizedText(exp.locationAr || exp.location, lang)}
                    </p>
                    <p className="text-navy/70 text-sm leading-relaxed">
                      {getLocalizedText(exp.descriptionAr || exp.description, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Education */}
          <AnimatedSection delay={0.4}>
            <div className="mb-12 pb-10 border-b border-navy/10">
              <h2 className="text-sm tracking-widest uppercase text-bronze font-semibold mb-4">
                {t('cv.education')}
              </h2>
              <div className="space-y-6">
                {(education.length > 0 ? education : educationData).map((edu: any, i: number) => (
                  <div key={i}>
                    <h3 className="text-base font-bold text-navy mb-1">
                      {getLocalizedText(edu.degreeAr || edu.degree, lang)}
                    </h3>
                    <p className="text-navy/50 text-sm">
                      {getLocalizedText(edu.institutionAr || edu.institution, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Languages */}
          <AnimatedSection delay={0.5}>
            <div className="mb-12">
              <h2 className="text-sm tracking-widest uppercase text-bronze font-semibold mb-4">
                {t('cv.languages')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(languages.length > 0 ? languages : languagesData).map((language: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-offwhite">
                    <span className="text-navy font-medium text-sm">
                      {getLocalizedText(language.nameAr || language.name, lang)}
                    </span>
                    <span className="text-navy/50 text-xs">
                      {getLocalizedText(language.levelAr || language.level, lang)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Actions */}
          <AnimatedSection delay={0.6}>
            <div className="flex flex-wrap gap-4 justify-center pt-4 print:hidden">
              <button
                onClick={handlePrint}
                className="group inline-flex items-center gap-3 bg-navy text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-navy-light transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                aria-label={t('cv.print')}
              >
                <Printer size={16} className="group-hover:scale-110 transition-transform duration-300" />
                {t('cv.print')}
              </button>
              <button
                onClick={handlePrint}
                className="group inline-flex items-center gap-3 border-2 border-navy/20 text-navy px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:border-bronze hover:text-bronze transition-all duration-300 hover:-translate-y-0.5"
                aria-label={t('cv.download')}
              >
                <Download size={16} className="group-hover:scale-110 transition-transform duration-300" />
                {t('cv.download')}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
