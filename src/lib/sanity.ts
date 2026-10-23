const SANITY_PROJECT_ID = '0nta1uyv';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2026-10-22';

const requestCache = new Map<string, Promise<unknown>>();

export async function sanityQuery<T>(query: string, options: {cache?: RequestCache} = {}): Promise<T> {
  const cacheMode = options.cache || 'default';
  const cached = cacheMode === 'no-store' ? undefined : requestCache.get(query);
  if (cached) return cached as Promise<T>;

  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`,
  );
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', 'published');

  const request = fetch(url, {
    headers: { Accept: 'application/json' },
    cache: cacheMode,
  }).then(async (response) => {
    if (!response.ok) throw new Error(`CMS request failed (${response.status})`);
    const payload = (await response.json()) as { result: T };
    return payload.result;
  });

  if (cacheMode !== 'no-store') requestCache.set(query, request);
  try {
    return await request as T;
  } catch (error) {
    if (cacheMode !== 'no-store') requestCache.delete(query);
    throw error;
  }
}

export function urlFor(source: unknown) {
  const value = source as { url?: string; asset?: { url?: string } } | null;
  const resolved = typeof source === 'string' ? source : value?.url || value?.asset?.url || '';
  const builder = {
    width: (_width: number) => builder,
    height: (_height: number) => builder,
    fit: (_fit: string) => builder,
    url: () => resolved,
  };
  return builder;
}

export function optimizeImageUrl(source: string, options: { width?: number; height?: number; quality?: number; fit?: 'crop' | 'clip' | 'max'; focusX?: number; focusY?: number } = {}) {
  if (!source || !source.includes('cdn.sanity.io/images/')) return source;
  try {
    const url = new URL(source);
    if (options.width) url.searchParams.set('w', String(options.width));
    if (options.height) url.searchParams.set('h', String(options.height));
    if (options.fit) url.searchParams.set('fit', options.fit);
    if (typeof options.focusX === 'number') url.searchParams.set('fp-x', String(options.focusX));
    if (typeof options.focusY === 'number') url.searchParams.set('fp-y', String(options.focusY));
    url.searchParams.set('auto', 'format');
    url.searchParams.set('q', String(options.quality || 82));
    return url.toString();
  } catch {
    return source;
  }
}
