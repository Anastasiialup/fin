import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../database/drizzle';
import { categories } from '../../../../database/schema';

// GET — отримати всі категорії
export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    return NextResponse.json(allCategories);
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

// POST — створити нову категорію
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Валідація базова (за потребою розширити)
    if (!data.name || !data.type || !data.color || !data.userId) {
      return new Response('Missing fields', { status: 400 });
    }

    const inserted = await db
      .insert(categories)
      .values({
        name: data.name,
        type: data.type,
        color: data.color,
        userId: Number(data.userId),
      })
      .returning();

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
