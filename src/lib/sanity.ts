const SANITY_PROJECT_ID = '0nta1uyv';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2026-10-22';

const requestCache = new Map<string, Promise<unknown>>();

export async function sanityQuery<T>(query: string): Promise<T> {
  const cached = requestCache.get(query);
  if (cached) return cached as Promise<T>;

  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`,
  );
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', 'published');

  const request = fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  }).then(async (response) => {
    if (!response.ok) throw new Error(`CMS request failed (${response.status})`);
    const payload = (await response.json()) as { result: T };
    return payload.result;
  });

  requestCache.set(query, request);
  try {
    return await request as T;
  } catch (error) {
    requestCache.delete(query);
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
