"use client";

import Link from "next/link";

interface FooterProps {
  devName?: string;
  devUrl?: string;
}

export default function Footer({
                                 devName = "Faisal Hakim",
                                 devUrl = "https://github.com/faisalhkm",
                               }: FooterProps) {
  return (
      <footer className="w-full py-8 mt-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-zinc-600 text-xs">
            Made by{" "}
            <a
                href={devUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {devName}
            </a>
          </p>
          <div className="flex gap-4 text-xs text-zinc-700">
            <Link href="/about" className="hover:text-zinc-400 transition-colors">
              About
            </Link>
            <span className="text-zinc-800">·</span>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-zinc-800">·</span>
            <Link href="/contact" className="hover:text-zinc-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
  );
}