import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const { data: userData } = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
  const [createProject] = useCreateProjectMutation();

  const onSubmit = async ({ projectName }: FormData) => {
    const isUserDefined = typeof userData?.user._id !== "undefined";

    try {
      if (isUserDefined) {
        await createProject({
          projectName,
          userId: userData?.user._id,
        });
        reset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isLogoutSuccess) navigate("/");
  }, [isLogoutSuccess, navigate]);

  let content;

  if (isLogoutLoading) content = <p>Logging Out...</p>;

  let err = logoutError as IMsgRes;

  if (isLogoutError && err) {
    content = <p>Error: {err?.data?.message}</p>;
  }

  const logoutButton = (
    <button title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  content = (
    <header>
      <div>
        <Link to="/dash">
          <h1>Welcome to iziPM</h1>
        </Link>
        <p>{userData?.user && userData.user.username}</p>
        <nav>
          {/* add more buttons later */}
          {logoutButton}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("projectName", {
                required: "This field is required.",
                minLength: { value: 4, message: "Min length is 4" },
                maxLength: { value: 30, message: "Max length is 30" },
              })}
            />
            {errors?.projectName?.message && (
              <p>{errors.projectName?.message}</p>
            )}
            <button type="submit">Create project</button>
          </form>
        </nav>
      </div>
    </header>
  );

  return content;
}

export default DashHeader;
