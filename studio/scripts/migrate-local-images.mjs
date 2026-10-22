import fs from 'node:fs';
import path from 'node:path';
import {getCliClient} from 'sanity/cli';

const root = path.resolve(new URL('../..', import.meta.url).pathname);
const apply = process.env.MIGRATE_APPLY === '1';
const client = getCliClient({apiVersion: '2026-10-22', projectId: '0nta1uyv', dataset: 'production'});
const assetCache = new Map();

function localFile(url) {
  if (typeof url !== 'string' || !url.startsWith('/')) return null;
  const filePath = path.join(root, 'public', url.replace(/^\//, '').split('?')[0]);
  return fs.existsSync(filePath) ? filePath : null;
}

async function uploadImage(url) {
  if (assetCache.has(url)) return assetCache.get(url);
  const filePath = localFile(url);
  if (!filePath) throw new Error(`Local image not found for ${url}`);
  if (!apply) return {dryRun: true, url};
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
    contentType: 'image/webp',
  });
  const image = {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
  };
  assetCache.set(url, image);
  return image;
}

const documents = await client.fetch(`*[_type in ["project", "service"]]{_id, _type, titleEn, coverImage, coverImageUrl, image, imageUrl, gallery, galleryUrls}`);
let planned = 0;
let changed = 0;

for (const document of documents) {
  const patch = {};
  const title = document.titleEn || document._id;

  if (document._type === 'project') {
    if (!document.coverImage?.asset && document.coverImageUrl) {
      patch.coverImage = await uploadImage(document.coverImageUrl);
      planned += 1;
    }
    if ((!Array.isArray(document.gallery) || document.gallery.length === 0) && Array.isArray(document.galleryUrls) && document.galleryUrls.length > 0) {
      patch.gallery = [];
      for (const url of document.galleryUrls) patch.gallery.push(await uploadImage(url));
      planned += patch.gallery.length;
    }
  }

  if (document._type === 'service') {
    if (!document.image?.asset && document.imageUrl) {
      patch.image = await uploadImage(document.imageUrl);
      planned += 1;
    }
    if ((!Array.isArray(document.gallery) || document.gallery.length === 0) && Array.isArray(document.galleryUrls) && document.galleryUrls.length > 0) {
      patch.gallery = [];
      for (const url of document.galleryUrls) patch.gallery.push(await uploadImage(url));
      planned += patch.gallery.length;
    }
  }

  if (Object.keys(patch).length === 0) continue;
  console.log(`${apply ? 'Migrate' : 'Plan'} ${document._type}/${document._id}: ${title} (${Object.keys(patch).join(', ')})`);
  if (apply) {
    await client.patch(document._id).set(patch).commit();
    changed += 1;
  }
}

console.log(JSON.stringify({apply, documents: documents.length, plannedImages: planned, changedDocuments: changed, uploadedAssets: assetCache.size}, null, 2));
