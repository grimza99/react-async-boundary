import React from "react";
import { render } from "@testing-library/react";
import { AsyncBoundary } from "../../src/AsyncBoundary";

export function RenderWithBoundary(children: React.ReactNode) {
  return render(
    <AsyncBoundary
      loadingFallback={<p>loading...</p>}
      errorFallback={(err, reset) => (
        <div>
          <p>에러가 발생했습니다.</p>
          <p>❌Error: {err.message}</p>
          <button onClick={reset}>retry</button>
        </div>
      )}
    >
      {children}
    </AsyncBoundary>
  );
}
