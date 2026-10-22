import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useSiteCopy } from '../hooks';

type Language = 'en' | 'ar';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'ABUBAKR ALLAW',
    'hero.subtitle': 'Architecture · BIM · Design',
    'hero.description': 'Architectural Engineer & Interior Designer crafting spaces that inspire — where form meets function through innovative design, precise BIM documentation, and thoughtful creative vision.',
    'hero.cta': 'View Projects',
    'hero.cv': 'View CV',
    'hero.scroll': 'Scroll',
    
    // Selected Works
    'works.title': 'Selected Works',
    'works.subtitle': 'Portfolio',
    'works.viewAll': 'View All Projects',
    'works.empty': 'Projects will be displayed here as they are published from the content management system.',
    'works.emptyNote': 'Connect Sanity CMS to showcase real architectural work.',
    
    // About
    'about.title': 'About',
    'about.heading': 'Designing Spaces',
    'about.headingAccent': 'That Matter',
    'about.description': 'An architectural engineer and interior designer based in Ibb, Yemen, dedicated to creating meaningful spaces that balance aesthetics with functionality. With expertise spanning architectural design, building information modeling, and interior design, I bring a comprehensive approach to every project.',
    'about.viewCv': 'View Full CV',
    'about.specialist': 'Specialist',
    
    // Skills (condensed for homepage)
    'skills.title': 'Capabilities',
    'skills.heading': 'Skills & Expertise',
    'skills.description': 'A comprehensive skill set spanning design, technology, and visualization.',
    
    // Services
    'services.title': 'Expertise',
    'services.heading': 'Services',
    'services.description': 'Comprehensive architectural services from concept to completion.',
    'services.learnMore': 'Learn More',
    'services.discussProject': 'Discuss a Project',
    'services.priceStart': 'Starting at:',
    'services.delivery': 'Delivery:',
    'services.upwork': 'Hire me on Upwork',
    'services.cta.heading': 'Ready to Start Your Project?',
    'services.cta.description': "Let's discuss how I can help bring your architectural vision to life.",
    'services.cta.button': 'Get In Touch',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.heading': "Let's Create",
    'contact.headingAccent': 'Together',
    'contact.description': "Whether you have a project in mind or want to explore collaboration opportunities, I'd love to hear from you.",
    'contact.startProject': 'Start a Project',
    'contact.startDescription': "Ready to begin? Send me a message with your project details, and I'll get back to you within 24 hours.",
    'contact.button': 'Contact Me',
    'contact.responseTime': 'Response Time',
    'contact.commitment': 'Commitment',
    
    // Contact Page
    'contactPage.title': 'Contact',
    'contactPage.heading': 'Get In Touch',
    'contactPage.description': "Have a project in mind or want to discuss collaboration? I'd love to hear from you.",
    'contactPage.formHeading': "Let's Discuss Your Project",
    'contactPage.name': 'Name',
    'contactPage.email': 'Email',
    'contactPage.subject': 'Subject',
    'contactPage.message': 'Message',
    'contactPage.namePlaceholder': 'Your name',
    'contactPage.emailPlaceholder': 'your@email.com',
    'contactPage.subjectPlaceholder': 'Project inquiry',
    'contactPage.messagePlaceholder': 'Tell me about your project...',
    'contactPage.send': 'Send Message',
    'contactPage.sent': 'Opening your email client...',
    'contactPage.follow': 'Follow',
    
    // Projects Page
    'projects.title': 'Portfolio',
    'projects.heading': 'Projects',
    'projects.description': 'A collection of architectural and interior design projects.',
    'projects.all': 'All',
    'projects.empty': 'No projects found in this category.',
    'projects.backToProjects': 'Back to Projects',
    'projects.projectNotFound': 'Project Not Found',
    'projects.previous': 'Previous',
    'projects.next': 'Next',
    'projects.overview': 'Overview',
    'projects.designConcept': 'Design Concept',
    'projects.methodology': 'Methodology',
    'projects.gallery': 'Gallery',
    'projects.role': 'Role',
    'projects.scope': 'Scope',
    'projects.client': 'Client',
    'projects.software': 'Software',
    'projects.location': 'Location',
    'projects.year': 'Year',
    'projects.area': 'Area',
    'projects.status': 'Status',
    'projects.completed': 'Completed',
    'projects.inProgress': 'In Progress',
    
    // About Page
    'aboutPage.title': 'About',
    'aboutPage.heading': 'Abubakr Allaw',
    'aboutPage.role': 'Architectural Engineer & Interior Designer',
    'aboutPage.whatIDo': 'What I Do',
    'aboutPage.servicesHeading': 'Services',
    'aboutPage.summary': 'An architectural engineer and interior designer based in Ibb, Yemen, dedicated to creating meaningful spaces that balance aesthetics with functionality. With expertise spanning architectural design, building information modeling, and interior design, I bring a comprehensive approach to every project — from initial concept through detailed documentation and visual presentation.',
    'aboutPage.approach': 'My approach combines technical precision with creative vision. I believe that great architecture emerges from a deep understanding of context, program, and the human experience of space.',
    'aboutPage.commitment': 'Whether working on a residential project or a commercial space, I bring the same commitment to quality, innovation, and attention to detail.',
    
    // Services Page
    'servicesPage.title': 'Services',
    'servicesPage.heading': 'Services',
    'servicesPage.description': 'Comprehensive architectural services combining design excellence with technical precision and creative innovation.',
    
    // CV Page
    'cv.title': 'Curriculum Vitae',
    'cv.heading': 'Abubakr Abdullah Allaw',
    'cv.profile': 'Profile',
    'cv.contact': 'Contact',
    'cv.skillsHeading': 'Skills & Expertise',
    'cv.experience': 'Experience',
    'cv.education': 'Education',
    'cv.languages': 'Languages',
    'cv.native': 'Native',
    'cv.fluent': 'Fluent',
    'cv.download': 'Download PDF',
    'cv.print': 'Print CV',
    'cv.nationality': 'Nationality',
    'cv.location': 'Location',
    
    // Footer
    'footer.description': 'Architecture · BIM · Design — Creating meaningful spaces through innovative design, precise documentation, and thoughtful creative vision.',
    'footer.navigation': 'Navigation',
    'footer.connect': 'Connect',
    'footer.rights': 'All rights reserved.',
    
    // WhatsApp
    'whatsapp.label': 'Chat on WhatsApp',
    
    // Language
    'lang.switch': 'العربية',
    'lang.switchAr': 'EN',
    
    // 404
    'notFound.code': '404',
    'notFound.heading': 'Page Not Found',
    'notFound.description': "The page you're looking for doesn't exist or has been moved.",
    'notFound.back': 'Back to Home',
    
    // Service items
    'service.archDesign.title': 'Architectural Design',
    'service.archDesign.description': 'Comprehensive architectural design services from concept development to detailed design, creating spaces that respond to context, function, and aspiration.',
    'service.bim.title': 'BIM Modeling & Documentation',
    'service.bim.description': 'Professional BIM services using Revit and industry-standard tools for accurate modeling, coordination, and construction documentation.',
    'service.visualization.title': '3D Visualization',
    'service.visualization.description': 'Photorealistic architectural visualization that communicates design intent with clarity and impact, from conceptual renders to presentation-quality imagery.',
    'service.interior.title': 'Interior Design',
    'service.interior.description': 'Thoughtful interior design that creates cohesive environments, balancing materiality, light, and spatial quality to enhance the human experience.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع',
    'nav.about': 'عن المهندس',
    'nav.services': 'الخدمات',
    'nav.cv': 'السيرة الذاتية',
    'nav.contact': 'تواصل',
    
    // Hero
    'hero.title': 'أبوبكر علاو',
    'hero.subtitle': 'عمارة · نمذجة معلومات البناء · تصميم',
    'hero.description': 'مهندس معماري ومصمم داخلي أخلق مساحات ملهمة — حيث يلتقي الشكل بالوظيفة من خلال التصميم المبتكر، والتوثيق الدقيق لنمذجة معلومات البناء، والرؤية الإبداعية المدروسة.',
    'hero.cta': 'استعرض المشاريع',
    'hero.cv': 'السيرة الذاتية',
    'hero.scroll': 'مرر',
    
    // Selected Works
    'works.title': 'أعمال مختارة',
    'works.subtitle': 'معرض الأعمال',
    'works.viewAll': 'عرض جميع المشاريع',
    'works.empty': 'سيتم عرض المشاريع هنا فور نشرها من نظام إدارة المحتوى.',
    'works.emptyNote': 'قم بربط Sanity CMS لعرض الأعمال المعمارية الحقيقية.',
    
    // About
    'about.title': 'نبذة',
    'about.heading': 'تصميم مساحات',
    'about.headingAccent': 'ذات معنى',
    'about.description': 'مهندس معماري ومصمم داخلي مقيم في إب، اليمن، أكرّس جهودي لإنشاء مساحات ذات معنى توازن بين الجماليات والوظيفية. بخبرة تمتد عبر التصميم المعماري ونمذجة معلومات البناء والتصميم الداخلي، أقدم نهجًا شاملاً لكل مشروع.',
    'about.viewCv': 'عرض السيرة الذاتية',
    'about.specialist': 'متخصص',
    
    // Skills
    'skills.title': 'القدرات',
    'skills.heading': 'المهارات والخبرات',
    'skills.description': 'مجموعة شاملة من المهارات تمتد عبر التصميم والتقنية والإظهار المعماري.',
    
    // Services
    'services.title': 'التخصص',
    'services.heading': 'الخدمات',
    'services.description': 'خدمات معمارية شاملة من الفكرة حتى التنفيذ.',
    'services.learnMore': 'اعرف المزيد',
    'services.discussProject': 'ناقش مشروعك',
    'services.priceStart': 'يبدأ السعر من:',
    'services.delivery': 'مدة التسليم:',
    'services.upwork': 'اطلب الخدمة عبر Upwork',
    'services.cta.heading': 'هل أنت مستعد لبدء مشروعك؟',
    'services.cta.description': 'دعنا نناقش كيف يمكنني المساعدة في تحقيق رؤيتك المعمارية.',
    'services.cta.button': 'تواصل معي',
    
    // Contact
    'contact.title': 'تواصل',
    'contact.heading': 'لنبدع',
    'contact.headingAccent': 'معًا',
    'contact.description': 'سواء كان لديك مشروع في ذهنك أو ترغب في استكشاف فرص التعاون، يسعدني أن أسمع منك.',
    'contact.startProject': 'ابدأ مشروعًا',
    'contact.startDescription': 'مستعد للبدء؟ أرسل لي رسالة بتفاصيل مشروعك، وسأرد عليك خلال ٢٤ ساعة.',
    'contact.button': 'تواصل معي',
    'contact.responseTime': 'وقت الاستجابة',
    'contact.commitment': 'الالتزام',
    
    // Contact Page
    'contactPage.title': 'تواصل',
    'contactPage.heading': 'تواصل معي',
    'contactPage.description': 'لديك مشروع في ذهنك أو ترغب في مناقشة فرص التعاون؟ يسعدني أن أسمع منك.',
    'contactPage.formHeading': 'لنناقش مشروعك',
    'contactPage.name': 'الاسم',
    'contactPage.email': 'البريد الإلكتروني',
    'contactPage.subject': 'الموضوع',
    'contactPage.message': 'الرسالة',
    'contactPage.namePlaceholder': 'اسمك',
    'contactPage.emailPlaceholder': 'بريدك@الإلكتروني.com',
    'contactPage.subjectPlaceholder': 'استفسار عن مشروع',
    'contactPage.messagePlaceholder': 'أخبرني عن مشروعك...',
    'contactPage.send': 'إرسال الرسالة',
    'contactPage.sent': 'جاري فتح برنامج البريد...',
    'contactPage.follow': 'تابعني',
    
    // Projects Page
    'projects.title': 'معرض الأعمال',
    'projects.heading': 'المشاريع',
    'projects.description': 'مجموعة من المشاريع المعمارية وتصميم الديوان الداخلي.',
    'projects.all': 'الكل',
    'projects.empty': 'لا توجد مشاريع في هذا التصنيف.',
    'projects.backToProjects': 'العودة للمشاريع',
    'projects.projectNotFound': 'المشروع غير موجود',
    'projects.previous': 'السابق',
    'projects.next': 'التالي',
    'projects.overview': 'نظرة عامة',
    'projects.designConcept': 'الفكرة التصميمية',
    'projects.methodology': 'منهجية التنفيذ',
    'projects.gallery': 'معرض الصور',
    'projects.role': 'الدور',
    'projects.scope': 'نطاق العمل',
    'projects.client': 'العميل',
    'projects.software': 'البرامج',
    'projects.location': 'الموقع',
    'projects.year': 'السنة',
    'projects.area': 'المساحة',
    'projects.status': 'الحالة',
    'projects.completed': 'مكتمل',
    'projects.inProgress': 'قيد التنفيذ',
    
    // About Page
    'aboutPage.title': 'عن المهندس',
    'aboutPage.heading': 'أبوبكر علاو',
    'aboutPage.role': 'مهندس معماري ومصمم داخلي',
    'aboutPage.whatIDo': 'ما أقدمه',
    'aboutPage.servicesHeading': 'الخدمات',
    'aboutPage.summary': 'مهندس معماري ومصمم داخلي مقيم في إب، اليمن، أكرّس جهودي لإنشاء مساحات ذات معنى توازن بين الجماليات والوظيفية. بخبرة تمتد عبر التصميم المعماري ونمذجة معلومات البناء والتصميم الداخلي، أقدم نهجًا شاملاً لكل مشروع — من الفكرة الأولية مرورًا بالتوثيق التفصيلي والإظهار البصري.',
    'aboutPage.approach': 'يجمع نهجي بين الدقة التقنية والرؤية الإبداعية. أؤمن بأن العمارة الرائعة تنبثق من فهم عميق للسياق والبرنامج والتجربة الإنسانية للمكان.',
    'aboutPage.commitment': 'سواء كنت أعمل على مشروع سكني أو مساحة تجارية، أحضر نفس الالتزام بالجودة والابتكار والاهتمام بالتفاصيل.',
    
    // Services Page
    'servicesPage.title': 'الخدمات',
    'servicesPage.heading': 'الخدمات',
    'servicesPage.description': 'خدمات معمارية شاملة تجمع بين التميز التصميمي والدقة التقنية والابتكار الإبداعي.',
    
    // CV Page
    'cv.title': 'السيرة الذاتية',
    'cv.heading': 'أبوبكر عبدالله علاو',
    'cv.profile': 'النبذة المهنية',
    'cv.contact': 'التواصل',
    'cv.skillsHeading': 'المهارات والخبرات',
    'cv.experience': 'الخبرات العملية',
    'cv.education': 'التعليم',
    'cv.languages': 'اللغات',
    'cv.native': 'اللغة الأم',
    'cv.fluent': 'بطلاقة',
    'cv.download': 'تحميل PDF',
    'cv.print': 'طباعة السيرة',
    'cv.nationality': 'الجنسية',
    'cv.location': 'الموقع',
    
    // Footer
    'footer.description': 'عمارة · نمذجة معلومات البناء · تصميم — إنشاء مساحات ذات معنى من خلال التصميم المبتكر والتوثيق الدقيق والرؤية الإبداعية المدروسة.',
    'footer.navigation': 'التنقل',
    'footer.connect': 'تواصل',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // WhatsApp
    'whatsapp.label': 'تواصل عبر واتساب',
    
    // Language
    'lang.switch': 'EN',
    'lang.switchAr': 'العربية',
    
    // 404
    'notFound.code': '٤٠٤',
    'notFound.heading': 'الصفحة غير موجودة',
    'notFound.description': 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    'notFound.back': 'العودة للرئيسية',
    
    // Service items
    'service.archDesign.title': 'التصميم المعماري',
    'service.archDesign.description': 'خدمات تصميم معماري شاملة من تطوير الفكرة إلى التصميم التفصيلي، إنشاء مساحات تستجيب للسياق والوظيفة والطموح.',
    'service.bim.title': 'نمذجة معلومات البناء والتوثيق',
    'service.bim.description': 'خدمات BIM احترافية باستخدام Revit وأدوات معايير الصناعة للنمذجة الدقيقة والتنسيق وتوثيق البناء.',
    'service.visualization.title': 'الإظهار المعماري ثلاثي الأبعاد',
    'service.visualization.description': 'إظهار معماري واقعي ينقل نية التصميم بوضوح وتأثير، من التصورات المفاهيمية إلى الصور عالية الجودة.',
    'service.interior.title': 'التصميم الداخلي',
    'service.interior.description': 'تصميم داخلي مدروس يخلق بيئات متماسكة، يوازن بين الخامات والضوء والجودة المكانية لتعزيز التجربة الإنسانية.',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const { data: siteCopy } = useSiteCopy();
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') as Language;
      if (saved === 'en' || saved === 'ar') return saved;
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const copyOverrides = useMemo(() => new Map(
    (siteCopy || []).flatMap((section) => section.entries || []).map((entry) => [entry.key, entry] as const),
  ), [siteCopy]);
  const t = (key: string): string => {
    const entry = copyOverrides.get(key);
    const cmsValue = lang === 'ar' ? entry?.arabic : entry?.english;
    if (typeof cmsValue === 'string') return cmsValue;
    return translations[lang][key] || translations.en[key] || key;
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
