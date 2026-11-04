export class NoProvider extends Error {}
const T = 45000;
const list = (s: string | undefined, d: string) => (s || d).split(',').map(x => x.trim()).filter(Boolean);

async function gemini(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY!;
  const base = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com';
  let last = '';
  for (const model of list(process.env.GEMINI_MODELS, 'gemini-3.5-flash-lite,gemini-3.1-flash-lite,gemini-3.8-flash')) {
    const r = await fetch(`${base}/v1beta/models/${model}:generateContent`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, signal: AbortSignal.timeout(T),
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.4 } }),
    });
    if (r.ok) {
      const j = await r.json();
      const t = j.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('');
      if (t) return t;
      last = 'prázdna odpoveď';
    } else last = `${model}: HTTP ${r.status}`;
  }
  throw new Error('Gemini: ' + last);
}
async function grok(prompt: string): Promise<string> {
  const base = process.env.XAI_BASE_URL || 'https://api.x.ai';
  const r = await fetch(`${base}/v1/chat/completions`, {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.XAI_API_KEY}` }, signal: AbortSignal.timeout(T),
    body: JSON.stringify({ model: process.env.GROK_MODEL || 'grok-4.7', messages: [{ role: 'user', content: prompt }], temperature: 0.4, response_format: { type: 'json_object' } }),
  });
  if (!r.ok) throw new Error(`Grok: HTTP ${r.status}`);
  const t = (await r.json()).choices?.[0]?.message?.content;
  if (!t) throw new Error('Grok: prázdna odpoveď');
  return t;
}
const parse = (t: string) => {
  const s = t.trim().replace(/^```(?:json)?\s*|\s*```$/g, '');
  try { return JSON.parse(s); } catch { return JSON.parse(s.slice(s.search(/[{[]/), Math.max(s.lastIndexOf('}'), s.lastIndexOf(']')) + 1)); }
};
export async function askJson(prompt: string, valid: (v: any) => boolean): Promise<{ value: any; provider: string }> {
  const chain: [string, (p: string) => Promise<string>][] = [];
  if (process.env.GEMINI_API_KEY) chain.push(['gemini', gemini]);
  if (process.env.XAI_API_KEY) chain.push(['grok', grok]);
  if (!chain.length) throw new NoProvider();
  const errs: string[] = [];
  for (const [name, fn] of chain) {
    try {
      const value = parse(await fn(prompt));
      if (valid(value)) return { value, provider: name };
      errs.push(name + ': neplatný tvar');
    } catch (e) { errs.push(String((e as Error).message)); }
  }
  throw new Error(errs.join(' | '));
}
