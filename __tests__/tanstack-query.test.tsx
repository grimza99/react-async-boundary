import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
import { TestAsyncComponent } from "./utils/TestAsyncComponent";
import { RenderWithBoundary } from "./utils/RenderWithBoundary";
import {
  AUTHORIZATION_ERROR_URL,
  mswHandlers,
  NETWORK_ERROR_URL,
  SUCCESS_URL,
} from "./utils/mswHandlers";
import { beforeAll, afterAll, afterEach, describe, it, expect } from "vitest";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const reactQueryFn = async (url: string) => {
  return queryClient.fetchQuery({
    queryKey: ["test-react-query", url],
    queryFn: async () => {
      try {
        const res = await fetch(url);
        const data = await res.text();
        const parsedData = JSON.parse(data);
        return parsedData;
      } catch (error) {
        console.error("❌ fetch 에러 발생:", error);
        throw error;
      }
    },
  });
};

/**msw setup */
const server = setupServer(...mswHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**tests start*/
describe("test-tanstack-query", () => {
  it("success", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => reactQueryFn(SUCCESS_URL)}
        testKey={SUCCESS_URL}
      />,
      true
    );

    await waitFor(() => expect(screen.getByText("grimza99")));
  });

  it("network error", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => reactQueryFn(NETWORK_ERROR_URL)}
        testKey={NETWORK_ERROR_URL}
      />,
      true
    );

    await waitFor(() => expect(screen.getByText("에러가 발생했습니다.")));
  });
  it("authorization error", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => reactQueryFn(AUTHORIZATION_ERROR_URL)}
        testKey={AUTHORIZATION_ERROR_URL}
      />,
      true
    );

    await waitFor(() => expect(screen.getByText("에러가 발생했습니다.")));
  });
});
