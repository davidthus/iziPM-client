import { apiSlice } from "../../app/api/apiSlice";
import type { IMsgRes } from "../../types/MsgRes";
import { IUser } from "../../types/user";

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
    getUser: builder.query<{ user: IUser }, string>({
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

export const selectUserInfo = userApiSlice.endpoints.getUser.select("user");

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice;
