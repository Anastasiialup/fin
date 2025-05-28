import { eq } from 'drizzle-orm';

import { NextResponse } from 'next/server';
import { db } from '../../../../../database/drizzle';
import { users } from '../../../../../database/schema';

export async function GET(
  _: Request,
  context: { params: { id: string } },
) {
  const params = await context.params; // await тут обов’язковий

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(params.id)))
    .then((res) => res[0]);

  if (!user) return NextResponse.json({ error: 'Не знайдено' }, { status: 404 });

  return NextResponse.json(user);
}
