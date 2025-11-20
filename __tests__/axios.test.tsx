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
import axios from "axios";

/**axios function */
const axiosFn = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

/**msw setup */
const server = setupServer(...mswHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**tests start*/
describe("test-axios", () => {
  it("success", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => axiosFn(SUCCESS_URL)}
        testKey={SUCCESS_URL}
      />
    );

    await waitFor(() => expect(screen.getByText("grimza99")));
  });

  it("network error", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => axiosFn(NETWORK_ERROR_URL)}
        testKey={NETWORK_ERROR_URL}
      />
    );

    await waitFor(() => expect(screen.getByText("에러가 발생했습니다.")));
  });
  it("authorization error", async () => {
    RenderWithBoundary(
      <TestAsyncComponent
        asyncFn={() => axiosFn(AUTHORIZATION_ERROR_URL)}
        testKey={AUTHORIZATION_ERROR_URL}
      />
    );

    await waitFor(() => expect(screen.getByText("에러가 발생했습니다.")));
  });
});
