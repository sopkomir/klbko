import { get, put } from '@vercel/blob';
export const hasStore = () => !!(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
export async function save(path: string, text: string): Promise<void> {
  const o = { addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' };
  try { await put(path, text, { ...o, access: 'public' }); } catch { await put(path, text, { ...o, access: 'private' }); }
}
export async function load(path: string): Promise<unknown | null> {
  if (!hasStore()) return null;
  for (const access of ['public', 'private'] as const) {
    try {
      const r = await get(path, { access });
      if (r?.stream) return await new Response(r.stream).json();
    } catch { /* druhý typ úložiska */ }
  }
  return null;
}
