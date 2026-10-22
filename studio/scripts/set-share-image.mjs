import fs from 'node:fs';
import path from 'node:path';
import {getCliClient} from 'sanity/cli';

const client = getCliClient({apiVersion: '2026-10-22', projectId: '0nta1uyv', dataset: 'production'});
const imagePath = path.resolve(new URL('../../public/images/hero.webp', import.meta.url).pathname);
if (!fs.existsSync(imagePath)) throw new Error(`Missing image: ${imagePath}`);
const settingsId = await client.fetch('*[_type == "siteSettings"][0]._id');
if (!settingsId) throw new Error('siteSettings document not found');
const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
  filename: 'portfolio-social-image.webp',
  contentType: 'image/webp',
});
await client.patch(settingsId).set({
  shareImage: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
}).commit();
console.log(JSON.stringify({settingsId, assetId: asset._id, source: imagePath}, null, 2));
