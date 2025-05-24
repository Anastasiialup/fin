import { eq } from 'drizzle-orm';
import { db } from '../../../../database/drizzle';
import { financialRecords, categories } from '../../../../database/schema';

export async function GET() {
  try {
    const records = await db
      .select({
        id: financialRecords.id,
        amount: financialRecords.amount,
        currency: financialRecords.currency,
        description: financialRecords.description,
        type: financialRecords.type,
        categoryId: financialRecords.categoryId,
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
