"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { getTheme } from "@/lib/themesConfig";
import type { RoastResult } from "@/lib/groq";

const CARD_WIDTH = 420;

interface RoastCardProps {
  result: RoastResult;
  username?: string;
}

export default function RoastCard({ result, username }: RoastCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = getTheme(result.tema_visual);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `roast-${result.tema_visual}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export PNG gagal:", err);
    }
  };

  const happiness = Math.min(Math.max(result.skor_kebahagiaan, 1), 10);
  const happinessEmoji = happiness <= 3 ? "💀" : happiness <= 6 ? "😐" : "🤩";

  return (
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="w-full flex justify-center">
          <div
              ref={cardRef}
              className={`
            relative rounded-3xl p-7 flex flex-col w-full
            ${theme.cardBg} ${theme.effect}
            border ${theme.accent}
            overflow-hidden
          `}
              style={{ maxWidth: `${CARD_WIDTH}px` }}
          >
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="flex items-start justify-between mb-5 relative z-10">
              <div className="flex flex-col">
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 whitespace-nowrap ${theme.textSecondary}`}>
                  🎵 Judged
                </p>
                {username && (
                    <p className={`text-xs ${theme.textSecondary} opacity-70`}>
                      @{username}
                    </p>
                )}
              </div>
              <span className="text-3xl">{theme.emoji}</span>
            </div>

            <div className="relative z-10 mb-5">
              <h2 className={`text-3xl font-black leading-tight ${theme.textPrimary}`}>
                {result.julukan}
              </h2>
              <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold ${theme.badge}`}>
                {theme.label}
              </span>
            </div>

            <div className="relative z-10 mb-5">
              <p className={`text-sm leading-relaxed ${theme.textPrimary} opacity-90`}>
                {result.analisis_karakter}
              </p>
            </div>

            <div className={`border-t ${theme.accent} mb-5`} />

            <div className="relative z-10 grid grid-cols-2 gap-4 mb-5">
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>
                  Pasangan Cocok
                </p>
                <p className={`text-sm ${theme.textPrimary}`}>{result.pasangan_cocok}</p>
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>
                  Kendaraan Cocok
                </p>
                <p className={`text-sm ${theme.textPrimary}`}>{result.kendaraan_cocok}</p>
              </div>
            </div>

            <div className="relative z-10 mb-5">
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${theme.textSecondary}`}>
                Style Kit
              </p>
              <div className="flex flex-wrap gap-2">
                {result.style_kit.map((item, i) => (
                    <span key={i} className={`text-xs px-3 py-1 rounded-full font-medium ${theme.badge}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-bold uppercase tracking-wider ${theme.textSecondary}`}>
                  Skor Kebahagiaan
                </p>
                <span className={`text-lg font-bold uppercase tracking-wider whitespace-nowrap ${theme.textSecondary}`}>{happinessEmoji} {happiness}/10</span>
              </div>
              <div className="h-2 rounded-full w-full bg-black/20">
                <div
                    className={`h-2 rounded-full ${theme.scoreBar}`}
                    style={{ width: `${happiness * 10}%` }}
                />
              </div>
            </div>

            <p className={`relative z-10 text-center text-xs mt-5 ${theme.textSecondary} opacity-40`}>
              judged.vercel.app
            </p>
          </div>
        </div>

        <button
            onClick={handleDownload}
            className="
          flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm
          bg-white text-black hover:bg-gray-100
          active:scale-95 transition-all duration-150
          shadow-lg
        "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PNG
        </button>
      </div>
  );
}