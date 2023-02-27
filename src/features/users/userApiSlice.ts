import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import type { IMsgRes } from "../../types/MsgRes";

interface InewUserInfo {
  userId: string;
  avatar?: {
    data: Buffer;
    contentType: string;
  };
  password?: string;
  notes: string;
  username: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
    updateUser: builder.mutation<IMsgRes, InewUserInfo>({
      query: (newUserInfo) => ({
        url: `/users/${newUserInfo.userId}`,
        method: "PATCH",
        body: { ...newUserInfo },
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice;
