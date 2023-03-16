import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { RootState } from "../../app/store";
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
    createProject: builder.mutation<
      { message: string; projectId: string },
      INewProject
    >({
      query: (newProject) => ({
        url: `/projects`,
        method: "POST",
        body: { ...newProject },
      }),
    }),
  }),
});

type selectProjectArg = {
  projectId: string;
};

// Define the selector function
export const selectProjectById =
  ({ projectId }: selectProjectArg) =>
  (state: RootState) => {
    const {
      data: projects,
      isLoading,
      isError,
    } = useGetUserProjectsQuery("projects"); // use the query hook

    if (isLoading) {
      // Return a loading state
      return { isLoading };
    }

    if (isError) {
      // Return an error state
      return { isError };
    }

    // Find the projects object with the specified ID
    let projectsData;
    if (typeof projects !== "undefined") {
      projectsData = projects?.projects.find(
        (project) => project._id === projectId
      );
    }

    if (!projectsData) {
      // Return a not found state
      return { notFound: true };
    }

    // Return the MyData object
    return { data: projectsData };
  };

export const selectUserProjects =
  projectApiSlice.endpoints.getUserProjects.select("projects");

export const { useGetUserProjectsQuery, useCreateProjectMutation } =
  projectApiSlice;
