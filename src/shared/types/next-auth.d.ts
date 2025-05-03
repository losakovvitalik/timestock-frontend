// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      jwt: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    jwt: string;
  }
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string;
    email: string;
    name?: string;
    jwt: string;
  }
}
