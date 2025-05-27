import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { categories, financialRecords } from '../../../../../database/schema';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  // Витягуємо всі записи користувача
  const records = await db
    .select()
    .from(financialRecords)
    .leftJoin(categories, eq(financialRecords.categoryId, categories.id))
    .where(eq(financialRecords.userId, userId));

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
