// __tests__/utils/TestAsyncComponent.tsx
import { useAsyncBoundary } from "../../src";

interface TestAsyncComponentProps<T> {
  asyncFn: () => Promise<T>;
  testKey: string;
}

export function TestAsyncComponent<T>({
  asyncFn,
  testKey,
}: TestAsyncComponentProps<T>) {
  const { data } = useAsyncBoundary(asyncFn, testKey);

  return (
    <div>
      {typeof data === "object" && data !== null && "name" in data ? (
        <p>{(data as { name: string }).name}</p>
      ) : null}
    </div>
  );
}
