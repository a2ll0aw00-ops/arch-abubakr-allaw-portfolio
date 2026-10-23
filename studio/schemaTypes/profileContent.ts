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
    {name: 'cvIdentity', title: 'رأس السيرة الذاتية'},
    {name: 'summary', title: 'الملخص المهني'},
    {name: 'skills', title: 'المهارات والبرامج'},
    {name: 'education', title: 'التعليم'},
    {name: 'experience', title: 'الخبرات'},
    {name: 'training', title: 'الدورات والشهادات'},
    {name: 'projects', title: 'نماذج الأعمال'},
    {name: 'professionalSkills', title: 'المهارات المهنية'},
    {name: 'languages', title: 'اللغات'},
  ],
  fields: [
    defineField({name: 'cvNameEn', title: 'الاسم بالإنجليزية', type: 'string', group: 'cvIdentity'}),
    defineField({name: 'cvNameAr', title: 'الاسم بالعربية', type: 'string', group: 'cvIdentity'}),
    defineField({name: 'cvRoleEn', title: 'المسمى بالإنجليزية', type: 'string', group: 'cvIdentity'}),
    defineField({name: 'cvRoleAr', title: 'المسمى بالعربية', type: 'string', group: 'cvIdentity'}),
    defineField({name: 'cvDescriptorEn', title: 'التخصص المختصر بالإنجليزية', type: 'string', group: 'cvIdentity'}),
    defineField({name: 'cvDescriptorAr', title: 'التخصص المختصر بالعربية', type: 'string', group: 'cvIdentity'}),
    defineField({name: 'linkedinUrl', title: 'رابط LinkedIn في السيرة', type: 'url', group: 'cvIdentity'}),
    defineField({name: 'summaryAr', title: 'الملخص المهني بالعربية', type: 'text', rows: 8, group: 'summary'}),
    defineField({name: 'summaryEn', title: 'الملخص المهني بالإنجليزية', type: 'text', rows: 8, group: 'summary'}),
    defineField({name: 'personalSkills', title: 'المهارات الشخصية القديمة — للتوافق', type: 'array', group: 'skills', hidden: true, readOnly: true, of: [{type: 'object', fields: [
      defineField({name: 'en', title: 'بالإنجليزية', type: 'string'}),
      defineField({name: 'ar', title: 'بالعربية', type: 'string'}),
    ]}]}),
    defineField({name: 'software', title: 'البرامج القديمة — للتوافق', type: 'array', group: 'skills', hidden: true, readOnly: true, of: [{type: 'object', fields: [
      defineField({name: 'en', title: 'بالإنجليزية', type: 'string'}),
      defineField({name: 'ar', title: 'بالعربية', type: 'string'}),
    ]}]}),
    defineField({name: 'education', title: 'التعليم', type: 'array', group: 'education', of: [{type: 'object', fields: [
      ...localizedPair('degreeEn', 'degreeAr', 'الدرجة بالإنجليزية', 'الدرجة بالعربية'),
      ...localizedPair('institutionEn', 'institutionAr', 'المؤسسة بالإنجليزية', 'المؤسسة بالعربية'),
      ...localizedPair('periodEn', 'periodAr', 'الفترة بالإنجليزية', 'الفترة بالعربية'),
      ...localizedPair('departmentEn', 'departmentAr', 'القسم بالإنجليزية', 'القسم بالعربية'),
      ...localizedPair('gradeEn', 'gradeAr', 'التقدير بالإنجليزية', 'التقدير بالعربية'),
      ...localizedPair('detailsEn', 'detailsAr', 'تفاصيل إضافية بالإنجليزية', 'تفاصيل إضافية بالعربية'),
    ]}]}),
    defineField({name: 'experience', title: 'الخبرات', type: 'array', group: 'experience', of: [{type: 'object', fields: [
      ...localizedPair('roleEn', 'roleAr', 'الدور بالإنجليزية', 'الدور بالعربية'),
      ...localizedPair('companyEn', 'companyAr', 'الشركة بالإنجليزية', 'الشركة بالعربية'),
      ...localizedPair('locationEn', 'locationAr', 'الموقع بالإنجليزية', 'الموقع بالعربية'),
      ...localizedPair('periodEn', 'periodAr', 'الفترة بالإنجليزية', 'الفترة بالعربية'),
      defineField({name: 'descriptionEn', title: 'الوصف بالإنجليزية', type: 'text'}),
      defineField({name: 'descriptionAr', title: 'الوصف بالعربية', type: 'text'}),
      defineField({name: 'responsibilitiesEn', title: 'المسؤوليات بالإنجليزية', type: 'array', of: [{type: 'text'}]}),
      defineField({name: 'responsibilitiesAr', title: 'المسؤوليات بالعربية', type: 'array', of: [{type: 'text'}]}),
    ]}]}),
    defineField({name: 'technicalSkillGroups', title: 'مجموعات المهارات التقنية', type: 'array', group: 'skills', of: [{type: 'object', fields: [
      ...localizedPair('titleEn', 'titleAr', 'اسم المجموعة بالإنجليزية', 'اسم المجموعة بالعربية'),
      defineField({name: 'skills', title: 'المهارات', type: 'array', of: [{type: 'object', fields: [
        ...localizedPair('nameEn', 'nameAr', 'اسم المهارة بالإنجليزية', 'اسم المهارة بالعربية'),
        ...localizedPair('levelEn', 'levelAr', 'المستوى بالإنجليزية', 'المستوى بالعربية'),
        defineField({name: 'descriptionEn', title: 'التفصيل بالإنجليزية', type: 'text'}),
        defineField({name: 'descriptionAr', title: 'التفصيل بالعربية', type: 'text'}),
      ]}] }),
    ]}]}),
    defineField({name: 'training', title: 'الدورات والشهادات', type: 'array', group: 'training', of: [{type: 'object', fields: [
      ...localizedPair('titleEn', 'titleAr', 'اسم الدورة بالإنجليزية', 'اسم الدورة بالعربية'),
      ...localizedPair('organizationEn', 'organizationAr', 'الجهة بالإنجليزية', 'الجهة بالعربية'),
      ...localizedPair('detailsEn', 'detailsAr', 'التفاصيل بالإنجليزية', 'التفاصيل بالعربية'),
    ]}]}),
    defineField({name: 'selectedProjects', title: 'المشاريع المختارة في السيرة', type: 'array', group: 'projects', of: [{type: 'object', fields: [
      ...localizedPair('titleEn', 'titleAr', 'اسم المشروع بالإنجليزية', 'اسم المشروع بالعربية'),
      ...localizedPair('metaEn', 'metaAr', 'الموقع والفترة بالإنجليزية', 'الموقع والفترة بالعربية'),
      defineField({name: 'descriptionEn', title: 'وصف المشروع بالإنجليزية', type: 'text'}),
      defineField({name: 'descriptionAr', title: 'وصف المشروع بالعربية', type: 'text'}),
    ]}]}),
    defineField({name: 'professionalSkills', title: 'المهارات المهنية', type: 'array', group: 'professionalSkills', of: [{type: 'object', fields: [
      defineField({name: 'en', title: 'بالإنجليزية', type: 'string'}),
      defineField({name: 'ar', title: 'بالعربية', type: 'string'}),
    ]}]}),
    defineField({name: 'languages', title: 'اللغات', type: 'array', group: 'languages', of: [{type: 'object', fields: [
      ...localizedPair('nameEn', 'nameAr', 'اللغة بالإنجليزية', 'اللغة بالعربية'),
      ...localizedPair('levelEn', 'levelAr', 'المستوى بالإنجليزية', 'المستوى بالعربية'),
    ]}]}),
  ],
  preview: {prepare: () => ({title: 'الملف المهني والسيرة الذاتية'})},
});
