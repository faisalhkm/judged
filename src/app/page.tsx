"use client";

import { useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import RoastCard from "@/components/RoastCard";
import RoastingLoader, { MIN_LOADING_MS } from "@/components/RoastingLoader";
import type { RoastResult } from "@/lib/groq";

type TimeRange = "short_term" | "medium_term" | "long_term";

const SAWERIA_URL = "https://saweria.co/YOUR_USERNAME";

const TIME_RANGE_OPTIONS: { value: TimeRange; label: string; sub: string }[] = [
  { value: "short_term", label: "4 Minggu", sub: "Obsesi terbaru" },
  { value: "medium_term", label: "6 Bulan", sub: "Fase hidup lo skrg" },
  { value: "long_term", label: "All Time", sub: "Jati diri asli lo" },
];

interface RateLimitState {
  message: string;
  reason: "user" | "global";
  resetIn: string;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const [timeRange, setTimeRange] = useState<TimeRange>("medium_term");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [remainingRoasts, setRemainingRoasts] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState<RateLimitState | null>(null);
  const loadingStartRef = useRef<number>(0);

  const handleRoast = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setRateLimited(null);
    loadingStartRef.current = Date.now();

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeRange }),
      });

      const json = await res.json();

      // Minimum display time — biar animasi loading selalu keliatan full
      const elapsed = Date.now() - loadingStartRef.current;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));

      if (res.status === 429) {
        setRateLimited({
          message: json.error,
          reason: json.reason,
          resetIn: json.resetIn,
        });
        return;
      }

      if (!res.ok) {
        setError(json.error ?? "Ada yang salah. Coba lagi.");
        return;
      }

      setResult(json.data);
      setRemainingRoasts(json.remainingRoasts ?? null);
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
        <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </main>
    );
  }

  if (!session) {
    return (
        <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-sm w-full">
            <div className="text-6xl mb-6">🎵</div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
              Roast My Taste
            </h1>
            <p className="text-zinc-400 text-sm mb-10 leading-relaxed">
              Kasih tau Spotify lo, kita roasting selera musik lo
              habis-habisan. Gratis. Tanpa ampun.
            </p>

            <button
                onClick={() => signIn("spotify")}
                className="
              w-full flex items-center justify-center gap-3
              bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold
              px-6 py-4 rounded-2xl text-sm
              transition-all duration-150 active:scale-95
              shadow-[0_0_30px_rgba(29,185,84,0.4)]
            "
            >
              <SpotifyIcon />
              Login dengan Spotify
            </button>

            <p className="text-zinc-600 text-xs mt-6">
              Hanya baca data top tracks/artists.
              <br />
              Nggak nulis apapun ke akun lo.
            </p>
          </div>
        </main>
    );
  }

  return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-md mx-auto">
          {/* Header — selalu tampil */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                🎵 Roast My Taste
              </h1>
              <p className="text-zinc-500 text-xs mt-0.5">
                Halo,{" "}
                <span className="text-zinc-300">
                {session.user?.name?.split(" ")[0]}
              </span>
              </p>
            </div>
            <button
                onClick={() => signOut()}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Loading state */}
          {loading && <RoastingLoader />}

          {/* Main content — sembunyiin saat loading */}
          {!loading && (
              <>
                {/* Time Range Selector */}
                {!result && (
                    <div className="mb-8">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-3">
                        Roast berdasarkan periode
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_RANGE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setTimeRange(opt.value)}
                                className={`
                  flex flex-col items-center py-3 px-2 rounded-2xl text-center
                  transition-all duration-150 border
                  ${
                                    timeRange === opt.value
                                        ? "bg-white text-black border-white"
                                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600"
                                }
                `}
                            >
                              <span className="text-xs font-black">{opt.label}</span>
                              <span className="text-[10px] mt-0.5 text-zinc-600">
                  {opt.sub}
                </span>
                            </button>
                        ))}
                      </div>
                    </div>
                )}

                {/* Roast Button */}
                {!result && (
                    <button
                        onClick={handleRoast}
                        disabled={loading}
                        className="
            w-full py-4 rounded-2xl font-black text-sm tracking-wide
            bg-white text-black
            hover:bg-zinc-100 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150
            shadow-[0_0_30px_rgba(255,255,255,0.1)]
            mb-8
          "
                    >
                      {loading ? (
                          <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              Lagi nge-roast lo...
            </span>
                      ) : (
                          "🔥 Roast Selera Gue"
                      )}
                    </button>
                )}

                {/* Remaining roasts indicator */}
                {remainingRoasts !== null && remainingRoasts <= 1 && !rateLimited && (
                    <div className="bg-amber-950/40 border border-amber-800/40 rounded-2xl p-3 mb-4 text-center">
                      <p className="text-amber-400 text-xs">
                        {remainingRoasts === 0
                            ? "Ini roasting terakhir lo hari ini 👀"
                            : `Sisa ${remainingRoasts}x roasting hari ini`}
                      </p>
                    </div>
                )}

                {/* Rate Limited */}
                {rateLimited && (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 mb-6 text-center animate-fadeIn">
                      <div className="text-4xl mb-4">😵‍💫</div>
                      <p className="text-white text-sm leading-relaxed mb-2">
                        {rateLimited.message}
                      </p>
                      <p className="text-zinc-500 text-xs mb-6">
                        Reset dalam: <span className="text-zinc-300">{rateLimited.resetIn}</span>
                      </p>
                      <div className="flex flex-col gap-2">
                        {rateLimited.reason === "user" && (
                            <>
                              <p className="text-zinc-500 text-xs mb-1">
                                Donasi = developer bisa upgrade server = limit naik buat semua orang 🙏
                              </p>
                              <a
                                  href={SAWERIA_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="
                      w-full py-3 rounded-2xl font-bold text-sm
                      bg-amber-400 text-black
                      hover:bg-amber-300 active:scale-95
                      transition-all duration-150 block
                    "
                              >
                                ☕ Traktir Developer
                              </a>
                            </>
                        )}
                        <button
                            onClick={() => setRateLimited(null)}
                            className="w-full py-3 rounded-2xl font-bold text-sm bg-zinc-800 text-zinc-400 hover:bg-zinc-700 transition-all duration-150"
                        >
                          Oke besok deh 😔
                        </button>
                      </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-950/50 border border-red-800/50 rounded-2xl p-4 mb-6">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Result */}
                {result && (
                    <div className="animate-fadeIn">
                      <RoastCard
                          result={result}
                          username={session.user?.name ?? undefined}
                      />
                      <button
                          onClick={() => setResult(null)}
                          className="
                w-full mt-4 py-3 rounded-2xl font-bold text-sm
                bg-zinc-900 text-zinc-400 border border-zinc-800
                hover:border-zinc-600 hover:text-zinc-300
                transition-all duration-150
              "
                      >
                        🔄 Roast Lagi
                      </button>
                    </div>
                )}
              </>
          )}
        </div>
      </main>
  );
}

function SpotifyIcon() {
  return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
  );
}