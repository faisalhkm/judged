/**
 * src/lib/groq.ts
 */

import Groq from "groq-sdk";
import { z } from "zod";
import type { RoastPayload } from "./spotify";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─── Schema & Types ───────────────────────────────────────────────────────────

const VALID_THEMES = [
  "pop_sugar", "kpop_fever", "edm_rave", "rnb_silk", "rock_classic",
  "metal_void", "punk_chaos", "grunge_dirt", "indie_folks", "lofi_vibes",
  "jazz_club", "vibe_check", "dangdut_koplo", "skena_senja", "wibu_neon",
  "reggae_island", "hiphop_street", "trap_dark", "classic_scholar", "vaporwave_80s",
] as const;

const RoastSchema = z.object({
  tema_visual: z
      .string()
      .refine((v) => VALID_THEMES.includes(v as any), {
        message: "tema_visual tidak valid",
      })
      .catch("vibe_check"), // fallback kalau tema nggak dikenal
  julukan: z.string().min(1),
  analisis_karakter: z.string().min(1),
  pasangan_cocok: z.string().min(1),
  kendaraan_cocok: z.string().min(1),
  style_kit: z
      .union([
        z.array(z.string()),
        // Groq kadang return string "a, b, c" instead of array
        z.string().transform((s) => s.split(",").map((x) => x.trim())),
      ])
      .pipe(z.array(z.string()).min(1)),
  skor_kebahagiaan: z
      .union([
        z.number(),
        // Groq kadang return "7" atau "7/10"
        z.string().transform((s) => parseInt(s.replace(/\/.*$/, ""), 10)),
      ])
      .pipe(z.number().min(1).max(10))
      .catch(5), // fallback ke 5 kalau nggak valid
});

export type RoastResult = z.infer<typeof RoastSchema>;

// Custom error buat bedain "Groq ngaco" vs error lain
export class GroqValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GroqValidationError";
  }
}

// ─── System Prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Lo adalah "The Music Pathologist" — kritikus musik paling sombong dan sinis, hobi ngerendahin selera orang.

TEMA VISUAL (pilih SATU paling cocok):
[pop_sugar, kpop_fever, edm_rave, rnb_silk, rock_classic, metal_void, punk_chaos, grunge_dirt, indie_folks, lofi_vibes, jazz_club, vibe_check, dangdut_koplo, skena_senja, wibu_neon, reggae_island, hiphop_street, trap_dark, classic_scholar, vaporwave_80s]

RULES:
1. Bahasa tongkrongan Jakarta yang toxic tapi lucu. BUKAN bahasa formal.
2. DILARANG pakai kata: Kamu/Anda/Saya/Punya/Suka/Sering/Cenderung.
3. Serang kepribadian, bukan list lagunya. Jangan sebut nama artis/lagu di analisis_karakter.
4. Langsung tembak kelakuannya. Contoh: "Lo tipe yang..."
5. pasangan_cocok harus sarkas dan BERVARIASI. Jangan selalu mulai dengan "Terapis". Bisa siapa aja: teman, pasangan, profesi lain, atau bahkan benda/konsep yang relate.
6. style_kit: 3 item, NAMA BARANG/BRAND spesifik, relate ke subkultur musiknya.

OUTPUT RULES (WAJIB DIIKUTI):
- Response HANYA JSON, tanpa teks lain
- Tepat 7 field: tema_visual, julukan, analisis_karakter, pasangan_cocok, kendaraan_cocok, style_kit, skor_kebahagiaan
- style_kit WAJIB array of string berisi tepat 3 item
- skor_kebahagiaan WAJIB integer 1-10, BUKAN string
- tema_visual WAJIB salah satu dari list di atas PERSIS

CONTOH:
{"tema_visual":"skena_senja","julukan":"Starterpack Galau Fomo","analisis_karakter":"Lo tipe yang kalau ada masalah dikit langsung lari ke kopi susu gula aren biar ngerasa paling deep sedunia. Padahal cuma laper.","pasangan_cocok":"Barista yang udah hafal pesanan lo sebelum lo ngomong apa-apa.","kendaraan_cocok":"Vespa matic yang cicilannya nunggak 3 bulan.","style_kit":["Totebag dekil","Korek gas hasil curanrek","Kacamata frame tebel"],"skor_kebahagiaan":3}`;

// ─── User Prompt Builder ──────────────────────────────────────────────────────

function buildUserPrompt(payload: RoastPayload): string {
  const timeRangeLabel: Record<string, string> = {
    short_term: "4 minggu terakhir",
    medium_term: "6 bulan terakhir",
    long_term: "sepanjang masa",
  };

  return `Roast selera musik ini (periode: ${timeRangeLabel[payload.timeRange]}):
TRACKS: ${payload.topTracks.join(" | ")}
ARTISTS: ${payload.topArtists.join(" | ")}
GENRES: ${payload.dominantGenres.join(", ")}`;
}

// ─── Main Roast Function ──────────────────────────────────────────────────────

export async function roastMusicTaste(
    payload: RoastPayload
): Promise<RoastResult> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(payload) },
    ],
    temperature: 0.9,
    max_tokens: 400,
    response_format: { type: "json_object" },
  });

  const rawText = completion.choices[0]?.message?.content ?? "";

  // Parse JSON dulu
  let raw: unknown;
  try {
    raw = JSON.parse(rawText);
  } catch {
    throw new GroqValidationError(`Groq returned invalid JSON: ${rawText}`);
  }

  // Validasi + auto-fix dengan Zod
  const result = RoastSchema.safeParse(raw);

  if (!result.success) {
    console.error("[Groq] Validation failed:", result.error.flatten());
    throw new GroqValidationError(
        `Output Groq nggak sesuai schema: ${result.error.flatten().fieldErrors}`
    );
  }

  return result.data;
}