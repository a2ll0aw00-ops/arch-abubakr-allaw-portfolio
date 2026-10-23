import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { profileData } from '../data/content';
import { useSiteSettings, useSocialLinks } from '../hooks';
import BrandMark from './BrandMark';
import { toTelHref } from '../lib/contactLinks';
import { Instagram, Linkedin, Facebook, Twitter, Youtube, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { 
  BehanceIcon, 
  DribbbleIcon, 
  GitHubIcon, 
  PinterestIcon, 
  WhatsAppIcon, 
  TelegramIcon, 
  TikTokIcon,
  SnapchatIcon,
  MediumIcon,
  XIcon
} from './SocialIcons';

// Icon mapping for social platforms
const socialIconMap: Record<string, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
  x: XIcon,
  youtube: Youtube,
  behance: BehanceIcon,
  dribbble: DribbbleIcon,
  github: GitHubIcon,
  pinterest: PinterestIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  tiktok: TikTokIcon,
  snapchat: SnapchatIcon,
  medium: MediumIcon,
  website: Globe,
  upwork: Globe,
  other: Globe,
};

export default function Footer() {
  const { t, lang } = useI18n();
  const { settings } = useSiteSettings();
  const { socialLinks } = useSocialLinks();
  
  // Use Sanity data if available, otherwise fallback
  const email = settings?.email || profileData.email;
  const phone = settings?.phone || profileData.phone;
  const location = lang === 'ar'
    ? settings?.locationAr || 'إب، اليمن'
    : settings?.location || profileData.location;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="pt-10 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BrandMark variant="light" className="w-10 h-10 shrink-0 text-bronze" />
                <span className="font-semibold text-sm tracking-widest uppercase">
                {lang === 'ar'
                  ? settings?.fullNameAr || 'أبوبكر علاو'
                  : settings?.fullNameEn || settings?.siteName || 'Abubakr Allaw'}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-bronze text-xs tracking-widest uppercase font-semibold mb-6">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('nav.home'), path: '/' },
                { label: t('nav.projects'), path: '/projects' },
                { label: t('nav.about'), path: '/about' },
                { label: t('nav.services'), path: '/services' },
                { label: t('nav.cv'), path: '/cv' },
                { label: t('nav.contact'), path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/60 text-sm hover:text-bronze transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-bronze text-xs tracking-widest uppercase font-semibold mb-6">{t('footer.connect')}</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-white/60 text-sm hover:text-bronze transition-colors duration-300 flex items-center gap-2 group"
                  aria-label={`Email: ${email}`}
                >
                  <Mail size={14} className="text-bronze/60 group-hover:text-bronze transition-colors" />
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                    {email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={toTelHref(phone)}
                  className="text-white/60 text-sm hover:text-bronze transition-colors duration-300 flex items-center gap-2 group"
                  aria-label={`Phone: ${phone}`}
                  dir="ltr"
                >
                  <Phone size={14} className="text-bronze/60 group-hover:text-bronze transition-colors" />
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                    {phone}
                  </span>
                </a>
              </li>
              <li>
                <span className="text-white/60 text-sm flex items-center gap-2">
                  <MapPin size={14} className="text-bronze/60" />
                  {location}
                </span>
              </li>
            </ul>

            {/* Social Media Links */}
            {socialLinks.length > 0 && (
              <div>
                <h5 className="text-white/40 text-xs tracking-wider uppercase mb-4">
                  {lang === 'ar' ? 'تابعني' : 'Follow Me'}
                </h5>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social: any, index: number) => {
                    const Icon = socialIconMap[social.icon.toLowerCase()] || Globe;
                    return (
                      <motion.a
                        key={social._id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.78, y: 18, rotate: -6 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.08,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{ 
                          scale: 1.2, 
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative w-11 h-11 bg-white/5 border border-white/10 hover:border-bronze/50 hover:bg-bronze/10 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                        aria-label={social.platform}
                        title={social.platform}
                      >
                        {/* Background glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-bronze/0 via-bronze/0 to-bronze/0 group-hover:from-bronze/10 group-hover:via-bronze/5 group-hover:to-bronze/0"
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.4 }}
                          className="relative z-10"
                        >
                          <Icon 
                            size={18} 
                            className="text-white/60 group-hover:text-bronze transition-colors duration-300" 
                          />
                        </motion.div>
                        
                        {/* Tooltip */}
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-navy text-white text-xs px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-bronze/20"
                        >
                          {social.platform}
                          {/* Tooltip arrow */}
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-navy border-r border-b border-bronze/20 rotate-45" />
                        </motion.span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs tracking-wide">
            © {new Date().getFullYear()} {lang === 'ar'
              ? settings?.fullNameAr || 'أبوبكر علاو'
              : settings?.fullNameEn || settings?.siteName || 'Abubakr Allaw'}. {t('footer.rights')}
          </p>
          <p className="text-white/40 text-xs tracking-wide">
            {profileData.descriptor}
          </p>
        </div>
      </div>
    </footer>
  );
}
