import DOMPurify from 'dompurify';

// ── Rate Limiter ───────────────────────────────────────────────────────────

/**
 * Token-bucket rate limiter — prevents API abuse
 */
export class RateLimiter {
  #calls: number[] = [];
  #maxCalls: number;
  #windowMs: number;

  constructor(maxCalls = 10, windowMs = 60_000) {
    this.#maxCalls  = maxCalls;
    this.#windowMs  = windowMs;
  }

  canCall() {
    const now     = Date.now();
    this.#calls   = this.#calls.filter((t) => now - t < this.#windowMs);
    if (this.#calls.length >= this.#maxCalls) return false;
    this.#calls.push(now);
    return true;
  }

  get remainingCalls() {
    const now   = Date.now();
    const active = this.#calls.filter((t) => now - t < this.#windowMs);
    return Math.max(0, this.#maxCalls - active.length);
  }

  get resetInMs() {
    if (this.#calls.length === 0) return 0;
    return this.#windowMs - (Date.now() - this.#calls[0]);
  }
}

export const geminiRateLimiter = new RateLimiter(15, 60_000);

// ── Input Validation ───────────────────────────────────────────────────────

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /you\s+are\s+now/i,
  /disregard\s+your/i,
  /act\s+as\s+(a|an)\s+/i,
  /system\s*prompt/i,
  /jailbreak/i,
  /\bDAN\b/,
  /pretend\s+you/i,
];

/**
 * Validate and sanitize user input before sending to AI
 */
export function validateInput(input: any) {
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string.' };
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Message cannot be empty.' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: `Message too long (${trimmed.length}/500 characters).` };
  }

  const hasInjection = PROMPT_INJECTION_PATTERNS.some((p) => p.test(trimmed));
  if (hasInjection) {
    return { valid: false, error: 'Invalid message format.' };
  }

  const sanitized = typeof DOMPurify !== 'undefined'
    ? DOMPurify.sanitize(trimmed, { ALLOWED_TAGS: [] })
    : trimmed.replace(/<[^>]*>/g, '');

  return { valid: true, sanitized };
}

/**
 * Sanitize player name for leaderboard
 */
export function validatePlayerName(name: any) {
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required.' };
  }

  const trimmed = name.trim();

  if (trimmed.length > 30) {
    return { valid: false, error: 'Name must be 30 characters or less.' };
  }

  if (!/^[\w\s\-'.]+$/u.test(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters.' };
  }

  return { valid: true, sanitized: trimmed };
}

// ── Error Sanitization ─────────────────────────────────────────────────────

/**
 * Convert internal errors to safe user-facing messages
 */
export function sanitizeError(error: any) {
  console.error('[Internal Error]', {
    message: error?.message,
    name:    error?.name,
    time:    new Date().toISOString(),
  });

  const msg = error?.message?.toLowerCase() ?? '';

  if (msg.includes('api_key') || msg.includes('api key')) {
    return 'Service configuration error.';
  }
  if (msg.includes('quota') || msg.includes('rate limit')) {
    return 'Service is busy. Please try again in a moment.';
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Connection error. Please check your internet connection.';
  }
  if (msg.includes('safety') || msg.includes('blocked')) {
    return 'That message could not be processed. Please rephrase.';
  }

  return 'Something went wrong. Please try again.';
}
