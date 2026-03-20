/**
 * src/app/api/auth/[...nextauth]/route.ts
 * ────────────────────────────────────────
 * NextAuth handler untuk App Router (Next.js 14).
 * File ini WAJIB ada di path ini persis.
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
