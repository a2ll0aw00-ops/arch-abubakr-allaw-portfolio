import {getCliClient} from 'sanity/cli';

const client = getCliClient({apiVersion: '2026-10-22', projectId: '0nta1uyv', dataset: 'production'});
const settings = await client.fetch('*[_type == "siteSettings"][0]._id');
if (!settings) throw new Error('siteSettings document not found');

await client.patch(settings).set({
  seoTitleAr: 'أبوبكر علاو | مهندس معماري',
  seoTitleEn: 'Abubakr Allaw | Architect · BIM · Design',
  seoDescriptionAr: 'التصميم المعماري، المخططات والواجهات، التصميم الداخلي، Revit وBIM، والإظهار المعماري.',
  seoDescriptionEn: 'Architectural design, plans and elevations, interior design, Revit and BIM, and architectural visualization.',
}).commit();

console.log(JSON.stringify({updated: settings}, null, 2));
