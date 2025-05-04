// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name?: string;
      jwt: string;
    };
  }

  interface User {
    id: number;
    email: string;
    name?: string;
    jwt: string;
  }
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    email: string;
    name?: string;
    jwt: string;
  }
}
