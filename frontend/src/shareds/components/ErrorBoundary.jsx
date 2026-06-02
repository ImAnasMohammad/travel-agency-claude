/*
 *  FileName:-     ErrorBoundary.jsx
 *  Description:-  React Error Boundary to gracefully catch and display runtime errors
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { logError } from '@utils/errorHandler';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    logError(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;

      if (Fallback) {
        return (
          <Fallback
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onRetry={this.handleRetry}
          />
        );
      }

      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            {/* Error icon */}
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            {/* Content */}
            <h1 className="text-2xl font-bold text-black tracking-tight mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              We ran into an unexpected error. Our team has been notified.
              You can try refreshing the page or go back to the homepage.
            </p>

            {/* Error details (dev only) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left bg-gray-50 rounded-xl p-4 border border-gray-200">
                <summary className="text-xs font-semibold text-gray-600 cursor-pointer mb-2">
                  Error Details (dev only)
                </summary>
                <pre className="text-xs text-red-600 overflow-auto max-h-40 mt-2">
                  {this.state.error?.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-900 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
