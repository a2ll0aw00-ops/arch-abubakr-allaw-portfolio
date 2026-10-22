import {defineField} from 'sanity';

export const imageField = (name: string, title: string, description: string, group: string) =>
  defineField({
    name,
    title,
    type: 'image',
    group,
    options: {hotspot: true},
    description,
    fields: [
      defineField({
        name: 'altAr',
        title: 'النص البديل بالعربية',
        type: 'string',
        description: 'وصف قصير للصورة لتحسين الوصول ومحركات البحث.',
      }),
      defineField({
        name: 'altEn',
        title: 'النص البديل بالإنجليزية',
        type: 'string',
        description: 'Short accessible description of the image.',
      }),
    ],
  });

export const galleryField = (name: string, title: string, description: string, group: string) =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    description,
    of: [{type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'altAr', title: 'النص البديل بالعربية', type: 'string'}),
      defineField({name: 'altEn', title: 'النص البديل بالإنجليزية', type: 'string'}),
    ]}],
  });
