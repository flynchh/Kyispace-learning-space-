'use client';

import { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass-card p-8 text-center max-w-md">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-xl font-bold mb-2">Oops! Ada yang error nih</h2>
            <p className="text-sm text-muted mb-6">
              Jangan khawatir Kiya, datanya aman kok!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Refresh Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
