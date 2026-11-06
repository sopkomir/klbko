import { NextResponse } from 'next/server';
import { AiError, geminiModels } from '@/lib/ai';
import { hasStore } from '@/lib/store';
export const dynamic = 'force-dynamic';
export async function GET() {
  const out: Record<string, unknown> = { uloziste: hasStore() };
  if (process.env.GEMINI_API_KEY) {
    try { out.gemini = { kluc: true, modely: (await geminiModels()).slice(0, 3) }; }
    catch (e) { out.gemini = { kluc: true, chyba: e instanceof AiError ? e.code : 'down' }; }
  } else out.gemini = { kluc: false };
  out.grok = { kluc: !!process.env.XAI_API_KEY, model: process.env.GROK_MODEL || 'grok-4.7' };
  return NextResponse.json(out);
}
