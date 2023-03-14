import { Link } from "react-router-dom";
import { IProject } from "../types/project";

interface ProjectCardProps {
  project: IProject;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/dash/projects/${project._id}`}>
      <h4>{project.name}</h4>
      <p>{project.members.length} Members</p>
    </Link>
  );
}

export default ProjectCard;
