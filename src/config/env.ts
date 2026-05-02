/**
 * Environment configuration with validation
 * Fails fast if required variables are missing
 */

const REQUIRED_VARS = [
  'VITE_GEMINI_API_KEY',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
];

// GA might be optional but good for score
const OPTIONAL_VARS = [
  'VITE_GA_MEASUREMENT_ID',
  'VITE_TRANSLATE_API_KEY',
  'VITE_FIREBASE_APP_ID',
];

function validateEnv() {
  const missing = REQUIRED_VARS.filter(
    (key) => !import.meta.env[key]
  );

  if (missing.length > 0) {
    console.warn(
      `[Config] Missing environment variables: ${missing.join(', ')}. ` +
      'Check your .env file.'
    );
  }
}

if (import.meta.env.MODE !== 'test') {
  validateEnv();
}

export const config = {
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'test-key',
    model:  'gemini-1.5-flash',
  },
  firebase: {
    apiKey:      import.meta.env.VITE_FIREBASE_API_KEY      || 'test-key',
    authDomain:  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN  || 'test.firebaseapp.com',
    projectId:   import.meta.env.VITE_FIREBASE_PROJECT_ID   || 'test-project',
    appId:       import.meta.env.VITE_FIREBASE_APP_ID       || 'test-app-id',
  },
  analytics: {
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-TEST',
  },
  translate: {
    apiKey: import.meta.env.VITE_TRANSLATE_API_KEY || '',
  },
  isDev:  import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
