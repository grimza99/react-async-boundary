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
    <Suspense fallback={loadingFallback}>
      <ErrorBoundary fallback={errorFallback}>{children}</ErrorBoundary>
    </Suspense>
  );
}
