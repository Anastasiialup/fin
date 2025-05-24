import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { financialRecords } from '../../../../../database/schema';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updated = await db
      .update(financialRecords)
      .set(data)
      .where(eq(financialRecords.id, Number(params.id)))
      .returning();

    if (!updated.length) {
      return new Response('Record not found', { status: 404 });
    }

    return Response.json(updated[0]);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await db
      .delete(financialRecords)
      .where(eq(financialRecords.id, Number(params.id)))
      .returning();

    if (!deleted.length) {
      return new Response('Record not found', { status: 404 });
    }

    return Response.json(deleted[0]);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
