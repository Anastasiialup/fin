// app/api/profile/route.ts
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '../../../../database/drizzle';
import { users } from '../../../../database/schema';

type NewUser = InferInsertModel<typeof users>;

export async function PUT(req: Request) {
  const data = await req.json();

  const updates: Partial<NewUser> = {
    username: data.username,
    profileImage: data.profileImage,
  };

  if (data.password && data.password.length > 0) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updates.password = hashedPassword;
  }

  await db.update(users).set(updates).where(eq(users.id, data.id));

  return NextResponse.json({ success: true });
}
