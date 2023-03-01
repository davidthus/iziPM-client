import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  /*
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   * These tags are for storing data in the cache under names
   */
  tagTypes: ["Project", "User", "Task"],
  /*
   * This api has endpoints injected in adjacent files
   */
  endpoints: () => ({}),
});
