/* eslint-disable no-param-reassign */
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '../../database/drizzle';
import { users } from '../../database/schema';

type UserType = {
  id: string;
  email: string;
  username: string;
  isGoogle?: boolean;
};

declare module 'next-auth' {
  /* eslint-disable-next-line */
  interface Session extends UserType {}
  /* eslint-disable-next-line */
  interface User extends UserType {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) return null;

        const isPasswordValid = await compare(credentials.password.toString(), user[0].password!);
        if (!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          email: user[0].email.toString(),
          username: user[0].username.toString(),
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { email } = user;

        if (!email) return false;

        const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existing.length === 0) {
          await db.insert(users).values({
            username: user.name ?? '',
            email,
            password: '',
            profileImage: user.image,
          });
        }

        user.id = existing[0].id.toString();
        user.username = existing[0].username;
        user.email = existing[0].email;
        user.isGoogle = true;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.isGoogle = user.isGoogle;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.username = token.username as string;
      session.user.isGoogle = token.isGoogle as boolean;

      return session;
    },
  },
});
