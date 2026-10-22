import {defineField, defineType} from 'sanity';

const localizedPair = (en: string, ar: string, enTitle: string, arTitle: string) => [
  defineField({name: en, title: enTitle, type: 'string'}),
  defineField({name: ar, title: arTitle, type: 'string'}),
];

export const profileContent = defineType({
  name: 'profileContent',
  title: 'الملف المهني والسيرة',
  type: 'document',
  groups: [
    {name: 'skills', title: 'المهارات والبرامج'},
    {name: 'education', title: 'التعليم'},
    {name: 'experience', title: 'الخبرات'},
    {name: 'languages', title: 'اللغات'},
  ],
  fields: [
    defineField({name: 'personalSkills', title: 'المهارات الشخصية', type: 'array', group: 'skills', of: [{type: 'object', fields: [
      defineField({name: 'en', title: 'بالإنجليزية', type: 'string'}),
      defineField({name: 'ar', title: 'بالعربية', type: 'string'}),
    ]}]}),
    defineField({name: 'software', title: 'البرامج', type: 'array', group: 'skills', of: [{type: 'object', fields: [
      defineField({name: 'en', title: 'بالإنجليزية', type: 'string'}),
      defineField({name: 'ar', title: 'بالعربية', type: 'string'}),
    ]}]}),
    defineField({name: 'education', title: 'التعليم', type: 'array', group: 'education', of: [{type: 'object', fields: [
      ...localizedPair('degreeEn', 'degreeAr', 'الدرجة بالإنجليزية', 'الدرجة بالعربية'),
      ...localizedPair('institutionEn', 'institutionAr', 'المؤسسة بالإنجليزية', 'المؤسسة بالعربية'),
      ...localizedPair('periodEn', 'periodAr', 'الفترة بالإنجليزية', 'الفترة بالعربية'),
    ]}]}),
    defineField({name: 'experience', title: 'الخبرات', type: 'array', group: 'experience', of: [{type: 'object', fields: [
      ...localizedPair('roleEn', 'roleAr', 'الدور بالإنجليزية', 'الدور بالعربية'),
      ...localizedPair('companyEn', 'companyAr', 'الشركة بالإنجليزية', 'الشركة بالعربية'),
      ...localizedPair('locationEn', 'locationAr', 'الموقع بالإنجليزية', 'الموقع بالعربية'),
      ...localizedPair('periodEn', 'periodAr', 'الفترة بالإنجليزية', 'الفترة بالعربية'),
      defineField({name: 'descriptionEn', title: 'الوصف بالإنجليزية', type: 'text'}),
      defineField({name: 'descriptionAr', title: 'الوصف بالعربية', type: 'text'}),
    ]}]}),
    defineField({name: 'languages', title: 'اللغات', type: 'array', group: 'languages', of: [{type: 'object', fields: [
      ...localizedPair('nameEn', 'nameAr', 'اللغة بالإنجليزية', 'اللغة بالعربية'),
      ...localizedPair('levelEn', 'levelAr', 'المستوى بالإنجليزية', 'المستوى بالعربية'),
    ]}]}),
  ],
  preview: {prepare: () => ({title: 'الملف المهني والسيرة الذاتية'})},
});
