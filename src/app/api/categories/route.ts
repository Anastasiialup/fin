import { NextRequest } from 'next/server';
import { db } from '../../../../database/drizzle';
import { categories } from '../../../../database/schema';

export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    return Response.json(allCategories);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = ['name', 'type', 'color', 'userId'];
    const missing = requiredFields.filter((key) => body[key] === undefined);

    if (missing.length) {
      return new Response(`Missing fields: ${missing.join(', ')}`, { status: 400 });
    }

    const newCategory = await db.insert(categories).values({
      name: body.name,
      type: body.type,
      color: body.color,
      userId: body.userId,
    }).returning();

    return Response.json(newCategory[0]);
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
