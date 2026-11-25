import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { get, put } from '@vercel/blob';
import { hasStore } from '@/lib/store';

// Slovenský hlas pre materskú školu. Text sa raz pošle externej službe na prevod na reč,
// nahrávka sa uloží do úložiska (hlas/<hash>.mp3) a ďalej sa už len prehráva.
// Služba sa vyberá podľa kľúča vo Verceli:
//   AZURE_SPEECH_KEY + AZURE_SPEECH_REGION  (Microsoft Azure AI Speech, hlas sk-SK-ViktoriaNeural)
//   GOOGLE_TTS_KEY                           (Google Cloud Text-to-Speech, hlas sk-SK-Wavenet-A)
// Iný hlas: KLBKO_TTS_VOICE. Bez kľúča vráti 501 a aplikácia použije hlas prehliadača.
export const runtime = 'nodejs';
const MAX = 200;
const esc = (s: string) => s.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));

function provider() {
  if (process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION) return { id: 'azure', voice: process.env.KLBKO_TTS_VOICE || 'sk-SK-ViktoriaNeural' };
  if (process.env.GOOGLE_TTS_KEY) return { id: 'google', voice: process.env.KLBKO_TTS_VOICE || 'sk-SK-Wavenet-A' };
  return null;
}

async function synth(p: { id: string; voice: string }, text: string): Promise<Uint8Array> {
  if (p.id === 'azure') {
    const r = await fetch(`https://${process.env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY!, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3', 'User-Agent': 'klbko' },
      body: `<speak version="1.0" xml:lang="sk-SK"><voice name="${esc(p.voice)}"><prosody rate="-10%">${esc(text)}</prosody></voice></speak>`,
    });
    if (!r.ok) throw new Error(`azure ${r.status}`);
    return new Uint8Array(await r.arrayBuffer());
  }
  const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(process.env.GOOGLE_TTS_KEY!)}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ input: { text }, voice: { languageCode: 'sk-SK', name: p.voice }, audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9 } }),
  });
  if (!r.ok) throw new Error(`google ${r.status}`);
  const j = await r.json() as { audioContent?: string };
  if (!j.audioContent) throw new Error('google: prázdna odpoveď');
  return new Uint8Array(Buffer.from(j.audioContent, 'base64'));
}

const audio = (body: BodyInit, cache = true) => new Response(body, { headers: { 'content-type': 'audio/mpeg', 'cache-control': cache ? 'public, max-age=31536000, immutable' : 'no-store' } });

export async function GET(req: NextRequest) {
  const text = (req.nextUrl.searchParams.get('t') || '').replace(/\s+/g, ' ').trim();
  if (!text || text.length > MAX) return NextResponse.json({ error: 'Text chýba alebo je príliš dlhý.' }, { status: 400 });
  const p = provider();
  if (!p) return NextResponse.json({ error: 'Externý hlas nie je nastavený.' }, { status: 501 });
  const path = `hlas/${createHash('sha256').update(`${p.id}|${p.voice}|${text}`).digest('hex').slice(0, 32)}.mp3`;
  if (hasStore()) {
    for (const access of ['public', 'private'] as const) {
      try { const r = await get(path, { access }); if (r?.stream) return audio(r.stream); } catch { /* ešte nie je uložené */ }
    }
  }
  let mp3: Uint8Array;
  try { mp3 = await synth(p, text); } catch (e) { console.error(e); return NextResponse.json({ error: 'Hlas sa nepodarilo vytvoriť.' }, { status: 502 }); }
  if (hasStore()) {
    const o = { addRandomSuffix: false, allowOverwrite: true, contentType: 'audio/mpeg' };
    try { await put(path, Buffer.from(mp3), { ...o, access: 'public' }); } catch { try { await put(path, Buffer.from(mp3), { ...o, access: 'private' }); } catch (e) { console.error(e); } }
  }
  return audio(Buffer.from(mp3));
}
