import { IProject } from "@/types/project";
import { apiSlice } from "../../app/api/apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query<{ projects: IProject[] }, void>({
      query: () => ({
        url: `/users/projects`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
  }),
});

export const { useGetUserProjectsQuery } = projectApiSlice;
