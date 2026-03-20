/**
 * src/lib/themesConfig.ts
 * ────────────────────────
 * Mapping 20 tema visual dari Groq → styling Tailwind + metadata.
 */

export interface ThemeConfig {
  id: string;
  label: string;
  emoji: string;
  // Warna background card (gradient atau solid)
  cardBg: string;
  // Warna teks utama
  textPrimary: string;
  // Warna teks sekunder
  textSecondary: string;
  // Warna accent (border, highlight)
  accent: string;
  // Badge/tag styling
  badge: string;
  // Skor bar color
  scoreBar: string;
  // Font class (dari Google Fonts yang di-load di layout)
  fontClass: string;
  // Special effect class
  effect: string;
}

export const themesConfig: Record<string, ThemeConfig> = {
  pop_sugar: {
    id: "pop_sugar",
    label: "Pop Sugar",
    emoji: "🍭",
    cardBg: "bg-gradient-to-br from-pink-400 via-fuchsia-400 to-rose-300",
    textPrimary: "text-white",
    textSecondary: "text-pink-100",
    accent: "border-white/40",
    badge: "bg-white/20 text-white border border-white/30",
    scoreBar: "bg-white",
    fontClass: "font-pop",
    effect: "shadow-[0_0_40px_rgba(244,114,182,0.6)]",
  },
  kpop_fever: {
    id: "kpop_fever",
    label: "K-Pop Fever",
    emoji: "✨",
    cardBg: "bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500",
    textPrimary: "text-white",
    textSecondary: "text-purple-200",
    accent: "border-pink-300/50",
    badge: "bg-pink-400/30 text-pink-100 border border-pink-300/40",
    scoreBar: "bg-pink-300",
    fontClass: "font-kpop",
    effect: "shadow-[0_0_60px_rgba(168,85,247,0.7)]",
  },
  edm_rave: {
    id: "edm_rave",
    label: "EDM Rave",
    emoji: "⚡",
    cardBg: "bg-gradient-to-br from-black via-gray-900 to-black",
    textPrimary: "text-cyan-300",
    textSecondary: "text-cyan-500",
    accent: "border-cyan-400/60",
    badge: "bg-cyan-400/10 text-cyan-300 border border-cyan-400/50",
    scoreBar: "bg-cyan-400",
    fontClass: "font-edm",
    effect:
      "shadow-[0_0_80px_rgba(34,211,238,0.5)] ring-1 ring-cyan-400/30",
  },
  rnb_silk: {
    id: "rnb_silk",
    label: "R&B Silk",
    emoji: "🥂",
    cardBg: "bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-700",
    textPrimary: "text-amber-100",
    textSecondary: "text-amber-300",
    accent: "border-amber-400/50",
    badge: "bg-amber-400/20 text-amber-200 border border-amber-400/40",
    scoreBar: "bg-amber-400",
    fontClass: "font-rnb",
    effect: "shadow-[0_0_50px_rgba(217,119,6,0.5)]",
  },
  rock_classic: {
    id: "rock_classic",
    label: "Rock Classic",
    emoji: "🎸",
    cardBg: "bg-gradient-to-br from-stone-900 via-stone-800 to-zinc-900",
    textPrimary: "text-orange-400",
    textSecondary: "text-stone-400",
    accent: "border-orange-500/50",
    badge: "bg-orange-500/20 text-orange-300 border border-orange-500/40",
    scoreBar: "bg-orange-500",
    fontClass: "font-rock",
    effect: "shadow-[0_0_40px_rgba(249,115,22,0.4)]",
  },
  metal_void: {
    id: "metal_void",
    label: "Metal Void",
    emoji: "💀",
    cardBg: "bg-gradient-to-br from-black via-zinc-950 to-black",
    textPrimary: "text-red-500",
    textSecondary: "text-zinc-500",
    accent: "border-red-800/60",
    badge: "bg-red-900/30 text-red-400 border border-red-800/50",
    scoreBar: "bg-red-600",
    fontClass: "font-metal",
    effect: "shadow-[0_0_60px_rgba(185,28,28,0.6)] ring-1 ring-red-900/50",
  },
  punk_chaos: {
    id: "punk_chaos",
    label: "Punk Chaos",
    emoji: "🔩",
    cardBg: "bg-gradient-to-br from-yellow-400 via-yellow-300 to-lime-300",
    textPrimary: "text-black",
    textSecondary: "text-zinc-700",
    accent: "border-black/40",
    badge: "bg-black/10 text-black border border-black/30",
    scoreBar: "bg-black",
    fontClass: "font-punk",
    effect: "shadow-[4px_4px_0px_rgba(0,0,0,1)]",
  },
  grunge_dirt: {
    id: "grunge_dirt",
    label: "Grunge Dirt",
    emoji: "🩹",
    cardBg: "bg-gradient-to-br from-stone-700 via-neutral-700 to-stone-800",
    textPrimary: "text-stone-200",
    textSecondary: "text-stone-400",
    accent: "border-stone-500/50",
    badge: "bg-stone-500/20 text-stone-300 border border-stone-500/40",
    scoreBar: "bg-stone-400",
    fontClass: "font-grunge",
    effect: "shadow-[0_0_30px_rgba(120,113,108,0.4)]",
  },
  indie_folks: {
    id: "indie_folks",
    label: "Indie Folks",
    emoji: "🌿",
    cardBg: "bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900",
    textPrimary: "text-emerald-200",
    textSecondary: "text-emerald-400",
    accent: "border-emerald-500/40",
    badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    scoreBar: "bg-emerald-400",
    fontClass: "font-indie",
    effect: "shadow-[0_0_40px_rgba(52,211,153,0.3)]",
  },
  lofi_vibes: {
    id: "lofi_vibes",
    label: "Lo-Fi Vibes",
    emoji: "☕",
    cardBg: "bg-gradient-to-br from-slate-700 via-slate-600 to-blue-900",
    textPrimary: "text-blue-200",
    textSecondary: "text-slate-400",
    accent: "border-blue-400/30",
    badge: "bg-blue-400/10 text-blue-300 border border-blue-400/20",
    scoreBar: "bg-blue-400",
    fontClass: "font-lofi",
    effect: "shadow-[0_0_50px_rgba(96,165,250,0.2)]",
  },
  jazz_club: {
    id: "jazz_club",
    label: "Jazz Club",
    emoji: "🎷",
    cardBg: "bg-gradient-to-br from-zinc-900 via-amber-950 to-zinc-900",
    textPrimary: "text-amber-300",
    textSecondary: "text-amber-600",
    accent: "border-amber-600/40",
    badge: "bg-amber-600/20 text-amber-400 border border-amber-600/30",
    scoreBar: "bg-amber-500",
    fontClass: "font-jazz",
    effect: "shadow-[0_0_60px_rgba(180,83,9,0.4)]",
  },
  vibe_check: {
    id: "vibe_check",
    label: "Vibe Check",
    emoji: "🫠",
    cardBg: "bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400",
    textPrimary: "text-white",
    textSecondary: "text-blue-100",
    accent: "border-white/30",
    badge: "bg-white/20 text-white border border-white/30",
    scoreBar: "bg-white",
    fontClass: "font-vibe",
    effect: "shadow-[0_0_50px_rgba(99,102,241,0.6)]",
  },
  dangdut_koplo: {
    id: "dangdut_koplo",
    label: "Dangdut Koplo",
    emoji: "🎺",
    cardBg: "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400",
    textPrimary: "text-white",
    textSecondary: "text-red-100",
    accent: "border-white/40",
    badge: "bg-white/20 text-white border border-white/30",
    scoreBar: "bg-white",
    fontClass: "font-dangdut",
    effect: "shadow-[0_0_40px_rgba(239,68,68,0.7)]",
  },
  skena_senja: {
    id: "skena_senja",
    label: "Skena Senja",
    emoji: "🌇",
    cardBg: "bg-gradient-to-br from-orange-900 via-rose-800 to-purple-900",
    textPrimary: "text-orange-200",
    textSecondary: "text-rose-300",
    accent: "border-orange-400/40",
    badge: "bg-orange-400/20 text-orange-200 border border-orange-400/30",
    scoreBar: "bg-orange-400",
    fontClass: "font-senja",
    effect: "shadow-[0_0_60px_rgba(251,146,60,0.4)]",
  },
  wibu_neon: {
    id: "wibu_neon",
    label: "Wibu Neon",
    emoji: "🌸",
    cardBg: "bg-gradient-to-br from-fuchsia-950 via-purple-900 to-pink-950",
    textPrimary: "text-fuchsia-300",
    textSecondary: "text-pink-400",
    accent: "border-fuchsia-400/50",
    badge: "bg-fuchsia-400/20 text-fuchsia-300 border border-fuchsia-400/40",
    scoreBar: "bg-fuchsia-400",
    fontClass: "font-wibu",
    effect:
      "shadow-[0_0_80px_rgba(232,121,249,0.6)] ring-1 ring-fuchsia-500/30",
  },
  reggae_island: {
    id: "reggae_island",
    label: "Reggae Island",
    emoji: "🌴",
    cardBg: "bg-gradient-to-br from-green-700 via-yellow-600 to-red-600",
    textPrimary: "text-white",
    textSecondary: "text-yellow-200",
    accent: "border-white/40",
    badge: "bg-white/20 text-white border border-white/30",
    scoreBar: "bg-yellow-300",
    fontClass: "font-reggae",
    effect: "shadow-[0_0_40px_rgba(34,197,94,0.5)]",
  },
  hiphop_street: {
    id: "hiphop_street",
    label: "Hip-Hop Street",
    emoji: "🎤",
    cardBg: "bg-gradient-to-br from-zinc-900 via-neutral-800 to-zinc-900",
    textPrimary: "text-white",
    textSecondary: "text-zinc-400",
    accent: "border-white/20",
    badge: "bg-white/10 text-zinc-300 border border-white/20",
    scoreBar: "bg-white",
    fontClass: "font-hiphop",
    effect: "shadow-[0_0_30px_rgba(255,255,255,0.1)]",
  },
  trap_dark: {
    id: "trap_dark",
    label: "Trap Dark",
    emoji: "🖤",
    cardBg: "bg-gradient-to-br from-black via-violet-950 to-black",
    textPrimary: "text-violet-300",
    textSecondary: "text-violet-600",
    accent: "border-violet-500/40",
    badge: "bg-violet-500/10 text-violet-400 border border-violet-500/30",
    scoreBar: "bg-violet-500",
    fontClass: "font-trap",
    effect:
      "shadow-[0_0_80px_rgba(139,92,246,0.5)] ring-1 ring-violet-500/20",
  },
  classic_scholar: {
    id: "classic_scholar",
    label: "Classic Scholar",
    emoji: "🎻",
    cardBg: "bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200",
    textPrimary: "text-stone-800",
    textSecondary: "text-stone-500",
    accent: "border-stone-400/50",
    badge: "bg-stone-200 text-stone-700 border border-stone-300",
    scoreBar: "bg-stone-700",
    fontClass: "font-classic",
    effect: "shadow-[0_4px_30px_rgba(0,0,0,0.15)]",
  },
  vaporwave_80s: {
    id: "vaporwave_80s",
    label: "Vaporwave 80s",
    emoji: "📼",
    cardBg:
      "bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700",
    textPrimary: "text-cyan-300",
    textSecondary: "text-pink-300",
    accent: "border-cyan-400/50",
    badge: "bg-cyan-400/10 text-cyan-300 border border-cyan-400/40",
    scoreBar: "bg-gradient-to-r from-cyan-400 to-pink-400",
    fontClass: "font-vapor",
    effect:
      "shadow-[0_0_80px_rgba(167,139,250,0.6)] ring-1 ring-pink-400/30",
  },
};

export function getTheme(id: string): ThemeConfig {
  return themesConfig[id] ?? themesConfig["vibe_check"];
}
