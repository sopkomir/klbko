import { NextRequest } from 'next/server';
import QRCode from 'qrcode';
export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get('u') ?? '';
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  let ok = false;
  try { ok = new URL(u).host === host; } catch { /* neplatný odkaz */ }
  if (!ok) return new Response('Neplatný odkaz', { status: 400 });
  return new Response(await QRCode.toString(u, { type: 'svg', margin: 1 }), { headers: { 'content-type': 'image/svg+xml' } });
}
