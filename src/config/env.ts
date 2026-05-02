const required = ['VITE_GEMINI_API_KEY'];

export function validateEnv() {
  const missing = required.filter(key => !import.meta.env[key]);
  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
    // We don't throw to prevent the app from crashing in environments where these are optional
    // but the AI Assistant will show a friendly error message.
  }
}
