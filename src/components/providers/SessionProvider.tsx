"use client";

/**
 * src/components/providers/SessionProvider.tsx
 * ─────────────────────────────────────────────
 * Wrapper buat NextAuth SessionProvider.
 * Harus "use client" karena pakai React Context di bawahnya.
 * Import ini di root layout (src/app/layout.tsx).
 */

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
