"use client";

import Link from "next/link";

const FAQS = [
  {
    q: "Apakah data Spotify gua disimpan?",
    a: "Tidak. Data lo diproses langsung saat generate roasting dan nggak disimpan ke database manapun.",
  },
  {
    q: "Kenapa harus login Spotify?",
    a: "Judged butuh akses ke top tracks dan top artists lo buat bisa nge-judge selera musik lo secara personal. Tanpa data ini, hasilnya bakal generik.",
  },
  {
    q: "Berapa kali gua bisa generate judging?",
    a: "Maksimal 3x per hari per akun. Limit ini ada karena biaya server yang terbatas. Lo bisa dukung developer biar limitnya naik buat semua orang.",
  },
  {
    q: "Kenapa hasilnya kadang mirip-mirip?",
    a: "Model AI punya tendensi tertentu. Coba pilih time range yang berbeda (4 Minggu vs All Time) buat hasil yang lebih variatif.",
  },
  {
    q: "Bisa download hasil judging?",
    a: 'Bisa. Klik tombol "Download PNG" di bawah kartu judging lo.',
  },
  {
    q: "Cara cabut akses Judged dari Spotify?",
    a: "Buka spotify.com/account/apps → cari Judged → klik Remove Access.",
  },
];

export default function AboutPage() {
  return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12">
        <div className="max-w-xl mx-auto">
          {/* Back */}
          <Link
              href="/"
              className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors mb-10 inline-block"
          >
            ← Balik ke Home
          </Link>

          {/* About */}
          <div className="mb-14">
            <div className="text-5xl mb-6">🎵</div>
            <h1 className="text-3xl font-black text-white mb-4">
              Judged
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Judged adalah web app yang nge-judge selera musik lo
              berdasarkan data Spotify lo. Kasih tau top tracks dan artis
              favorit lo, dan &ldquo;The Music Pathologist&rdquo; bakal ngejudge kepribadian
              lo habis-habisan — dalam bahasa tongkrongan Jakarta yang toxic tapi lucu.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Dibuat iseng pakai Next.js, Spotify API, dan Groq AI.
              Nggak ada maksud jahat — murni hiburan. ✌️
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-white font-black text-xl mb-6">FAQ</h2>
            <div className="space-y-6">
              {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-zinc-800 pb-6 last:border-0">
                    <p className="text-white font-bold text-sm mb-2">{faq.q}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-14 pt-8 border-t border-zinc-800 flex gap-6 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
          </div>
        </div>
      </main>
  );
}