import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { goals } from '../../../../database/schema';

export async function GET() {
  try {
    const allGoals = await db.select().from(goals);
    return Response.json(allGoals);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = ['name', 'price', 'currency', 'status', 'userId'];
    const missing = requiredFields.filter((key) => body[key] === undefined);

    if (missing.length) {
      return new Response(`Missing fields: ${missing.join(', ')}`, { status: 400 });
    }

    const newGoal = await db.insert(goals).values({
      name: body.name,
      price: body.price,
      currency: body.currency,
      status: body.status,
      userId: body.userId,
      description: body.description ?? null,
      photo: body.photo ?? null,
    }).returning();

    return Response.json(newGoal[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
