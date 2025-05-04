import { userConfirmOTP } from '@/entities/user/api/user-confirm-otp';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        code: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { email, code } = credentials as { email: string; code: string };

        try {
          const res = await userConfirmOTP({
            code,
            email,
          });

          return {
            jwt: res.jwt,
            ...res.user,
          };
        } catch (e) {
          console.error(e);
          throw new Error('Invalid credentials.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error странное поведение ts
        token.id = user.id;
        token.email = user.email;
        token.jwt = user.jwt;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.name = token.name;
      // @ts-expect-error странное поведение ts
      session.user.id = token.id;
      session.user.jwt = token.jwt;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
});
