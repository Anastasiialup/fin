import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { categories } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = await db.select().from(categories).where(eq(categories.id, Number(params.id)));

    if (!category.length) {
      return new Response('Category not found', { status: 404 });
    }

    return Response.json(category[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();

    if (!id) return new Response('Missing category ID', { status: 400 });

    const updated = await db.update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();

    if (!updated.length) {
      return new Response('Category not found', { status: 404 });
    }

    return Response.json(updated[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await db.delete(categories)
      .where(eq(categories.id, Number(params.id)))
      .returning();

    if (!deleted.length) {
      return new Response('Category not found', { status: 404 });
    }

    return Response.json(deleted[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
