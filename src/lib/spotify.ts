/**
 * src/lib/spotify.ts
 * ──────────────────
 * Service layer buat semua interaksi sama Spotify Web API.
 * Semua fungsi nerima accessToken dari session NextAuth.
 */

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimeRange = "short_term" | "medium_term" | "long_term";
// short_term  = ~4 minggu terakhir
// medium_term = ~6 bulan terakhir
// long_term   = semua waktu (all time)

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtistSimple {
  id: string;
  name: string;
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtistSimple[];
  album: SpotifyAlbum;
  duration_ms: number;
  popularity: number;
  preview_url: string | null;
  external_urls: { spotify: string };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
  followers: { total: number };
  external_urls: { spotify: string };
}

export interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Data yang dikirim ke Groq buat di-roast.
 * Sudah di-compress supaya nggak buang token.
 */
export interface RoastPayload {
  topTracks: string[];
  topArtists: string[];
  dominantGenres: string[];
  timeRange: TimeRange;
}

// ─── Fetcher Helper ───────────────────────────────────────────────────────────

async function spotifyFetch<T>(
    endpoint: string,
    accessToken: string
): Promise<T> {
  const res = await fetch(`${SPOTIFY_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    // Disable Next.js cache biar data selalu fresh
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new SpotifyAPIError(
        `Spotify API error ${res.status}: ${errorBody?.error?.message ?? res.statusText}`,
        res.status
    );
  }

  return res.json() as Promise<T>;
}

export class SpotifyAPIError extends Error {
  constructor(
      message: string,
      public statusCode: number
  ) {
    super(message);
    this.name = "SpotifyAPIError";
  }
}

// ─── Public Service Functions ─────────────────────────────────────────────────

/**
 * Fetch top tracks user dari Spotify.
 *
 * @param accessToken - Token dari session NextAuth
 * @param timeRange   - Periode waktu (default: medium_term)
 * @param limit       - Jumlah track (max 50, default 20)
 */
export async function getTopTracks(
    accessToken: string,
    timeRange: TimeRange = "medium_term",
    limit: number = 20
): Promise<SpotifyTopTracksResponse> {
  const params = new URLSearchParams({
    time_range: timeRange,
    limit: Math.min(limit, 50).toString(),
    offset: "0",
  });

  return spotifyFetch<SpotifyTopTracksResponse>(
      `/me/top/tracks?${params}`,
      accessToken
  );
}

/**
 * Fetch top artists user dari Spotify.
 *
 * @param accessToken - Token dari session NextAuth
 * @param timeRange   - Periode waktu (default: medium_term)
 * @param limit       - Jumlah artist (max 50, default 10)
 */
export async function getTopArtists(
    accessToken: string,
    timeRange: TimeRange = "medium_term",
    limit: number = 10
): Promise<SpotifyTopArtistsResponse> {
  const params = new URLSearchParams({
    time_range: timeRange,
    limit: Math.min(limit, 50).toString(),
    offset: "0",
  });

  return spotifyFetch<SpotifyTopArtistsResponse>(
      `/me/top/artists?${params}`,
      accessToken
  );
}

/**
 * Gabungin top tracks + top artists jadi satu payload
 * yang siap dikirim ke Groq. Data di-compress & di-extract
 * supaya hemat token tapi tetap informatif buat roasting.
 */
export async function buildRoastPayload(
    accessToken: string,
    timeRange: TimeRange = "medium_term"
): Promise<RoastPayload> {
  const [tracksData, artistsData] = await Promise.all([
    getTopTracks(accessToken, timeRange, 7),
    getTopArtists(accessToken, timeRange, 5),
  ]);

  const topTracks = tracksData.items.map(
      (track) => `${track.name} - ${track.artists.map((a) => a.name).join(", ")}`
  );

  const topArtists = artistsData.items.map((artist) => artist.name);

  const genreCount: Record<string, number> = {};
  artistsData.items.forEach((artist) => {
    (artist.genres ?? []).forEach((genre) => {
      genreCount[genre] = (genreCount[genre] ?? 0) + 1;
    });
  });

  const dominantGenres = Object.entries(genreCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

  return {
    topTracks,
    topArtists,
    dominantGenres,
    timeRange,
  };
}

// ─── Utility ──────────────────────────────────────────────────────────────────

/** Format duration dari ms ke "3:45" */
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Ambil image terbesar dari array SpotifyImage */
export function getLargestImage(images: SpotifyImage[]): string | null {
  if (!images.length) return null;
  return images.sort(
      (a, b) => (b.width ?? 0) - (a.width ?? 0)
  )[0].url;
}