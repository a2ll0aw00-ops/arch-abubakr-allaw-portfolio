import {defineField, defineType} from 'sanity';
import {galleryField, imageField} from './media';
import {LegacyUrlPreviewInput} from '../components/LegacyUrlPreviewInput';
import {LegacyUrlArrayPreviewInput} from '../components/LegacyUrlArrayPreviewInput';

export const service = defineType({
  name: 'service',
  title: 'خدمة',
  type: 'document',
  groups: [
    {name: 'identity', title: 'بيانات الخدمة'},
    {name: 'media', title: 'الصور'},
    {name: 'offers', title: 'العروض والباقات'},
    {name: 'publishing', title: 'الظهور والترتيب'},
  ],
  fields: [
    defineField({name: 'titleEn', title: 'اسم الخدمة بالإنجليزية', type: 'string', group: 'identity', validation: (rule) => rule.required()}),
    defineField({name: 'titleAr', title: 'اسم الخدمة بالعربية', type: 'string', group: 'identity'}),
    defineField({name: 'descriptionEn', title: 'الوصف بالإنجليزية', type: 'text', rows: 5, group: 'identity'}),
    defineField({name: 'descriptionAr', title: 'الوصف بالعربية', type: 'text', rows: 5, group: 'identity'}),
    defineField({name: 'icon', title: 'الأيقونة', type: 'string', group: 'identity', description: 'اسم الأيقونة المستخدمة في بطاقة الخدمة.'}),
    imageField('image', 'الصورة الرئيسية المرفوعة', 'تظهر في بطاقة الخدمة وصفحة الخدمات.', 'media'),
    galleryField('gallery', 'معرض صور الخدمة', 'صور إضافية للخدمة تظهر في صفحة الخدمات.', 'media'),
    defineField({name: 'imageUrl', title: 'رابط الصورة القديم', type: 'string', group: 'media', hidden: true, readOnly: true, components: {input: LegacyUrlPreviewInput}, description: 'حقل توافق قديم مخفي؛ استخدم الصورة الرئيسية المرفوعة.'}),
    defineField({name: 'galleryUrls', title: 'روابط المعرض القديمة', type: 'array', group: 'media', hidden: true, readOnly: true, components: {input: LegacyUrlArrayPreviewInput}, of: [{type: 'string'}]}),
    defineField({name: 'upworkUrl', title: 'رابط الخدمة على Upwork', type: 'url', group: 'offers'}),
    defineField({name: 'startingPrice', title: 'السعر الابتدائي', type: 'string', group: 'offers'}),
    defineField({name: 'currency', title: 'العملة', type: 'string', group: 'offers'}),
    defineField({
      name: 'packages',
      title: 'الباقات',
      type: 'array',
      group: 'offers',
      of: [{type: 'object', fields: [
        defineField({name: 'nameEn', title: 'اسم الباقة بالإنجليزية', type: 'string'}),
        defineField({name: 'nameAr', title: 'اسم الباقة بالعربية', type: 'string'}),
        defineField({name: 'price', title: 'السعر', type: 'string'}),
        defineField({name: 'currency', title: 'العملة', type: 'string'}),
        defineField({name: 'descriptionEn', title: 'الوصف بالإنجليزية', type: 'text'}),
        defineField({name: 'descriptionAr', title: 'الوصف بالعربية', type: 'text'}),
        defineField({name: 'deliveryTime', title: 'مدة التسليم', type: 'string'}),
        defineField({name: 'features', title: 'المزايا', type: 'array', of: [{type: 'string'}]}),
      ], preview: {select: {title: 'nameEn', subtitle: 'price'}}}],
    }),
    defineField({name: 'visible', title: 'إظهار الخدمة للعامة', type: 'boolean', group: 'publishing', initialValue: true}),
    defineField({name: 'order', title: 'ترتيب العرض', type: 'number', group: 'publishing'}),
  ],
  preview: {select: {title: 'titleEn', subtitle: 'titleAr', media: 'image'}},
});
