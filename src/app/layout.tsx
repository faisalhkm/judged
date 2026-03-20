import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    title: "Judged 🎵🔥",
    description: "Dapetin judging paling toxic soal selera musik lo. Gratis. Tanpa ampun.",
    metadataBase: new URL(APP_URL),
    openGraph: {
        title: "Judged 🎵🔥",
        description: "Dapetin judging paling toxic soal selera musik lo. Gratis. Tanpa ampun.",
        url: APP_URL,
        siteName: "Judged",
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Judged 🎵🔥",
        description: "Dapetin judging paling toxic soal selera musik lo. Gratis. Tanpa ampun.",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
        <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
        </body>
        </html>
    );
}