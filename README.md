# Democracy Decoded

**Democracy Decoded** is an immersive, interactive 3D platform designed to educate users about global electoral systems. Through high-fidelity visualizations and an AI-powered electoral guide, users can explore the mechanics of democracy across different nations.

## 🌟 Vertical: Election Process Education
This project focuses on demystifying complex electoral processes, comparing international voting methods, and providing real-time educational insights into how democracy functions globally.

## 🚀 Key Features
- **Interactive 3D Globe**: Explore 12 major democracies with detailed electoral data, upcoming election alerts, and leadership information.
- **AI Electoral Guide**: A smart assistant powered by **Google Gemini API** that answers complex questions about voting systems, gerrymandering, and constitutional frameworks.
- **Election Timeline**: Visual history of significant democratic milestones and upcoming major global polls.
- **Quiz Arena**: Test your knowledge of democratic principles and electoral mechanics.
- **Democratic Glossary**: Comprehensive database of electoral terminology.

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **3D Visualization**: Three.js, React-Globe.gl
- **AI Integration**: Google Gemini API (@google/generative-ai)
- **Testing**: Vitest, React Testing Library

## 🧠 Approach & Logic
The solution implements a "Data-First" approach to electoral education:
1. **Contextual Awareness**: The AI assistant maintains conversation history and uses a specialized system prompt to ensure responses remain focused on electoral education.
2. **Efficiency**: 3D assets are optimized for performance. Components are lazy-loaded to ensure fast initial page loads.
3. **Accessibility**: All interactive elements are ARIA-compliant, ensuring the platform is usable for everyone.
4. **Logic**: The application uses a state-driven navigation system that allows seamless transitions between the 3D exploration and educational modules.

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pradhyut21/Democracy_decoded.git
   cd Democracy_decoded
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Run Tests**:
   ```bash
   npm test
   ```

6. **Linting**:
   ```bash
   npm run lint
   ```

## 🛡️ Security & Quality
- **Type Safety**: Full TypeScript implementation with strict rules.
- **Linting**: ESLint configured for React best practices.
- **API Security**: Environment variables used for sensitive keys.
- **Efficiency**: Optimized rendering and asset management.

## 🌍 Google Services Integration
- **Google Gemini API**: Powers the "Smart Electoral Guide", providing dynamic, expert-level responses to user queries about global democracy.
- **Google Fonts**: Integrated "Inter" and "Outfit" for premium typography.

---
*Created for the Google Antigravity Challenge.*
