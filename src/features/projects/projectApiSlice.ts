import { apiSlice } from "../../app/api/apiSlice";
import { IProject } from "../../types/project";

interface INewProject {
  userId: string;
  projectName: string;
}

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProjects: builder.query<{ projects: IProject[] }, string>({
      query: () => ({
        url: `/users/projects`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
    createProject: builder.mutation<{ projects: IProject[] }, INewProject>({
      query: (newProject) => ({
        url: `/projects`,
        method: "POST",
        body: { ...newProject },
      }),
    }),
  }),
});

export const selectUserProjects =
  projectApiSlice.endpoints.getUserProjects.select("projects");

export const { useGetUserProjectsQuery } = projectApiSlice;
