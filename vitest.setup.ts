import "@testing-library/jest-dom/vitest";

if (!globalThis.fetch) {
  try {
    const undici = await import("undici");
    Object.assign(globalThis, {
      fetch: undici.fetch,
      Headers: undici.Headers,
      Request: undici.Request,
      Response: undici.Response,
    });
  } catch (error) {
    console.warn("Failed to load undici for fetch polyfill:", error);
  }
}
