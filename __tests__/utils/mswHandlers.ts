import { http, HttpResponse } from "msw";

export const SUCCESS_URL = "/api/success";
export const NETWORK_ERROR_URL = "/api/network-error";
export const AUTHORIZATION_ERROR_URL = "/api/code-404";

export const SUCCESS_DATA = {
  name: "grimza99",
  date: `오늘은 ${new Date()}입니다.`,
};

export const mswHandlers = [
  /**success */
  http.get(SUCCESS_URL, () => {
    return HttpResponse.json(SUCCESS_DATA);
  }),
  /**network error */
  http.get(NETWORK_ERROR_URL, () => {
    //network error
    return HttpResponse.error();
  }),
  /**authorization error */
  http.get(AUTHORIZATION_ERROR_URL, () => {
    return new HttpResponse(null, { status: 401 });
  }),
];
