import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import jwt_decode from "jwt-decode";
import { setCredentials } from "../../features/auth/authSlice";
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

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      let typedRefreshResult = refreshResult.data as { accessToken: string };
      // store the new token
      const decoded: { userId: string } = jwt_decode(
        typedRefreshResult.accessToken
      );
      api.dispatch(
        setCredentials({
          accessToken: typedRefreshResult.accessToken,
          userId: decoded.userId,
        })
      );

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      let error = refreshResult.error as {
        status: number;
        data: { message: string };
      };

      if (error.status === 403) {
        error.data.message = "Your login has expired. ";
      }

      return refreshResult;
    }
  }

  return result;
};

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
