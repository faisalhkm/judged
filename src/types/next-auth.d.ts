/**
 * src/types/next-auth.d.ts
 * ────────────────────────
 * Augment NextAuth types biar TypeScript tau
 * ada field `accessToken` dan `error` di Session.
 */

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
