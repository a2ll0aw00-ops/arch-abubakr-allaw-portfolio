import type {StructureBuilder} from 'sanity/structure';

const pageTextList = (S: StructureBuilder, title: string, pages: string[]) =>
  S.listItem()
    .title(title)
    .child(
      S.documentTypeList('siteCopy')
        .title(title)
        .filter('_type == "siteCopy" && count(entries[page in $pages]) > 0')
        .params({pages})
        .defaultOrdering([{field: 'order', direction: 'asc'}]),
    );

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('محتوى موقع أبوبكر علاو')
    .items([
      S.listItem()
        .title('إعدادات الموقع والهوية')
        .child(S.documentTypeList('siteSettings').title('إعدادات الموقع')),
      S.divider(),
      S.listItem()
        .title('النصوص حسب الصفحة')
        .child(
          S.list()
            .title('النصوص حسب الصفحة')
            .items([
              pageTextList(S, 'الرئيسية', ['hero', 'works', 'about', 'services']),
              pageTextList(S, 'المشاريع', ['projects']),
              pageTextList(S, 'الخدمات', ['services', 'servicesPage', 'service']),
              pageTextList(S, 'من أنا', ['about', 'aboutPage']),
              pageTextList(S, 'السيرة الذاتية', ['cv']),
              pageTextList(S, 'التواصل', ['contact', 'contactPage']),
              pageTextList(S, 'التذييل والتنقل', ['nav', 'footer', 'lang', 'whatsapp']),
              S.divider(),
              S.documentTypeListItem('siteCopy').title('كل النصوص'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('المشاريع والمعارض')
        .child(S.documentTypeList('project').title('المشاريع').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.listItem()
        .title('الخدمات والباقات')
        .child(S.documentTypeList('service').title('الخدمات').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.listItem()
        .title('الملف المهني والسيرة')
        .child(S.documentTypeList('profileContent').title('الملف المهني')),
      S.listItem()
        .title('مكتبة الوسائط')
        .child(
          S.list()
            .title('مكتبة الوسائط')
            .items([
              S.documentTypeListItem('project').title('صور المشاريع'),
              S.documentTypeListItem('service').title('صور الخدمات'),
              S.documentTypeListItem('siteSettings').title('الشعار وصورة المشاركة'),
            ]),
        ),
    ]);
