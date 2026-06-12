import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light px-4 text-center">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-2xl font-bold text-brand-dark mb-2">Something went wrong</h2>
          <p className="text-brand-medium mb-6 max-w-md">
            Our barista spilled the coffee. Please refresh the page or go back home.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-brand-dark text-white rounded-xl font-medium hover:bg-brand-espresso transition-colors"
            >
              Refresh Page
            </button>
            <a
              href="/"
              className="px-5 py-2.5 border border-brand-warm text-brand-warm rounded-xl font-medium hover:bg-amber-50 transition-colors"
            >
              Go Home
            </a>
          </div>
          {import.meta.env.DEV && (
            <pre className="mt-8 p-4 bg-red-50 text-red-700 text-xs text-left rounded-xl max-w-2xl overflow-x-auto">
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
