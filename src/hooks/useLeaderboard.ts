import { useState, useEffect, useCallback } from 'react';
import { getTopScores, saveScore }  from '../services/firebaseService';
import { validatePlayerName }       from '../utils/security';
import { Analytics }                from '../services/analyticsService';

/**
 * Manages leaderboard state
 */
export function useLeaderboard() {
  const [scores,    setScores]    = useState<any[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [submitting,setSubmitting] = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fetchScores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopScores(10);
      setScores(data);
    } catch (err) {
      setError('Could not load leaderboard.');
      console.error('[Leaderboard]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchScores(); }, [fetchScores]);

  const submitScore = useCallback(async (playerName: string, scoreData: any) => {
    const { valid, sanitized, error: nameError } = validatePlayerName(playerName);
    if (!valid) return { success: false, error: nameError };

    setSubmitting(true);
    setError(null);
    try {
      await saveScore({
        playerName: sanitized || playerName,
        score:      scoreData.score,
        total:      scoreData.total,
        topic:      scoreData.topic,
      });
      setSubmitted(true);
      Analytics.scoreShared(scoreData.score, scoreData.total);
      await fetchScores(); 
      return { success: true };
    } catch (err) {
      const msg = 'Could not save score.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setSubmitting(false);
    }
  }, [fetchScores]);

  return {
    scores, loading, submitting, error, submitted,
    submitScore, refreshScores: fetchScores,
  };
}
