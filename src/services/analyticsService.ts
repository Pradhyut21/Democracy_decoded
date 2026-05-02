import { trackEvent } from './firebaseService';

/**
 * Centralized analytics — all app events flow through here
 */

export const Analytics = {
  chatOpened: () =>
    trackEvent('chat_opened', { component: 'DemocracyBot' }),

  messageSent: (messageLength: number) =>
    trackEvent('chat_message_sent', { message_length: messageLength }),

  quizStarted: (topic: string, difficulty: string) =>
    trackEvent('quiz_started', { topic, difficulty }),

  quizCompleted: (topic: string, score: number, total: number) =>
    trackEvent('quiz_completed', {
      topic,
      score,
      total,
      percentage: Math.round((score / total) * 100),
    }),

  languageChanged: (fromLang: string, toLang: string) =>
    trackEvent('language_changed', { from: fromLang, to: toLang }),

  leaderboardViewed: () =>
    trackEvent('leaderboard_viewed'),

  scoreShared: (score: number, total: number) =>
    trackEvent('score_shared', { score, total }),

  pageView: (pageName: string) =>
    trackEvent('page_view', { page_name: pageName }),
};
