import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { profileData } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useSiteSettings } from '../hooks';
import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const { t, lang } = useI18n();
  const { settings } = useSiteSettings();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Use Sanity data if available, otherwise fallback
  const email = settings?.email || profileData.email;
  const phone = settings?.phone || profileData.phone;
  const location = lang === 'ar' ? settings?.locationAr || 'إب، اليمن' : settings?.location || profileData.location;
  const whatsapp = settings?.whatsapp || profileData.whatsapp;
  const whatsappUrl = whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use mailto: as the reliable fallback
    const subject = encodeURIComponent(formState.subject || 'Project Inquiry');
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
              {t('contactPage.title')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('contactPage.heading')}
            </h1>
            <p className="text-white/60 max-w-2xl leading-relaxed text-lg">
              {t('contactPage.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <div>
                  <h2 className="text-xl font-bold text-navy mb-6">
                    {t('contactPage.formHeading')}
                  </h2>

                  <div className="space-y-4 mb-8">
                    <a
                      href={`mailto:${email}`}
                      className={`flex items-center gap-4 text-navy/70 hover:text-bronze transition-colors group ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <div className="w-11 h-11 border border-navy/10 flex items-center justify-center group-hover:border-bronze/50 transition-colors flex-shrink-0">
                        <Mail size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-navy/50 uppercase tracking-wider mb-0.5">{t('contactPage.email')}</div>
                        <div className="text-sm font-medium">{email}</div>
                      </div>
                    </a>
                    <a
                      href={`tel:${phone}`}
                      className={`flex items-center gap-4 text-navy/70 hover:text-bronze transition-colors group ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <div className="w-11 h-11 border border-navy/10 flex items-center justify-center group-hover:border-bronze/50 transition-colors flex-shrink-0">
                        <Phone size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-navy/50 uppercase tracking-wider mb-0.5">{lang === 'ar' ? 'الهاتف' : 'Phone'}</div>
                        <div className="text-sm font-medium" dir="ltr">{phone}</div>
                      </div>
                    </a>
                    <div className={`flex items-center gap-4 text-navy/70 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="w-11 h-11 border border-navy/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-navy/50 uppercase tracking-wider mb-0.5">{t('cv.location')}</div>
                        <div className="text-sm font-medium">{location}</div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 bg-green-500 text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-green-600 transition-all duration-300 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs tracking-wider uppercase text-navy/50 font-medium mb-2">
                        {t('contactPage.name')} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-offwhite border border-navy/10 text-navy text-sm focus:outline-none focus:border-bronze transition-colors"
                        placeholder={t('contactPage.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs tracking-wider uppercase text-navy/50 font-medium mb-2">
                        {t('contactPage.email')} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-offwhite border border-navy/10 text-navy text-sm focus:outline-none focus:border-bronze transition-colors"
                        placeholder={t('contactPage.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs tracking-wider uppercase text-navy/50 font-medium mb-2">
                      {t('contactPage.subject')}
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-offwhite border border-navy/10 text-navy text-sm focus:outline-none focus:border-bronze transition-colors"
                      placeholder={t('contactPage.subjectPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs tracking-wider uppercase text-navy/50 font-medium mb-2">
                      {t('contactPage.message')} *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-offwhite border border-navy/10 text-navy text-sm focus:outline-none focus:border-bronze transition-colors resize-none"
                      placeholder={t('contactPage.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`group inline-flex items-center gap-3 bg-bronze text-navy px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-bronze-light transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    {t('contactPage.send')}
                  </button>
                  <p className="text-navy/40 text-xs flex items-center gap-2">
                    <span className="w-1 h-1 bg-bronze rounded-full" />
                    {lang === 'ar' ? 'سيتم فتح برنامج البريد الإلكتروني لإرسال الرسالة' : 'Your email client will open to send the message'}
                  </p>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
