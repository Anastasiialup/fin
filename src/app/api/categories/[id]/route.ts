import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { categories } from '../../../../../database/schema';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return new Response('Invalid ID', { status: 400 });
    }

    const data = await req.json();

    const updated = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();

    if (!updated.length) {
      return new Response('Category not found', { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return new Response('Invalid ID', { status: 400 });
    }

    const deleted = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    if (!deleted.length) {
      return new Response('Category not found', { status: 404 });
    }

    return NextResponse.json(deleted[0]);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
