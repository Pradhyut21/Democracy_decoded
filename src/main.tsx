import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/accessibility.css'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { config } from './config/env'

// Env validation is handled inside config import

if (import.meta.env.DEV) {
  import('@axe-core/react').then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)