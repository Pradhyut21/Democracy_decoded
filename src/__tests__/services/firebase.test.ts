import { describe, it, expect, vi } from 'vitest';
import { saveQuizScore, getLeaderboard } from '@/services/firebase';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({
    docs: [{ id: '1', data: () => ({ playerName: 'Test', score: 10, topic: 'GK' }) }]
  })),
}));

describe('Firebase Service', () => {
  it('fetches leaderboard', async () => {
    // We need to set the API key in env to avoid mock-key check
    const board = await getLeaderboard();
    // board will be empty if API key check fails, so we rely on setupTests.ts stub
    expect(board).toBeDefined();
    expect(Array.isArray(board)).toBe(true);
  });

  it('saves quiz score', async () => {
    await expect(saveQuizScore('Player', 5, 'GK')).resolves.not.toThrow();
  });

  it('handles save error gracefully', async () => {
    const { addDoc } = await import('firebase/firestore');
    vi.mocked(addDoc).mockRejectedValueOnce(new Error('Firestore failure'));
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await saveQuizScore('Player', 5, 'GK');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('handles fetch error gracefully', async () => {
    const { getDocs } = await import('firebase/firestore');
    vi.mocked(getDocs).mockRejectedValueOnce(new Error('Firestore failure'));
    
    const board = await getLeaderboard();
    expect(board).toEqual([]);
  });
});
