import { describe, expect, it } from "vitest";
import { RenderWithBoundary } from "./utils/RenderWithBoundary";
import { TestAsyncComponent } from "./utils/TestAsyncComponent";
import {
  AUTHORIZATION_ERROR_URL,
  NETWORK_ERROR_URL,
  SUCCESS_DATA,
  SUCCESS_URL,
} from "./utils/mswHandlers";
import { waitFor, screen } from "@testing-library/react";

/**promise*/
const promiseFn = async (
  url: string
): Promise<{ name: string; date: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === SUCCESS_URL) {
        resolve(SUCCESS_DATA);
      } else {
        reject(new Error("Promise rejected"));
      }
    }, 100);
  });
};

/**tests start*/
describe("Promise 기반 함수", () => {
  it("success", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => promiseFn(SUCCESS_URL)}
        testKey={`promise ${SUCCESS_URL}`}
      />
    );

    await waitFor(() => expect(screen.getByText("grimza99")));
  });

  it("network error", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => promiseFn(NETWORK_ERROR_URL)}
        testKey={`promise ${NETWORK_ERROR_URL}`}
      />
    );
    await waitFor(() => expect(screen.getByText("에러가 발생했습니다.")));
  });
  it("authorization error", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => promiseFn(AUTHORIZATION_ERROR_URL)}
        testKey={`promise ${AUTHORIZATION_ERROR_URL}`}
      />
    );
    await waitFor(() => expect(screen.getByText("에러가 발생했습니다.")));
  });
});
