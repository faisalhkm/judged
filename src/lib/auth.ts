import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

/**
 * Spotify scopes yang dibutuhkan:
 * - user-top-read: Buat fetch Top Tracks & Top Artists
 */
const SPOTIFY_SCOPES = [
  "user-top-read",
  "user-read-email",
  "user-read-private",
].join(" ");

export const SPOTIFY_AUTH_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({ scope: SPOTIFY_SCOPES });

// ─── Token Refresh Helper ─────────────────────────────────────────────────────
async function refreshAccessToken(token: any) {
  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const refreshed = await response.json();

    if (!response.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      // Spotify kadang nggak kasih refresh_token baru, fallback ke yang lama
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      error: undefined,
    };
  } catch (error) {
    console.error("[NextAuth] Refresh token error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

// ─── NextAuth Options ─────────────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: SPOTIFY_AUTH_URL,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Initial sign-in: simpan token dari Spotify ke JWT
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000,
        };
      }

      // Token masih valid
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Token expired → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      // Expose accessToken ke client session
      session.accessToken = token.accessToken as string;
      session.error = token.error as string | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/", // Redirect ke home kalau belum login
    error: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
