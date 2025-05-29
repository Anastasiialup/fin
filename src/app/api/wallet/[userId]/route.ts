import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { categories, financialRecords } from '../../../../../database/schema';

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const id = Number(userId);

  if (!id) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  const records = await db
    .select()
    .from(financialRecords)
    .leftJoin(categories, eq(financialRecords.categoryId, categories.id))
    .where(eq(financialRecords.userId, id));

  let totalIncome = 0;
  let totalExpense = 0;
  let totalSavings = 0;

  records.forEach((record) => {
    const amount = Number(record.FinancialRecord.amount);

    if (record.FinancialRecord.type === 'income') {
      totalIncome += amount;
    } else if (record.FinancialRecord.type === 'expense') {
      totalExpense += amount;
    }

    if (record.Category?.name?.toLowerCase() === 'заощадження') {
      totalSavings += amount;
    }
  });

  const totalAmount = totalIncome - totalExpense;

  return NextResponse.json({
    totalAmount,
    totalIncome,
    totalExpense,
    totalSavings,
  });
}
