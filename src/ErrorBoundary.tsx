import React from "react";

type ErrorBoundaryProps = {
  fallback:
    | React.ReactNode
    | ((error: Error, reset: () => void) => React.ReactNode);
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error !== null) {
      if (typeof this.props.fallback !== "function") {
        return this.props.fallback;
      }
      return this.props.fallback(this.state.error, this.reset);
    }
    return this.props.children;
  }
}
