# Democracy Decoded 🗳️

**Democracy Decoded** is an immersive, interactive 3D platform designed to educate users about global electoral systems. Through high-fidelity visualizations and an AI-powered electoral guide, users can explore the mechanics of democracy across different nations.

## 🎯 Vertical: Election Process Education
This project focuses on demystifying complex electoral processes, comparing international voting methods, and providing real-time educational insights into how democracy functions globally.

## 🚀 Key Features
- **Interactive 3D Globe**: Explore 12 major democracies with detailed electoral data, upcoming election alerts, and leadership information.
- **AI Electoral Guide**: A smart assistant powered by **Google Gemini API** that answers complex questions about voting systems, gerrymandering, and constitutional frameworks.
- **Multilingual Support**: Integrated **Google Translate** for global accessibility.
- **Quiz Arena**: Test your knowledge of democratic principles and electoral mechanics, with results stored in **Firebase**.
- **Election Timeline**: Visual history of significant democratic milestones and upcoming major global polls.
- **Democratic Glossary**: Comprehensive database of electoral terminology.

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **AI**: Google Gemini API (@google/generative-ai)
- **Database**: Firebase Firestore (Quiz result tracking)
- **Analytics**: Google Analytics 4
- **Testing**: Vitest, React Testing Library
- **Accessibility**: axe-core (Real-time auditing)

## 🧠 AI Logic & Approach
The solution implements a "Persona-Driven" educational logic:
1. **Gemini Integration**: The AI assistant uses a constrained system prompt to ensure responses stay focused on democratic processes, preventing hallucinations on off-topic queries.
2. **Contextual History**: Maintains conversation context to allow follow-up questions about complex electoral topics.
3. **Safety**: Uses **DOMPurify** to sanitize user inputs before processing and displaying AI responses.

## 🛡️ Security & Performance
- **Environment Validation**: Automatic checks for required API keys at startup.
- **Content Security Policy (CSP)**: Robust headers to prevent XSS and data injection.
- **Efficiency**: 3D assets and large modules (Three.js) are **lazy-loaded**. Components use `useMemo` and `useCallback` to minimize re-renders.
- **Error Handling**: Global **ErrorBoundary** to ensure a smooth user experience even if a module fails.

## 🌍 Google Services Integration
- **Google Gemini API**: Powers the "Smart Electoral Guide".
- **Google Analytics 4**: Tracks user engagement and popular educational topics.
- **Google Translate**: Provides instant translation for 100+ languages.
- **Google Fonts**: Premium typography using "Inter" and "Outfit".

## ✅ Testing
```bash
npm test              # Run unit tests
npm run test:coverage # Generate coverage report
```

## 🔧 Installation
1. **Clone**: `git clone https://github.com/Pradhyut21/Democracy_decoded.git`
2. **Install**: `npm install`
3. **Env**: Create `.env` using `.env.example` as a template.
4. **Dev**: `npm run dev`

---
*Created for the Google Antigravity Challenge.*
