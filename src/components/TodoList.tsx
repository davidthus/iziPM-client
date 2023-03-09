import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { weekInMilliseconds } from "../constants/time";
import { selectUserInfo } from "../features/users/userApiSlice";
import { IProject } from "../types/project";

interface TodoListProps {
  projects: IProject[];
}

function TodoList({ projects }: TodoListProps) {
  const user = useSelector(selectUserInfo);

  const tasksToDoWithinAWeek = projects
    .map((project) => {
      return project.tasks.filter(
        (task) => Number(task.dueDate) < Date.now() + weekInMilliseconds
      );
    })
    .flat()
    .filter((task) =>
      task.assignedTo.some((member) => member._id === user.data?.user._id)
    );

  const mostUrgentTasks = tasksToDoWithinAWeek.sort(
    (a, b) => Number(a.dueDate) - Number(b.dueDate)
  );

  return (
    <section>
      {mostUrgentTasks.map((task) => (
        <article key={task._id}>
          <Link to={`/dash/projects/${task.projectId}/task/${task._id}`}>
            {task.name}
          </Link>
          <p>
            {task.description.slice(0, 30)}
            {task.description.length > 30 && "..."}
          </p>
        </article>
      ))}
    </section>
  );
}

export default TodoList;
