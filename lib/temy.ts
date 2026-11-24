import db from '@/data/temy.json';
import { byIds } from './svp';

/** Knižnica vopred pripravených tém. Otvárajú sa bez AI, AI ich len upraví podľa poznámok učiteľa. */
type Topic = { id: string; title: string; subject: string; grade: number; kind: string; rec: string; why: string; alts: [string, string][]; std: string[]; method: unknown; guide: unknown; forms: Record<string, unknown>; aka?: string[] };
const topics = (db as unknown as { topics: Topic[] }).topics;
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

export const libIndex = () => topics.map(t => ({ id: t.id, title: t.title, subject: t.subject, grade: t.grade, img: !!t.forms.scene, aka: t.aka ?? [] }));

/** Nájde tému podľa názvu (aj podľa iných pomenovaní), predmetu a ročníka. Ročník môže byť o jeden vedľa. */
export function libFind(title: string, subject: string, grade: number): Topic | undefined {
  const n = norm(title);
  const same = (t: Topic) => [t.title, ...(t.aka ?? [])].some(x => norm(x) === n) && t.subject === subject;
  return topics.find(t => same(t) && t.grade === grade) ?? topics.find(t => same(t) && Math.abs(t.grade - grade) <= 1);
}

export function libFull(t: Topic) {
  const { std, rec, why, ...rest } = t;
  return { ...rest, lib: true, rec, why: { [rec]: why }, picked: byIds(std) };
}
export const libById = (id: string) => topics.find(t => t.id === id);
