import {defineField, defineType} from 'sanity';
import {imageField} from './media';
import {LegacyUrlPreviewInput} from '../components/LegacyUrlPreviewInput';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع والهوية',
  type: 'document',
  groups: [
    {name: 'identity', title: 'الهوية'},
    {name: 'contact', title: 'التواصل'},
    {name: 'social', title: 'الحسابات الاجتماعية'},
    {name: 'media', title: 'الشعار والوسائط'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'siteName', title: 'اسم الموقع', type: 'string', group: 'identity', description: 'يظهر في عنوان الموقع والهوية العامة.'}),
    defineField({name: 'fullNameEn', title: 'الاسم الكامل بالإنجليزية', type: 'string', group: 'identity', description: 'يظهر في الشريط العلوي والتذييل.'}),
    defineField({name: 'fullNameAr', title: 'الاسم الكامل بالعربية', type: 'string', group: 'identity', description: 'يظهر في الشريط العلوي والتذييل عند اختيار العربية.'}),
    defineField({name: 'roleEn', title: 'المسمى المهني بالإنجليزية', type: 'string', group: 'identity', description: 'يظهر بجانب الاسم وفي تعريف الصفحة الرئيسية.'}),
    defineField({name: 'roleAr', title: 'المسمى المهني بالعربية', type: 'string', group: 'identity', description: 'يظهر بجانب الاسم وفي تعريف الصفحة الرئيسية.'}),
    defineField({name: 'descriptorEn', title: 'الوصف المختصر بالإنجليزية', type: 'text', rows: 3, group: 'identity', description: 'يظهر في مقدمة الموقع.'}),
    defineField({name: 'descriptorAr', title: 'الوصف المختصر بالعربية', type: 'text', rows: 3, group: 'identity', description: 'يظهر في مقدمة الموقع.'}),
    defineField({name: 'summaryEn', title: 'النبذة بالإنجليزية', type: 'text', rows: 5, group: 'identity', description: 'يستخدم في التعريف والملخص العام.'}),
    defineField({name: 'summaryAr', title: 'النبذة بالعربية', type: 'text', rows: 5, group: 'identity', description: 'يستخدم في التعريف والملخص العام.'}),
    defineField({name: 'email', title: 'البريد الإلكتروني', type: 'string', group: 'contact', description: 'يظهر في صفحة التواصل والتذييل.'}),
    defineField({name: 'phone', title: 'الهاتف', type: 'string', group: 'contact', description: 'يظهر في صفحة التواصل عند توفره.'}),
    defineField({name: 'whatsapp', title: 'WhatsApp', type: 'string', group: 'contact', description: 'يستخدم لزر WhatsApp في الموقع.'}),
    defineField({name: 'locationEn', title: 'الموقع بالإنجليزية', type: 'string', group: 'contact'}),
    defineField({name: 'locationAr', title: 'الموقع بالعربية', type: 'string', group: 'contact'}),
    defineField({name: 'nationalityEn', title: 'الجنسية بالإنجليزية', type: 'string', group: 'contact'}),
    defineField({name: 'nationalityAr', title: 'الجنسية بالعربية', type: 'string', group: 'contact'}),
    defineField({
      name: 'socialLinks',
      title: 'روابط التواصل الاجتماعي',
      type: 'array',
      group: 'social',
      description: 'اختر منصة شائعة، أضف رابط حسابك، ثم فعّل إظهارها. ستظهر الأيقونة تلقائياً في الموقع.',
      of: [{type: 'object', fields: [
        defineField({
          name: 'platform',
          title: 'المنصة والأيقونة',
          type: 'string',
          description: 'اختر المنصة؛ سيستخدم الموقع أيقونتها تلقائياً.',
          options: {
            layout: 'dropdown',
            list: [
              {title: 'Instagram', value: 'instagram'},
              {title: 'LinkedIn', value: 'linkedin'},
              {title: 'Behance', value: 'behance'},
              {title: 'YouTube', value: 'youtube'},
              {title: 'Facebook', value: 'facebook'},
              {title: 'X / Twitter', value: 'x'},
              {title: 'TikTok', value: 'tiktok'},
              {title: 'GitHub', value: 'github'},
              {title: 'Dribbble', value: 'dribbble'},
              {title: 'Pinterest', value: 'pinterest'},
              {title: 'WhatsApp', value: 'whatsapp'},
              {title: 'Telegram', value: 'telegram'},
              {title: 'Upwork', value: 'upwork'},
              {title: 'موقع إلكتروني', value: 'website'},
              {title: 'أخرى', value: 'other'},
            ],
          },
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'label', title: 'الاسم الظاهر اختيارياً', type: 'string', description: 'يظهر كاسم الحساب في التلميح. يمكن تركه فارغاً.'}),
        defineField({
          name: 'url',
          title: 'رابط الحساب',
          type: 'string',
          description: 'الصق الرابط كاملاً مثل https://instagram.com/username أو instagram.com/username. سيضيف الموقع https:// تلقائياً عند الحاجة.',
          validation: (rule) => rule.required().custom((value) => {
            if (!value || !value.trim()) return 'أدخل رابط الحساب.';
            const trimmed = value.trim();
            const candidate = trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`;
            try {
              const parsed = new URL(candidate);
              return parsed.hostname.includes('.') ? true : 'أدخل رابطاً صحيحاً يحتوي على اسم نطاق.';
            } catch {
              return 'أدخل رابطاً صحيحاً مثل https://instagram.com/username.';
            }
          }),
        }),
        defineField({name: 'enabled', title: 'إظهار الحساب', type: 'boolean', initialValue: true}),
      ], preview: {
        select: {platform: 'platform', title: 'label', subtitle: 'url', enabled: 'enabled'},
        prepare(selection) {
          const {platform, title, subtitle, enabled} = selection;
          return {title: `${enabled === false ? '◌ ' : '● '}${title || platform || 'حساب اجتماعي'}`, subtitle: subtitle || 'أضف رابط الحساب'};
        },
      }}],
    }),
    imageField('logo', 'الشعار المرفوع', 'ارفع الشعار الذي سيظهر في الشريط العلوي والتذييل. يبقى الشعار الاحتياطي كما هو إذا تركت الحقل فارغاً.', 'media'),
    imageField('logoLight', 'الشعار الأبيض / الفاتح', 'نسخة الشعار المناسبة فوق الخلفيات الداكنة. إذا تُركت فارغة، يستخدم الموقع معالجة تلقائية مؤقتة للنسخة الأساسية.', 'media'),
    defineField({name: 'logoScale', title: 'حجم الشعار', type: 'number', group: 'media', description: 'النطاق المدعوم من 50% إلى 200%.', validation: (rule) => rule.min(50).max(200)}),
    imageField('heroBackground', 'خلفية الصفحة الرئيسية', 'ارفع صورة خلفية Hero من هنا. استخدم Hotspot لتحديد الجزء المهم؛ ستُعرض الصورة بمقاس متجاوب دون تمديد، وتبقى الخلفية الحالية مستخدمة إذا تركت الحقل فارغاً.', 'media'),
    imageField('profileImage', 'الصورة الشخصية — صفحة عن المهندس', 'تعديل الصورة من هنا: ارفع صورة جديدة أو استبدل الصورة الحالية، ثم استخدم Hotspot لتحديد الجزء المهم. إذا تُركت فارغة يستخدم الموقع صورة مؤقتة قابلة للاستبدال.', 'media'),
    imageField('shareImage', 'صورة المشاركة الاجتماعية', 'تُعرض تلقائياً بنسبة 1200×630 عبر CDN. استخدم Hotspot لتحريك الصورة وتحديد الجزء المهم دون فراغات أو تمدد.', 'media'),
    defineField({
      name: 'shareImageUrl',
      title: 'رابط صورة المشاركة القديم',
      type: 'string',
      group: 'media',
      hidden: true,
      readOnly: true,
      components: {input: LegacyUrlPreviewInput},
      description: 'حقل توافق قديم؛ لا تحذفه ولا تغيّر قيمته في هذه المرحلة.',
    }),
    defineField({name: 'seoTitleAr', title: 'عنوان SEO بالعربية', type: 'string', group: 'seo', description: 'عنوان نتيجة البحث عند اختيار العربية.'}),
    defineField({name: 'seoTitleEn', title: 'عنوان SEO بالإنجليزية', type: 'string', group: 'seo', description: 'عنوان نتيجة البحث عند اختيار الإنجليزية.'}),
    defineField({name: 'seoDescriptionAr', title: 'وصف SEO بالعربية', type: 'text', rows: 4, group: 'seo', description: 'وصف مختصر للتخصصات والخدمات عند اختيار العربية.'}),
    defineField({name: 'seoDescriptionEn', title: 'وصف SEO بالإنجليزية', type: 'text', rows: 4, group: 'seo', description: 'وصف مختصر للتخصصات والخدمات عند اختيار الإنجليزية.'}),
    defineField({name: 'seoTitle', title: 'عنوان SEO القديم', type: 'string', group: 'seo', hidden: true, readOnly: true}),
    defineField({name: 'seoDescription', title: 'وصف SEO القديم', type: 'text', rows: 4, group: 'seo', hidden: true, readOnly: true}),
  ],
  preview: {select: {title: 'siteName', subtitle: 'roleEn', media: 'logo'}},
});
