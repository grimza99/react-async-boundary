import { useCallback } from "react";

type Record<T> = {
  promise?: Promise<T>;
  data?: T;
  error?: Error;
};

const globalCache = new Map<any, Record<any>>();

function readFromCache<T>(key: any, loader: () => Promise<T>): T | Error {
  let rec = globalCache.get(key) as Record<T> | undefined;
  if (!rec) {
    rec = {};
    globalCache.set(key, rec);
  }

  if (rec.data !== undefined) return rec.data;
  if (rec.error) throw rec.error;

  if (!rec.promise) {
    rec.promise = loader()
      .then((d) => {
        rec!.data = d;
        return d;
      })
      .catch((e) => {
        rec!.error = e;
        throw e;
      });
  }

  throw rec.promise;
}

export function useAsyncBoundary<T>(
  asyncFn: () => Promise<T>,
  key: string | number | symbol
): { data: T | Error } {
  const stableFn = useCallback(asyncFn, [key]);
  const data = readFromCache<T>(key, stableFn);
  return { data };
}
