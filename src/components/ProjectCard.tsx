import { IProject } from "../types/project";

interface ProjectCardProps {
  project: IProject;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div>
      <h4>{project.name}</h4>
      <p>{project.members.length} Members</p>
    </div>
  );
}

export default ProjectCard;
