import {defineField, defineType} from 'sanity';

export const siteCopy = defineType({
  name: 'siteCopy',
  title: 'نصوص الموقع حسب الصفحة',
  type: 'document',
  groups: [
    {name: 'overview', title: 'ملخص الملف'},
    {name: 'content', title: 'النصوص القابلة للتعديل'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'اسم مجموعة النصوص',
      type: 'string',
      group: 'overview',
      description: 'اسم واضح لمجموعة النصوص، مثل نصوص الصفحة الرئيسية أو نصوص التواصل.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entries',
      title: 'النصوص داخل هذه المجموعة',
      type: 'array',
      group: 'content',
      description: 'كل عنصر يمثل نصاً مستقلاً مع مكان ظهوره ومحتواه بالعربية والإنجليزية.',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'key',
            title: 'مفتاح النص',
            type: 'string',
            description: 'المفتاح البرمجي؛ لا تغيّره إلا إذا كنت تعرف أثره على الموقع.',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'label',
            title: 'اسم مختصر للعنصر',
            type: 'string',
            description: 'اسم سهل التعرف عليه داخل القائمة.',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'page',
            title: 'الصفحة / المكان',
            type: 'string',
            description: 'مثل hero أو projects أو servicesPage أو footer.',
            options: {
              layout: 'dropdown',
              list: [
                {title: 'الرئيسية - Hero', value: 'hero'},
                {title: 'الرئيسية - الأعمال', value: 'works'},
                {title: 'الرئيسية - عن المهندس', value: 'about'},
                {title: 'الرئيسية - الخدمات', value: 'services'},
                {title: 'المشاريع', value: 'projects'},
                {title: 'الخدمات', value: 'servicesPage'},
                {title: 'عن المهندس', value: 'aboutPage'},
                {title: 'السيرة الذاتية', value: 'cv'},
                {title: 'التواصل', value: 'contactPage'},
                {title: 'التواصل - القسم العام', value: 'contact'},
                {title: 'التنقل', value: 'nav'},
                {title: 'التذييل', value: 'footer'},
                {title: 'اللغة', value: 'lang'},
                {title: 'زر WhatsApp', value: 'whatsapp'},
                {title: 'المهارات', value: 'skills'},
                {title: 'الخدمات الفردية', value: 'service'},
                {title: 'صفحة غير موجودة 404', value: 'notFound'},
                {title: 'أخرى', value: 'other'},
              ],
            },
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'english',
            title: 'النص بالإنجليزية',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'arabic',
            title: 'النص بالعربية',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
          }),
        ],
        preview: {
          select: {title: 'label', key: 'key', page: 'page', english: 'english'},
          prepare(selection) {
            const {title, key, page, english} = selection;
            return {
              title: title || key || 'نص بدون اسم',
              subtitle: `${page || 'بدون صفحة'} · ${english || 'لا يوجد نص إنجليزي'}`,
            };
          },
        },
      }],
    }),
  ],
  preview: {
    select: {title: 'title', entries: 'entries'},
    prepare(selection) {
      const {title, entries} = selection;
      return {
        title: title || 'مجموعة نصوص',
        subtitle: `${Array.isArray(entries) ? entries.length : 0} نصاً قابلاً للتعديل`,
      };
    },
  },
});
