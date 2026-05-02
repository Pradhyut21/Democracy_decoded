import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-[#ffffff] p-5 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <p className="text-[#a0a0b0] mb-6">We encountered an unexpected error. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-[#c9a227] text-[#0a0a0f] font-bold"
          >
            REFRESH PAGE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
