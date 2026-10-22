import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {presentationTool} from 'sanity/presentation';
import {structure} from './structure';
import {schemaTypes} from './schemaTypes';

const previewOrigin =
  typeof window === 'undefined'
    ? (process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000')
    : window.location.origin;

export default defineConfig({
  name: 'default',
  title: 'إدارة موقع أبوبكر علاو',
  projectId: '0nta1uyv',
  dataset: 'production',
  basePath: '/',
  plugins: [
    structureTool({structure}),
    presentationTool({
      title: 'معاينة الموقع',
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/api/preview/enable',
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
