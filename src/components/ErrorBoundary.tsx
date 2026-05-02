import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorId: string | null;
  message: string | null;
}

/**
 * React Error Boundary — catches rendering errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId:  null,
      message:  null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorId:  `ERR-${Date.now().toString(36).toUpperCase()}`,
      message:  error?.message ?? 'Unknown error',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', {
      errorId:  this.state.errorId,
      error:    error?.message,
      stack:    info.componentStack,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, errorId: null, message: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            padding:    '2rem',
            textAlign:  'center',
            border:     '1px solid #ff4444',
            borderRadius: '8px',
            margin:     '1rem',
            background: '#1a1a2e',
            color: '#fff'
          }}
        >
          <h2>⚠️ Something went wrong</h2>
          <p>
            We encountered an unexpected error. Please try refreshing.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#999' }}>
            Error ID: {this.state.errorId}
          </p>
          <button
            onClick={this.handleReset}
            style={{ 
              marginTop: '1rem', 
              padding: '0.5rem 1rem',
              backgroundColor: '#c9a227',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            aria-label="Try to recover from error"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
