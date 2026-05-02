# Democracy Decoded 🗳️

[![Tests Passing](https://img.shields.io/badge/tests-passing-brightgreen)]()
[![Coverage](https://img.shields.io/badge/coverage-75%25-green)]()
[![WCAG 2.1 AA](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-blue)]()
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)]()

An AI-powered interactive platform educating citizens about Indian democratic processes, elections, and constitutional rights.

## 🎯 Challenge Vertical
**Election Process Education** — empowering citizens with knowledge about India's democratic system through interactive AI-driven learning.

## 🛠️ Google Services Integrated

| Service | Integration | Purpose |
|---------|-------------|---------|
| **Gemini 1.5 Flash** | Deep | AI chatbot with streaming, conversation memory, quiz generation |
| **Firebase Firestore** | Deep | Real-time leaderboard, score persistence |
| **Firebase Auth** | Active | Anonymous session tracking |
| **Google Analytics 4** | Active | User engagement, feature usage tracking |
| **Google Translate API** | Active | 8-language support for all citizens |

## 🧠 AI Logic & Approach

### DemocracyBot (Gemini Chat)
- Multi-turn conversation with full context memory
- Real-time streaming responses (character by character)
- System instruction constrains bot to democracy topics only
- Prompt injection prevention via pattern matching
- Rate limiting: 15 messages/minute per session
- Automatic retry with exponential backoff on failures

### AI Quiz Generator
- Generates unique MCQs per topic using Gemini
- Topics: ECI, NOTA, Constitutional Amendments, Lok Sabha, EVMs, etc.
- 3 difficulty levels with constitutional article references
- 10-minute client-side caching to reduce API calls
- Results saved to Firebase leaderboard

## 🔒 Security Measures

- **Input validation** — length limits, HTML sanitization, injection detection
- **Prompt injection prevention** — 8 pattern filters block jail break attempts
- **Rate limiting** — token bucket algorithm, 15 req/min
- **Error sanitization** — never exposes internal errors, API keys, or stack traces
- **Content Security Policy** — restricts script/connect sources via meta headers
- **Environment validation** — fails fast if API keys are missing
- **Firebase anonymous auth** — session tracking without PII collection

## ♿ Accessibility (WCAG 2.1 AA)

- Skip navigation link for keyboard users
- All interactive elements have ARIA labels
- `role="log"` with `aria-live="polite"` on chat messages
- `role="progressbar"` on quiz progress indicator
- Radio groups with proper `fieldset` + `legend`
- Minimum 44×44px touch targets
- Reduced motion support (`prefers-reduced-motion`)
- High contrast mode support (`forced-colors`)
- Color contrast ratios 5.1:1 – 18.1:1 (AA compliant)
- Screen reader tested

## ⚡ Performance Optimizations

- Code splitting: React, Firebase, Gemini, Three.js in separate chunks
- Async memoization with 10-minute TTL on quiz generation
- Debounced inputs to prevent excessive API calls
- Lazy loading of Three.js canvas component
- Firebase offline persistence for leaderboard resilience
- Translation cache prevents duplicate API calls

## 🚀 Quick Start

```bash
git clone https://github.com/Pradhyut21/Democracy_decoded
cd Democracy_decoded
npm install
cp .env.example .env
# Fill in your API keys
npm run dev
```

## ✅ Testing

```bash
npm test                    # Run all tests
npm run test:coverage       # Coverage report (target: 75%)
```
