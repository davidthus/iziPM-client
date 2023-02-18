import { apiSlice } from "../../app/api/apiSlice";

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/projects`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
  }),
});

export const { useGetUserProjectsQuery } = projectApiSlice;
