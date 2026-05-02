import { initializeApp, getApps }              from 'firebase/app';
import { getFirestore, collection, addDoc,
         query, orderBy, limit, getDocs,
         serverTimestamp, where,
         enableIndexedDbPersistence }           from 'firebase/firestore';
import { getAnalytics, logEvent }              from 'firebase/analytics';
import { getAuth, signInAnonymously }          from 'firebase/auth';
import { config }                              from '../config/env';

// Prevent duplicate initialization
const app = getApps().length === 0
  ? initializeApp(config.firebase)
  : getApps()[0];

export const db       = getFirestore(app);
export const auth     = getAuth(app);
export const analytics = typeof window !== 'undefined'
  ? getAnalytics(app)
  : null;

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('[Firebase] Multiple tabs open — persistence disabled.');
    } else if (err.code === 'unimplemented') {
      console.warn('[Firebase] Browser does not support persistence.');
    }
  });
}

/**
 * Sign in anonymously
 */
export async function signInAnon() {
  try {
    return await signInAnonymously(auth);
  } catch (err) {
    console.error('[Firebase Auth]', err);
    throw err;
  }
}

// ── Leaderboard ────────────────────────────────────────────────────────────

export async function saveScore({ playerName, score, total, topic }: { playerName: string, score: number, total: number, topic: string }) {
  if (!playerName || score == null || total == null) {
    throw new Error('saveScore: playerName, score, and total are required');
  }

  const percentage = Math.round((score / total) * 100);

  return addDoc(collection(db, 'leaderboard'), {
    playerName:  playerName.trim().slice(0, 30),
    score,
    total,
    percentage,
    topic,
    userId:    auth.currentUser?.uid ?? 'anonymous',
    timestamp: serverTimestamp(),
  });
}

export async function getTopScores(n = 10) {
  try {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('percentage', 'desc'),
      orderBy('timestamp',  'desc'),
      limit(n)
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: (doc.data() as any).timestamp?.toDate?.() ?? new Date(),
    }));
  } catch (e) {
    console.error("Leaderboard fetch error", e);
    return [];
  }
}

// ── Analytics Events ───────────────────────────────────────────────────────

export function trackEvent(eventName: string, params = {}) {
  try {
    if (analytics) logEvent(analytics, eventName, params);
  } catch (err: any) {
    console.warn('[Analytics]', err.message);
  }
}
