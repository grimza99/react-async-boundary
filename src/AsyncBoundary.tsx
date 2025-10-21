import React, { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

interface AsyncBoundaryProps {
  loadingFallback: React.ReactElement;
  errorFallback: (error: Error, reset: () => void) => React.ReactNode;
  children: React.ReactNode;
}

export function AsyncBoundary({
  loadingFallback,
  errorFallback,
  children,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>{children} </Suspense>
    </ErrorBoundary>
  );
}
