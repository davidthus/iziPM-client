import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useCreateProjectMutation } from "../features/projects/projectApiSlice";
import { selectUserInfo } from "../features/users/userApiSlice";
import type { IMsgRes } from "../types/MsgRes";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const SummaryWrapper = styled.details`
  display: flex;
`;

const AvatarPictureWrapper = styled.summary`
  border-radius: 99rem;
  list-style: none;
`;

const Avatar = styled.img`
  border-radius: var(--primer-borderRadius-medium, 6px);
  box-shadow: 0 0 0 1px var(--color-avatar-border);
  display: inline-block;
  flex-shrink: 0;
  line-height: 1;
  overflow: hidden;
  vertical-align: middle;
`;

type FormData = {
  projectName: string;
};

function DashHeader(): JSX.Element {
  const navigate = useNavigate();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { data } = useSelector(selectUserInfo);
  const [isNewProjectInputOpen, setIsNewProjectOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [
    sendLogout,
    {
      isLoading: isLogoutLoading,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      error: logoutError,
    },
  ] = useSendLogoutMutation();
  const [
    createProject,
    {
      isSuccess: isCreateProjectSuccess,
      isError: isCreateProjectError,
      error: createProjectError,
    },
  ] = useCreateProjectMutation();

  const onSubmit = async ({ projectName }: FormData) => {
    if (typeof data?.user._id !== "undefined") {
      const createProjectResponse = await createProject({
        projectName,
        userId: data?.user._id,
      });
      if (isCreateProjectSuccess) {
        const { data } = createProjectResponse as {
          data: { message: string; projectId: string };
        };
        navigate(`/dash/projects/${data.projectId}`);
      } else if (isCreateProjectError) {
        console.log(createProjectError);
      }
    }
  };

  useEffect(() => {
    if (isLogoutSuccess) navigate("/");
  }, [isLogoutSuccess, navigate]);

  if (isLogoutLoading) return <p>Logging Out...</p>;

  let err = logoutError as IMsgRes;

  if (isLogoutError && err) {
    return <p>Error: {err?.data?.message}</p>;
  }

  const logoutButton = (
    <button title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const createProjectButton = (
    <button
      title="Create Project"
      onClick={(e) => setIsNewProjectOpen((prev) => !prev)}
    >
      <p>Create Project</p>
      {isNewProjectInputOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            onClick={(e) => e.stopPropagation()}
            {...register("projectName", {
              required: true,
              minLength: 5,
              maxLength: 30,
            })}
          />
          {typeof errors?.projectName !== "undefined" && (
            <p>{errors.projectName?.message}</p>
          )}
        </form>
      )}
    </button>
  );

  const content = (
    <header>
      <div>
        <Link to="/dash">
          <h1>Welcome to iziPM</h1>
        </Link>
        <p>{data?.user && data.user.username}</p>
        <nav>
          {/* add more buttons later */}
          {createProjectButton}
          {logoutButton}
        </nav>
        <div></div>
      </div>
    </header>
  );

  return content;
}

export default DashHeader;
