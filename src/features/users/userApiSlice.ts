import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
