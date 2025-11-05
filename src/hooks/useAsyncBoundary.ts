// src/hooks/useAsync.ts
import { useRef } from "react";

type AsyncState<T> = {
  promise?: Promise<T>;
  data?: T;
  error?: Error;
};

export function useAsyncBoundary<T>(asyncFn: () => Promise<T>): { data: T } {
  const state = useRef<AsyncState<T>>({});

  if (!state.current.promise) {
    state.current.promise = asyncFn()
      .then((res) => (state.current.data = res))
      .catch((err) => (state.current.error = err));

    throw state.current.promise;
  }

  if (state.current.error) {
    throw state.current.error;
  }

  if (state.current.data !== undefined) {
    return { data: state.current.data };
  }

  throw state.current.promise;
}
