import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

import { db } from '../../../../../database/drizzle';
import { financialRecords } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const record = await db.select().from(financialRecords).where(eq(financialRecords.id, Number(id)));

    if (!record.length) {
      return new Response('Financial record not found', { status: 404 });
    }

    return Response.json(record[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();

    if (!id) return new Response('Missing record ID', { status: 400 });

    const updated = await db.update(financialRecords)
      .set(data)
      .where(eq(financialRecords.id, id))
      .returning();

    if (!updated.length) {
      return new Response('Financial record not found', { status: 404 });
    }

    return Response.json(updated[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = await db.delete(financialRecords)
      .where(eq(financialRecords.id, Number(id)))
      .returning();

    if (!deleted.length) {
      return new Response('Financial record not found', { status: 404 });
    }

    return Response.json(deleted[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
