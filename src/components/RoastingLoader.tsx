"use client";

/**
 * src/components/RoastingLoader.tsx
 * ───────────────────────────────────
 * Animasi loading step-by-step saat nunggu Groq.
 * Tiap step muncul berurutan, minimum display time
 * dihandle di parent (page.tsx).
 */

import { useEffect, useState } from "react";

export const STEPS = [
    { emoji: "🔍", text: "Ngintip playlist lo..." },
    { emoji: "🧠", text: "Menganalisis kepribadian..." },
    { emoji: "✍️",  text: "Nulis hukuman yang setimpal..." },
    { emoji: "💀", text: "Finalisasi roasting..." },
];

export const STEP_DURATION = 1250;
export const MIN_LOADING_MS = STEPS.length * STEP_DURATION; // 3600ms

export default function RoastingLoader() {
    const [activeStep, setActiveStep] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState<number[]>([0]);

    useEffect(() => {
        if (activeStep >= STEPS.length - 1) return;

        const timer = setTimeout(() => {
            const next = activeStep + 1;
            setActiveStep(next);
            setVisibleSteps((prev) => [...prev, next]);
        }, STEP_DURATION);

        return () => clearTimeout(timer);
    }, [activeStep]);

    return (
        <div className="w-full max-w-md mx-auto py-8 px-2">
            {/* Header */}
            <div className="mb-8 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
                    The Music Pathologist
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-3">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3">
                {STEPS.map((step, i) => {
                    const isVisible = visibleSteps.includes(i);
                    const isActive = i === activeStep;
                    const isDone = i < activeStep;

                    return (
                        <div
                            key={i}
                            className={`
                flex items-center gap-4 px-5 py-4 rounded-2xl border
                transition-all duration-500
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                ${isActive
                                ? "bg-zinc-800 border-zinc-600"
                                : isDone
                                    ? "bg-zinc-900/50 border-zinc-800"
                                    : "bg-transparent border-transparent"
                            }
              `}
                            style={{
                                transitionDelay: isVisible ? "0ms" : "0ms",
                            }}
                        >
              <span className="text-xl w-7 text-center">
                {isDone ? "✓" : step.emoji}
              </span>
                            <span
                                className={`text-sm font-medium transition-colors duration-300 ${
                                    isActive
                                        ? "text-white"
                                        : isDone
                                            ? "text-zinc-500"
                                            : "text-zinc-600"
                                }`}
                            >
                {step.text}
              </span>
                            {isActive && (
                                <span className="ml-auto w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin flex-shrink-0" />
                            )}
                            {isDone && (
                                <span className="ml-auto text-zinc-600 text-xs flex-shrink-0">✓</span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Flavor text */}
            <p className="text-center text-zinc-600 text-xs mt-8 italic">
                &ldquo;Sabar... ini butuh ketelitian tinggi buat ngehancurin lo.&rdquo;
            </p>
        </div>
    );
}