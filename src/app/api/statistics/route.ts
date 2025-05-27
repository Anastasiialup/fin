// app/api/statistics/route.ts
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '../../../../database/drizzle';
import { financialRecords } from '../../../../database/schema';

export async function POST(req: Request) {
  const { userId, year } = await req.json();

  const records = await db
    .select()
    .from(financialRecords)
    .where(and(eq(financialRecords.userId, userId), eq(financialRecords.year, year)));

  const months = [
    'січень', 'лютий', 'березень', 'квітень', 'травень', 'червень',
    'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень',
  ];

  const data = months.map((month) => {
    const monthRecords = records.filter((r) => r.month === month);
    const income = monthRecords
      .filter((r) => r.type === 'income')
      .reduce((sum, r) => sum + parseFloat(r.amount), 0);
    const expense = monthRecords
      .filter((r) => r.type === 'expense')
      .reduce((sum, r) => sum + parseFloat(r.amount), 0);
    return { month, income, expense };
  });

  return NextResponse.json(data);
}
