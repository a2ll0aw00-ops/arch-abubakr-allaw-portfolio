import {defineField, defineType} from 'sanity';
import {imageField} from './media';

const pageTitles: Record<string, string> = {
  home: 'الرئيسية',
  about: 'عن المهندس',
  projects: 'المشاريع',
  projectDetail: 'تفاصيل المشروع',
  services: 'الخدمات',
  cv: 'السيرة الذاتية',
  contact: 'التواصل',
};

export const customSection = defineType({
  name: 'customSection',
  title: 'قسم محتوى إضافي',
  type: 'document',
  groups: [
    {name: 'placement', title: 'مكان الظهور'},
    {name: 'content', title: 'المحتوى'},
    {name: 'media', title: 'الصورة'},
    {name: 'action', title: 'الرابط الاختياري'},
    {name: 'display', title: 'الترتيب والإظهار'},
  ],
  fields: [
    defineField({
      name: 'page',
      title: 'الصفحة التي يظهر فيها القسم',
      type: 'string',
      group: 'placement',
      options: {
        layout: 'dropdown',
        list: Object.entries(pageTitles).map(([value, title]) => ({value, title})),
      },
      validation: (rule) => rule.required(),
      description: 'يُعرض القسم بعد محتوى الصفحة وقبل التذييل.',
    }),
    defineField({name: 'titleAr', title: 'عنوان القسم بالعربية', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'titleEn', title: 'عنوان القسم بالإنجليزية', type: 'string', group: 'content', description: 'اختياري؛ عند تركه فارغاً يستخدم الموقع العنوان العربي.'}),
    defineField({name: 'bodyAr', title: 'النص بالعربية', type: 'text', rows: 5, group: 'content', validation: (rule) => rule.required()}),
    defineField({name: 'bodyEn', title: 'النص بالإنجليزية', type: 'text', rows: 5, group: 'content', description: 'اختياري؛ عند تركه فارغاً يستخدم الموقع النص العربي.'}),
    imageField('image', 'صورة القسم (اختيارية)', 'ارفع صورة لتظهر فعلياً داخل القسم، وحدد الجزء المهم باستخدام Hotspot.', 'media'),
    defineField({
      name: 'linkUrl',
      title: 'رابط اختياري',
      type: 'string',
      group: 'action',
      description: 'رابط صفحة داخلية مثل /contact أو رابط خارجي يبدأ بـ https://.',
      validation: (rule) => rule.custom((value) => {
        if (!value) return true;
        const trimmed = value.trim();
        if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;
        if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return true;
        return 'استخدم مساراً داخلياً يبدأ بـ / أو رابطاً يبدأ بـ https://.';
      }),
    }),
    defineField({name: 'linkLabelAr', title: 'نص الرابط بالعربية', type: 'string', group: 'action'}),
    defineField({name: 'linkLabelEn', title: 'نص الرابط بالإنجليزية', type: 'string', group: 'action'}),
    defineField({name: 'order', title: 'ترتيب القسم', type: 'number', group: 'display', initialValue: 100, description: 'تظهر الأقسام بالترتيب من الرقم الأصغر إلى الأكبر.'}),
    defineField({name: 'visible', title: 'إظهار القسم على الموقع', type: 'boolean', group: 'display', initialValue: true}),
  ],
  preview: {
    select: {title: 'titleAr', titleEn: 'titleEn', page: 'page', visible: 'visible', media: 'image'},
    prepare({title, titleEn, page, visible, media}) {
      return {
        title: `${visible === false ? '◌ ' : '● '}${title || titleEn || 'قسم جديد'}`,
        subtitle: `${pageTitles[page] || page || 'اختر الصفحة'}${titleEn ? ` · ${titleEn}` : ''}`,
        media,
      };
    },
  },
});
