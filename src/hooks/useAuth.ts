import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentToken } from "../features/auth/authSlice";
import { selectUserProjects } from "../features/projects/projectApiSlice";
import getTokenPayload from "../util/getTokenPayload";

// 0,1,2 integers

export enum userRoles {
  member,
  projectManager,
  owner,
}

type returnValues =
  | userRoles.member
  | userRoles.projectManager
  | userRoles.owner
  | false;

export default function useAuth(): returnValues {
  const accessToken = useSelector(selectCurrentToken);
  const { data } = useSelector(selectUserProjects);
  const { projectId } = useParams();
  const { userId } = getTokenPayload(accessToken);

  let status: returnValues = false;
  // false if user is not in the project (in the members array)

  if (typeof data !== "undefined") {
    const project = data.projects.find((project) => project._id === projectId);

    if (!project) {
      return status;
    }

    const isUserOwner = project.owner._id === userId;
    const isUserPM = project.projectManagers.find((pm) => pm._id === userId)
      ? true
      : false;

    if (isUserOwner) {
      status = userRoles.owner;
      return status;
    } else if (isUserPM) {
      status = userRoles.projectManager;
      return status;
    } else {
      status = userRoles.member;
      return status;
    }
  }
  // returns false if user isnt in the project
  return status;
}
