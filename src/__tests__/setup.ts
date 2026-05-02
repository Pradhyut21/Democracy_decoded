import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
vi.stubEnv('VITE_GEMINI_API_KEY',      'test-gemini-key');
vi.stubEnv('VITE_FIREBASE_API_KEY',    'test-firebase-key');
vi.stubEnv('VITE_FIREBASE_AUTH_DOMAIN','test.firebaseapp.com');
vi.stubEnv('VITE_FIREBASE_PROJECT_ID', 'test-project');
vi.stubEnv('VITE_GA_MEASUREMENT_ID',   'G-TEST123');
vi.stubEnv('MODE', 'test');

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock IntersectionObserver
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

// Mock firebase
vi.mock('firebase/app',       () => ({ initializeApp: vi.fn(() => ({})), getApps: vi.fn(() => []) }));
vi.mock('firebase/firestore', () => ({
  getFirestore:              vi.fn(),
  collection:                vi.fn(),
  addDoc:                    vi.fn(() => Promise.resolve({ id: 'test-id' })),
  query:                     vi.fn(),
  orderBy:                   vi.fn(),
  limit:                     vi.fn(),
  getDocs:                   vi.fn(() => Promise.resolve({ docs: [] })),
  serverTimestamp:           vi.fn(),
  where:                     vi.fn(),
  enableIndexedDbPersistence:vi.fn(() => Promise.resolve()),
}));
vi.mock('firebase/auth',      () => ({ getAuth: vi.fn(), signInAnonymously: vi.fn(() => Promise.resolve({ user: { uid: 'anon-123' } })) }));
vi.mock('firebase/analytics', () => ({ getAnalytics: vi.fn(), logEvent: vi.fn() }));
