/**
 * src/app/api/roast/route.ts
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { buildRoastPayload, SpotifyAPIError, type TimeRange } from "@/lib/spotify";
import { roastMusicTaste, GroqValidationError } from "@/lib/groq";
import { checkRateLimit, refundRateLimit, LIMITS } from "@/lib/rateLimit";

// Ambil Spotify user ID dari /me endpoint
async function getSpotifyUserId(accessToken: string): Promise<string> {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Gagal ambil Spotify user ID");
  const data = await res.json();
  return data.id as string;
}

export async function POST(req: Request) {
  // ── 1. Auth check ────────────────────────────────────────────────
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
        { error: "Unauthorized. Login dulu bro." },
        { status: 401 }
    );
  }

  if (session.error === "RefreshAccessTokenError") {
    return NextResponse.json(
        { error: "Session expired. Silakan login ulang." },
        { status: 401 }
    );
  }

  // ── 2. Rate limit check ───────────────────────────────────────────
  let spotifyUserId: string;
  try {
    spotifyUserId = await getSpotifyUserId(session.accessToken);
  } catch {
    spotifyUserId = session.user?.email ?? "unknown";
  }

  const rateLimit = checkRateLimit(spotifyUserId);

  if (!rateLimit.allowed) {
    const messages: Record<string, string> = {
      user: `Jatah roasting lo hari ini udah habis bro (${LIMITS.perUser}x/hari). Balik lagi dalam ${rateLimit.resetIn} ya. Kalau pengen limitnya naik buat semua orang, traktir developernya dulu biar bisa upgrade server. ☕`,
      global: `Server lagi kelelahan nge-roast semua orang hari ini. Balik lagi dalam ${rateLimit.resetIn} ya!`,
    };

    return NextResponse.json(
        {
          error: messages[rateLimit.reason!],
          rateLimited: true,
          reason: rateLimit.reason,
          resetIn: rateLimit.resetIn,
        },
        { status: 429 }
    );
  }

  // ── 3. Parse request body ─────────────────────────────────────────
  let timeRange: TimeRange = "medium_term";
  try {
    const body = await req.json().catch(() => ({}));
    if (["short_term", "medium_term", "long_term"].includes(body.timeRange)) {
      timeRange = body.timeRange as TimeRange;
    }
  } catch {
    // pakai default
  }

  // ── 4. Fetch Spotify data ─────────────────────────────────────────
  let payload;
  try {
    payload = await buildRoastPayload(session.accessToken, timeRange);
  } catch (err) {
    if (err instanceof SpotifyAPIError) {
      if (err.statusCode === 401) {
        return NextResponse.json(
            { error: "Spotify token expired. Coba login ulang." },
            { status: 401 }
        );
      }
      return NextResponse.json(
          { error: `Gagal fetch data Spotify: ${err.message}` },
          { status: 502 }
      );
    }
    throw err;
  }

  if (payload.topTracks.length === 0) {
    return NextResponse.json(
        { error: "Data musik lo masih kosong. Dengerin lagu dulu yang banyak baru balik." },
        { status: 422 }
    );
  }

  // ── 5. Roast via Groq ─────────────────────────────────────────────
  try {
    const roastResult = await roastMusicTaste(payload);

    return NextResponse.json({
      success: true,
      data: roastResult,
      remainingRoasts: rateLimit.remainingUser,
      meta: {
        timeRange,
        trackCount: payload.topTracks.length,
        dominantGenres: payload.dominantGenres,
      },
    });
  } catch (err) {
    // Kalau Groq return output invalid → refund counter, bukan salah user
    if (err instanceof GroqValidationError) {
      refundRateLimit(spotifyUserId);
      console.error("[/api/roast] Groq validation error (refunded):", err.message);
      return NextResponse.json(
          { error: "Groq ngaco outputnya. Udah gue kembaliin jatah lo, coba lagi." },
          { status: 503 }
      );
    }

    console.error("[/api/roast] Groq error:", err);
    return NextResponse.json(
        { error: "Groq lagi error. Coba lagi bentar." },
        { status: 503 }
    );
  }
}