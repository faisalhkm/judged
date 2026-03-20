/**
 * src/app/opengraph-image.tsx
 * ────────────────────────────
 * Auto-generate OG image buat share URL.
 * Next.js 14 otomatis serve di /opengraph-image
 * dan inject ke <meta og:image>.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Judged";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Emoji */}
        <div style={{ fontSize: "80px", marginBottom: "24px" }}>🎵</div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: "16px",
          }}
        >
          Judged
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#71717a",
            marginBottom: "48px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Dapetin judging paling toxic soal selera musik lo
        </div>

        {/* CTA Badge */}
        <div
          style={{
            background: "#1DB954",
            color: "#000000",
            fontSize: "22px",
            fontWeight: 700,
            padding: "14px 36px",
            borderRadius: "99px",
          }}
        >
          Login dengan Spotify →
        </div>
      </div>
    ),
    { ...size }
  );
}
