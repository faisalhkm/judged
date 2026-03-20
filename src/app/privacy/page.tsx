"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16">
      <div className="max-w-xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors mb-10 inline-block"
        >
          ← Balik ke Home
        </Link>

        <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-10">Terakhir diupdate: Maret 2026</p>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold mb-3">Data apa yang diakses?</h2>
            <p>
              Judged hanya mengakses data berikut dari akun Spotify lo:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-zinc-500">
              <li>Username dan nama akun Spotify</li>
              <li>Top tracks (lagu yang paling sering lo dengerin)</li>
              <li>Top artists (artis yang paling sering lo dengerin)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold mb-3">Data lo disimpan?</h2>
            <p>
              Tidak. Semua data Spotify lo diproses langsung di server saat lo generate roasting,
              dan tidak disimpan ke database manapun. Data lo tidak dibagikan ke pihak ketiga
              manapun selain Groq API yang digunakan untuk generate teks roasting.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-3">Groq API</h2>
            <p>
              Judged menggunakan Groq API untuk memproses data musik lo dan
              menghasilkan teks roasting. Data yang dikirim ke Groq hanya berupa
              daftar lagu dan artis — tanpa informasi pribadi lainnya.
              Kebijakan privasi Groq dapat dilihat di{" "}
              <a
                href="https://groq.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 underline underline-offset-2 hover:text-white"
              >
                groq.com/privacy-policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-3">Cara cabut akses</h2>
            <p>
              Lo bisa cabut akses Judged kapanpun lewat halaman{" "}
              <a
                href="https://www.spotify.com/account/apps/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 underline underline-offset-2 hover:text-white"
              >
                Spotify Apps
              </a>
              , lalu klik "Remove Access" di Judged.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-3">Pertanyaan?</h2>
            <p>
              Kalau ada pertanyaan soal privasi, hubungi lewat{" "}
              <a
                href="mailto:YOUR_EMAIL"
                className="text-zinc-300 underline underline-offset-2 hover:text-white"
              >
                email
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
