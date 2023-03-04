import { apiSlice } from "../../app/api/apiSlice";
import { IProject } from "../../types/project";

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

export const selectUserProjects =
  projectApiSlice.endpoints.getUserProjects.select();

export const { useGetUserProjectsQuery } = projectApiSlice;
