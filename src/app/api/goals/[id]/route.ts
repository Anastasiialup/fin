import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { goals } from '../../../../../database/schema';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const goal = await db.select().from(goals).where(eq(goals.id, Number(id)));

    if (!goal.length) {
      return new Response('Goal not found', { status: 404 });
    }

    return Response.json(goal[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();

    if (!id) return new Response('Missing goal ID', { status: 400 });

    const updated = await db.update(goals)
      .set(data)
      .where(eq(goals.id, id))
      .returning();

    if (!updated.length) {
      return new Response('Goal not found', { status: 404 });
    }

    return Response.json(updated[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = await db.delete(goals)
      .where(eq(goals.id, Number(id)))
      .returning();

    if (!deleted.length) {
      return new Response('Goal not found', { status: 404 });
    }

    return Response.json(deleted[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
