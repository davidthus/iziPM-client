import ProjectCard from "../../components/ProjectCard";
import TodoList from "../../components/TodoList";
import { useGetUserProjectsQuery } from "../projects/projectApiSlice";

function Welcome() {
  const {
    data: projects,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useGetUserProjectsQuery("projects", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(projects);

  const isProjectsDefinedAndMoreThanZero =
    typeof projects?.projects !== "undefined" && projects.projects.length >= 1;

  return (
    <div>
      <section>
        <h2>Projects</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : typeof projects?.projects !== "undefined" &&
          projects?.projects.length >= 1 ? (
          projects?.projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p>You have no projects.</p>
        )}
      </section>
      <section>
        <h2>Todos</h2>
        {isProjectsDefinedAndMoreThanZero ? (
          <TodoList projects={projects?.projects} />
        ) : (
          <div>You have no work to do</div>
        )}
      </section>
    </div>
  );
}

export default Welcome;
