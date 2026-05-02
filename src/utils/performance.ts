/**
 * Performance utilities — lazy loading, debouncing, memoization
 */

export function debounce(fn: Function, delayMs = 300) {
  let timeoutId: any;
  const debounced = function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
}

export function memoizeAsync(fn: Function, ttlMs = 5 * 60 * 1000) {
  const cache = new Map();

  return async function (this: any, ...args: any[]) {
    const key   = JSON.stringify(args);
    const entry = cache.get(key);

    if (entry && Date.now() - entry.time < ttlMs) {
      return entry.value;
    }

    const value = await fn.apply(this, args);
    cache.set(key, { value, time: Date.now() });
    return value;
  };
}

export async function withRetry(fn: Function, maxRetries = 3, baseDelayMs = 1000) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export async function measurePerformance(label: string, fn: Function) {
  if (import.meta.env.PROD) return fn();

  const start  = performance.now();
  const result = await fn();
  const end    = performance.now();

  console.debug(`[Perf] ${label}: ${(end - start).toFixed(2)}ms`);
  return result;
}
