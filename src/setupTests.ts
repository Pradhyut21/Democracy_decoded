import "@testing-library/jest-dom";

class IntersectionObserverMock {
  root = null;
  rootMargin = "";
  thresholds = [];
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

import { vi } from 'vitest';
vi.stubEnv('VITE_GEMINI_API_KEY', 'test-api-key');
vi.stubEnv('VITE_FIREBASE_API_KEY', 'test-firebase-key');

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
