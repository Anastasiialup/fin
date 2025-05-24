import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { categories, financialRecords } from '../../../../database/schema';

export async function GET() {
  try {
    // Отримуємо фінансові записи разом з категоріями (назва, колір)
    const records = await db
      .select({
        id: financialRecords.id,
        userId: financialRecords.userId,
        amount: financialRecords.amount,
        currency: financialRecords.currency,
        description: financialRecords.description,
        type: financialRecords.type,
        categoryId: financialRecords.categoryId,
        attachment: financialRecords.attachment,
        month: financialRecords.month,
        year: financialRecords.year,
        categoryName: categories.name,
        categoryColor: categories.color,
      })
      .from(financialRecords)
      .leftJoin(categories, eq(financialRecords.categoryId, categories.id));

    return Response.json(records);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = ['userId', 'amount', 'currency', 'type', 'month', 'year'];
    const missing = requiredFields.filter((key) => body[key] === undefined);

    if (missing.length) {
      return new Response(`Missing fields: ${missing.join(', ')}`, { status: 400 });
    }

    const newRecord = await db.insert(financialRecords).values({
      userId: body.userId,
      amount: body.amount,
      currency: body.currency,
      description: body.description ?? null,
      type: body.type,
      categoryId: body.categoryId ?? null,
      attachment: body.attachment ?? null,
      month: body.month,
      year: body.year,
    }).returning();

    return Response.json(newRecord[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
