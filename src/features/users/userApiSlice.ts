import { Iuser } from "@/types/user";
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
    getUser: builder.query<{ user: Iuser }, void>({
      query: () => ({
        url: `/users`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
    updateUser: builder.mutation<IMsgRes, InewUserInfo>({
      query: (newUserInfo) => ({
        url: `/users`,
        method: "PATCH",
        body: { ...newUserInfo },
      }),
    }),
  }),
});

export const selectUserInfo = userApiSlice.endpoints.getUser.select();

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice;
