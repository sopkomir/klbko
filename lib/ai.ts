export type Code = 'nokey' | 'key' | 'limit' | 'credit' | 'model' | 'down' | 'timeout' | 'invalid';
export class AiError extends Error {
  constructor(public code: Code, message: string) { super(message); }
}
const BUDGET = 52000, STEP = 24000;
type Attempt = { name: string; run: (prompt: string, ms: number) => Promise<string> };

const list = (s: string | undefined) => (s ?? '').split(',').map(x => x.trim()).filter(Boolean);
const classify = (who: string, status: number, body: string): AiError => {
  const b = body.toLowerCase();
  if (status === 402 || /credit|spending limit|billing|prepayment/.test(b)) return new AiError('credit', `${who}: chýba kredit (${status})`);
  if (status === 429) return new AiError('limit', `${who}: limit (${status})`);
  if (status === 401 || status === 403 || /api key|api_key/.test(b)) return new AiError('key', `${who}: neplatný kľúč (${status})`);
  if (status === 400 || status === 404) return new AiError('model', `${who}: model alebo požiadavka (${status}) ${body.slice(0, 160)}`);
  return new AiError('down', `${who}: HTTP ${status}`);
};
async function post(who: string, url: string, headers: Record<string, string>, body: unknown, ms: number) {
  let r: Response;
  try {
    r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body), signal: AbortSignal.timeout(ms) });
  } catch (e) {
    throw new AiError((e as Error).name === 'TimeoutError' ? 'timeout' : 'down', `${who}: ${(e as Error).message}`);
  }
  if (!r.ok) throw classify(who, r.status, await r.text().catch(() => ''));
  return r.json();
}

const GEMINI = () => process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com';
let found: { at: number; names: string[] } | null = null;
const rank = (n: string) => {
  const v = parseFloat(/gemini-(\d+(?:\.\d+)?)/.exec(n)?.[1] ?? '0');
  return (n.includes('flash-lite') ? 100 : 0) + v - (/preview|exp/.test(n) ? 50 : 0);
};
export async function geminiModels(): Promise<string[]> {
  const own = list(process.env.GEMINI_MODELS);
  if (own.length) return own;
  if (found && Date.now() - found.at < 3600e3) return found.names;
  const r = await fetch(`${GEMINI()}/v1beta/models?pageSize=200`, { headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY! }, signal: AbortSignal.timeout(6000) });
  if (!r.ok) throw classify('Gemini', r.status, await r.text().catch(() => ''));
  const j = await r.json();
  const names = (j.models ?? [])
    .filter((m: { name: string; supportedGenerationMethods?: string[] }) => m.supportedGenerationMethods?.includes('generateContent'))
    .map((m: { name: string }) => m.name.replace('models/', ''))
    .filter((n: string) => /^gemini-.*flash/.test(n) && !/image|tts|live|audio|thinking|computer/.test(n))
    .sort((a: string, b: string) => rank(b) - rank(a));
  found = { at: Date.now(), names };
  return names;
}
const gemini = (model: string): Attempt => ({
  name: 'gemini:' + model,
  run: async (prompt, ms) => {
    const j = await post('Gemini ' + model, `${GEMINI()}/v1beta/models/${model}:generateContent`, { 'x-goog-api-key': process.env.GEMINI_API_KEY! },
      { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.4 } }, ms);
    const t = j.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('');
    if (!t) throw new AiError('invalid', `Gemini ${model}: prázdna odpoveď`);
    return t;
  },
});
const grok: Attempt = {
  name: 'grok',
  run: async (prompt, ms) => {
    const j = await post('Grok', `${process.env.XAI_BASE_URL || 'https://api.x.ai'}/v1/chat/completions`, { authorization: `Bearer ${process.env.XAI_API_KEY}` },
      { model: process.env.GROK_MODEL || 'grok-4.7', messages: [{ role: 'user', content: prompt }], temperature: 0.4, response_format: { type: 'json_object' } }, ms);
    const t = j.choices?.[0]?.message?.content;
    if (!t) throw new AiError('invalid', 'Grok: prázdna odpoveď');
    return t;
  },
};
const claude: Attempt = {
  name: 'claude',
  run: async (prompt, ms) => {
    const j = await post('Claude', `${process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com'}/v1/messages`, { 'x-api-key': process.env.ANTHROPIC_API_KEY!, 'anthropic-version': '2023-06-01' },
      { model: process.env.CLAUDE_MODEL || 'claude-haiku-5-5', max_tokens: 4096, messages: [{ role: 'user', content: prompt + '\nOdpovedz iba platným JSON bez ďalšieho textu.' }] }, ms);
    const t = j.content?.filter((c: { type: string }) => c.type === 'text').map((c: { text: string }) => c.text).join('');
    if (!t) throw new AiError('invalid', 'Claude: prázdna odpoveď');
    return t;
  },
};
const parse = (t: string) => {
  const s = t.trim().replace(/^```(?:json)?\s*|\s*```$/g, '');
  try { return JSON.parse(s); } catch { return JSON.parse(s.slice(s.search(/[{[]/), Math.max(s.lastIndexOf('}'), s.lastIndexOf(']')) + 1)); }
};
const ORDER: Code[] = ['limit', 'timeout', 'credit', 'key', 'model', 'invalid', 'down'];
export async function askJson(prompt: string, valid: (v: any) => boolean): Promise<{ value: any; provider: string }> {
  const errs: AiError[] = [];
  const chain: Attempt[] = [];
  if (process.env.ANTHROPIC_API_KEY) chain.push(claude);
  if (process.env.GEMINI_API_KEY) {
    try {
      chain.push(...(await geminiModels()).slice(0, 3).map(gemini));
    } catch (e) {
      errs.push(e instanceof AiError ? e : new AiError('down', String(e)));
    }
  }
  if (process.env.XAI_API_KEY) chain.push(grok);
  if (!chain.length && !errs.length) throw new AiError('nokey', 'Nie je nastavený žiadny kľúč');
  const end = Date.now() + BUDGET;
  for (const a of chain) {
    const left = end - Date.now();
    if (left < 4000) break;
    try {
      const value = parse(await a.run(prompt, Math.min(STEP, left)));
      if (valid(value)) return { value, provider: a.name };
      errs.push(new AiError('invalid', a.name + ': neplatný tvar'));
    } catch (e) {
      errs.push(e instanceof AiError ? e : new AiError('invalid', `${a.name}: ${(e as Error).message}`));
      if (e instanceof AiError && e.code === 'key' && a.name.startsWith('gemini')) {
        const i = chain.findIndex(x => x.name.startsWith('gemini') && x !== a);
        if (i >= 0) chain.splice(i, chain.filter(x => x.name.startsWith('gemini') && x !== a).length);
      }
    }
  }
  const best = ORDER.map(c => errs.find(e => e.code === c)).find(Boolean) ?? new AiError('timeout', 'Čas vypršal');
  console.error('AI zlyhalo:', errs.map(e => e.message).join(' | '));
  throw new AiError(best.code, errs.map(e => e.message).join(' | '));
}
