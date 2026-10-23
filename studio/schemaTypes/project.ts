import {defineField, defineType} from 'sanity';
import {galleryField, imageField} from './media';
import {LegacyUrlPreviewInput} from '../components/LegacyUrlPreviewInput';
import {LegacyUrlArrayPreviewInput} from '../components/LegacyUrlArrayPreviewInput';

const bilingual = (name: string, title: string, group: string, rows = 3) => [
  defineField({name: `${name}En`, title: `${title} بالإنجليزية`, type: 'text', rows, group}),
  defineField({name: `${name}Ar`, title: `${title} بالعربية`, type: 'text', rows, group}),
];

export const project = defineType({
  name: 'project',
  title: 'مشروع',
  type: 'document',
  groups: [
    {name: 'identity', title: 'بيانات المشروع'},
    {name: 'details', title: 'التفاصيل'},
    {name: 'media', title: 'الصور والمعرض'},
    {name: 'classification', title: 'القسم والترتيب'},
    {name: 'publishing', title: 'الظهور والترتيب'},
  ],
  fields: [
    defineField({name: 'titleEn', title: 'العنوان بالإنجليزية', type: 'string', group: 'identity', validation: (rule) => rule.required()}),
    defineField({name: 'titleAr', title: 'العنوان بالعربية', type: 'string', group: 'identity'}),
    defineField({name: 'slug', title: 'الرابط المختصر', type: 'slug', group: 'identity', options: {source: 'titleEn', maxLength: 96}, description: 'يُستخدم في رابط صفحة تفاصيل المشروع. لا تغيّر slug المنشور دون مراجعة.'}),
    ...bilingual('subtitle', 'العنوان الفرعي', 'identity', 2),
    ...bilingual('description', 'الوصف', 'identity', 5),
    defineField({name: 'categoryKey', title: 'قسم المشروع', type: 'string', group: 'classification', options: {
      layout: 'dropdown',
      list: [
        {title: 'سكني · Residential', value: 'residential'},
        {title: 'تجاري · Commercial', value: 'commercial'},
        {title: 'داخلي · Interior', value: 'interior'},
        {title: 'إظهار · Visualization', value: 'visualization'},
        {title: 'أخرى · Custom category', value: 'other'},
      ],
    }, validation: (rule) => rule.required(), description: 'اختر فئة المشروع. عند اختيار «أخرى» أدخل الاسم باللغتين في الحقول التي ستظهر.'}),
    defineField({name: 'categoryCustomEn', title: 'اسم القسم بالإنجليزية (أخرى)', type: 'string', group: 'classification', hidden: ({parent}) => parent?.categoryKey !== 'other', validation: (rule) => rule.custom((value, context) => {
      if ((context.document as any)?.categoryKey !== 'other') return true;
      return typeof value === 'string' && value.trim() ? true : 'أدخل اسم القسم بالإنجليزية عند اختيار «أخرى».';
    })}),
    defineField({name: 'categoryCustomAr', title: 'اسم القسم بالعربية (أخرى)', type: 'string', group: 'classification', hidden: ({parent}) => parent?.categoryKey !== 'other', validation: (rule) => rule.custom((value, context) => {
      if ((context.document as any)?.categoryKey !== 'other') return true;
      return typeof value === 'string' && value.trim() ? true : 'أدخل اسم القسم بالعربية عند اختيار «أخرى».';
    })}),
    defineField({name: 'categoryEn', title: 'التصنيف القديم بالإنجليزية', type: 'string', group: 'identity', hidden: true, readOnly: true, description: 'حقل توافق قديم محفوظ للبيانات السابقة؛ استخدم «قسم المشروع».'}),
    defineField({name: 'categoryAr', title: 'التصنيف القديم بالعربية', type: 'string', group: 'identity', hidden: true, readOnly: true, description: 'حقل توافق قديم محفوظ للبيانات السابقة؛ استخدم «قسم المشروع».'}),
    defineField({name: 'locationEn', title: 'الموقع بالإنجليزية', type: 'string', group: 'details'}),
    defineField({name: 'locationAr', title: 'الموقع بالعربية', type: 'string', group: 'details'}),
    defineField({name: 'year', title: 'السنة', type: 'string', group: 'details'}),
    defineField({name: 'area', title: 'المساحة', type: 'string', group: 'details'}),
    defineField({name: 'client', title: 'العميل', type: 'string', group: 'details'}),
    defineField({name: 'status', title: 'الحالة', type: 'string', group: 'details'}),
    ...bilingual('role', 'الدور في المشروع', 'details'),
    ...bilingual('scope', 'نطاق العمل', 'details', 5),
    ...bilingual('concept', 'الفكرة التصميمية', 'details', 5),
    ...bilingual('methodology', 'المنهجية', 'details', 5),
    defineField({name: 'software', title: 'البرامج المستخدمة', type: 'array', of: [{type: 'string'}], group: 'details'}),
    imageField('coverImage', 'صورة الغلاف المرفوعة', 'تظهر كبطاقة المشروع وفي أعلى صفحة التفاصيل.', 'media'),
    galleryField('gallery', 'معرض الصور المرفوع', 'تظهر الصور بالترتيب داخل صفحة تفاصيل المشروع. اسحب العناصر لتغيير الترتيب.', 'media'),
    defineField({name: 'coverImageUrl', title: 'رابط الغلاف القديم', type: 'string', group: 'media', hidden: true, readOnly: true, components: {input: LegacyUrlPreviewInput}, description: 'حقل توافق قديم مخفي؛ استخدم صورة الغلاف المرفوعة.'}),
    defineField({name: 'galleryUrls', title: 'روابط المعرض القديمة', type: 'array', group: 'media', hidden: true, readOnly: true, components: {input: LegacyUrlArrayPreviewInput}, of: [{type: 'string'}], description: 'حقل توافق قديم مخفي؛ استخدم معرض الصور المرفوع.'}),
    defineField({name: 'visible', title: 'إظهار المشروع للعامة', type: 'boolean', group: 'publishing', initialValue: true}),
    defineField({name: 'featured', title: 'إظهار في الرئيسية', type: 'boolean', group: 'publishing'}),
    defineField({name: 'order', title: 'ترتيب العرض', type: 'number', group: 'classification', description: 'رقم صحيح موجب؛ الأقل يظهر أولاً في صفحة المشاريع والتنقل بين المشاريع.', validation: (rule) => rule.required().integer().min(1)}),
  ],
  preview: {select: {title: 'titleEn', subtitle: 'titleAr', media: 'coverImage'}},
});
