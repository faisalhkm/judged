/**
 * src/lib/rateLimit.ts
 * ─────────────────────
 * In-memory rate limiter.
 * Reset tiap tengah malam WIB (UTC+7) = 17:00 UTC.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const userStore = new Map<string, RateLimitEntry>();

export const LIMITS = {
  perUser: 3,
  globalMax: 120,
};

let globalEntry: RateLimitEntry = {
  count: 0,
  resetAt: getNextMidnightWIB(),
};

function getNextMidnightWIB(): number {
  const now = new Date();
  const midnight = new Date();
  // 17:00 UTC = 00:00 WIB
  midnight.setUTCHours(17, 0, 0, 0);
  // Kalau 17:00 UTC hari ini udah lewat, ambil besok
  if (midnight.getTime() <= now.getTime()) {
    midnight.setUTCDate(midnight.getUTCDate() + 1);
  }
  return midnight.getTime();
}

function msUntilReset(resetAt: number): string {
  const ms = resetAt - Date.now();
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours} jam ${minutes} menit`;
  return `${minutes} menit`;
}

function getEntry(store: Map<string, RateLimitEntry>, key: string): RateLimitEntry {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const fresh = { count: 0, resetAt: getNextMidnightWIB() };
    store.set(key, fresh);
    return fresh;
  }

  return entry;
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: "user" | "global";
  remainingUser?: number;
  resetIn?: string;
}

export function checkRateLimit(userId: string): RateLimitResult {
  const now = Date.now();

  if (now > globalEntry.resetAt) {
    globalEntry = { count: 0, resetAt: getNextMidnightWIB() };
  }

  if (globalEntry.count >= LIMITS.globalMax) {
    return {
      allowed: false,
      reason: "global",
      resetIn: msUntilReset(globalEntry.resetAt),
    };
  }

  const userEntry = getEntry(userStore, userId);
  if (userEntry.count >= LIMITS.perUser) {
    return {
      allowed: false,
      reason: "user",
      resetIn: msUntilReset(userEntry.resetAt),
    };
  }

  userEntry.count++;
  globalEntry.count++;

  return {
    allowed: true,
    remainingUser: LIMITS.perUser - userEntry.count,
  };
}

/**
 * Kembalikan 1 slot ke user + global counter.
 * Dipanggil kalau Groq gagal — bukan salah user.
 */
export function refundRateLimit(userId: string): void {
  const userEntry = userStore.get(userId);
  if (userEntry && userEntry.count > 0) {
    userEntry.count--;
  }
  if (globalEntry.count > 0) {
    globalEntry.count--;
  }
}