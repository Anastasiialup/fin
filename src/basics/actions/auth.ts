/* eslint-disable no-console */

'use server';

import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../../../database/drizzle';
import { users } from '../../../database/schema';
import { signIn } from 'lib/auth';

type AuthCredentials = {
  username: string;
  email: string;
  password: string;
  profileImage: string;
};

export const signInWithGoogle = async () => {
  try {
    const result = await signIn('google', { redirect: false });

    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { redirectLink: result, success: true };
  } catch (error) {
    console.log(error, 'SignIn error');
    return { success: false, error: 'SignIn error' };
  }
};

export const signInWithGitHub = async () => {
  try {
    const result = await signIn('github', { redirect: false });

    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { redirectLink: result.url, success: true };
  } catch (error) {
    console.log(error, 'SignIn error');
    return { success: false, error: 'SignIn error' };
  }
};

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
  const { email, password } = params;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, 'Signin error');
    return { success: false, error: 'Signin error' };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { username, password, email, profileImage } = params;
  console.log(params);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: 'User already exists' };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
      profileImage,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, 'Signup error');
    return { success: false, error: 'Signup error' };
  }
};
