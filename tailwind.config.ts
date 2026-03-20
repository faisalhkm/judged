import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/themesConfig.ts",
  ],
  /**
   * PENTING: Karena class Tailwind di themesConfig.ts dibuild secara dinamis
   * (string concatenation), Tailwind nggak bisa auto-detect.
   * Semua class dari themesConfig HARUS di-safelist di sini.
   */
  safelist: [
    // cardBg gradients
    "bg-gradient-to-br",
    "from-pink-400", "via-fuchsia-400", "to-rose-300",
    "from-violet-600", "via-purple-500", "to-pink-500",
    "from-black", "via-gray-900",
    "from-amber-900", "via-yellow-800", "to-amber-700",
    "from-stone-900", "via-stone-800", "to-zinc-900",
    "via-zinc-950",
    "from-yellow-400", "via-yellow-300", "to-lime-300",
    "from-stone-700", "via-neutral-700", "to-stone-800",
    "from-emerald-900", "via-teal-800", "to-green-900",
    "from-slate-700", "via-slate-600", "to-blue-900",
    "via-amber-950",
    "from-indigo-500", "via-blue-500", "to-sky-400",
    "from-red-500", "via-orange-400", "to-yellow-400",
    "from-orange-900", "via-rose-800", "to-purple-900",
    "from-fuchsia-950", "via-purple-900", "to-pink-950",
    "from-green-700", "via-yellow-600", "to-red-600",
    "via-neutral-800",
    "via-violet-950",
    "from-stone-100", "via-amber-50", "to-stone-200",
    "from-indigo-900", "via-purple-800", "to-pink-700",
    // textPrimary
    "text-white", "text-cyan-300", "text-amber-100", "text-orange-400",
    "text-red-500", "text-black", "text-stone-200", "text-emerald-200",
    "text-blue-200", "text-amber-300", "text-fuchsia-300", "text-orange-200",
    "text-violet-300", "text-stone-800",
    // textSecondary
    "text-pink-100", "text-purple-200", "text-cyan-500", "text-amber-300",
    "text-stone-400", "text-zinc-500", "text-zinc-400", "text-emerald-400",
    "text-slate-400", "text-amber-600", "text-blue-100", "text-red-100",
    "text-rose-300", "text-pink-400", "text-yellow-200", "text-violet-600",
    "text-stone-500",
    // borders
    "border-white/40", "border-pink-300/50", "border-cyan-400/60",
    "border-amber-400/50", "border-orange-500/50", "border-red-800/60",
    "border-black/40", "border-stone-500/50", "border-emerald-500/40",
    "border-blue-400/30", "border-amber-600/40", "border-white/30",
    "border-white/40", "border-orange-400/40", "border-fuchsia-400/50",
    "border-white/40", "border-white/20", "border-violet-500/40",
    "border-stone-400/50", "border-cyan-400/50",
    // badges
    "bg-white/20", "bg-cyan-400/10", "bg-amber-400/20", "bg-orange-500/20",
    "bg-red-900/30", "bg-black/10", "bg-stone-500/20", "bg-emerald-500/20",
    "bg-blue-400/10", "bg-amber-600/20", "bg-pink-400/30", "bg-orange-400/20",
    "bg-fuchsia-400/20", "bg-white/20", "bg-white/10", "bg-violet-500/10",
    "bg-stone-200", "bg-cyan-400/10",
    // score bars
    "bg-stone-400", "bg-emerald-400", "bg-blue-400", "bg-amber-500",
    "bg-orange-500", "bg-red-600", "bg-cyan-400", "bg-amber-400",
    "bg-pink-300", "bg-fuchsia-400", "bg-orange-400", "bg-yellow-300",
    "bg-violet-500", "bg-stone-700",
    // effects / shadows
    "shadow-[0_0_40px_rgba(244,114,182,0.6)]",
    "shadow-[0_0_60px_rgba(168,85,247,0.7)]",
    "shadow-[0_0_80px_rgba(34,211,238,0.5)]",
    "ring-1", "ring-cyan-400/30",
    "shadow-[0_0_50px_rgba(217,119,6,0.5)]",
    "shadow-[0_0_40px_rgba(249,115,22,0.4)]",
    "shadow-[0_0_60px_rgba(185,28,28,0.6)]",
    "ring-red-900/50",
    "shadow-[4px_4px_0px_rgba(0,0,0,1)]",
    "shadow-[0_0_30px_rgba(120,113,108,0.4)]",
    "shadow-[0_0_40px_rgba(52,211,153,0.3)]",
    "shadow-[0_0_50px_rgba(96,165,250,0.2)]",
    "shadow-[0_0_60px_rgba(180,83,9,0.4)]",
    "shadow-[0_0_50px_rgba(99,102,241,0.6)]",
    "shadow-[0_0_40px_rgba(239,68,68,0.7)]",
    "shadow-[0_0_60px_rgba(251,146,60,0.4)]",
    "shadow-[0_0_80px_rgba(232,121,249,0.6)]",
    "ring-fuchsia-500/30",
    "shadow-[0_0_40px_rgba(34,197,94,0.5)]",
    "shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    "shadow-[0_0_80px_rgba(139,92,246,0.5)]",
    "ring-violet-500/20",
    "shadow-[0_4px_30px_rgba(0,0,0,0.15)]",
    "shadow-[0_0_80px_rgba(167,139,250,0.6)]",
    "ring-pink-400/30",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;