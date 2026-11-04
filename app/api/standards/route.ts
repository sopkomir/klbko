import { NextRequest, NextResponse } from 'next/server';
import { find, type Program } from '@/lib/svp';
export function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams, program = (p.get('program') === '2015' ? '2015' : '2023') as Program;
  return NextResponse.json(find({ title: p.get('title') ?? '', subject: p.get('subject') ?? '', grade: Number(p.get('grade')) || 5, program }, 6));
}
