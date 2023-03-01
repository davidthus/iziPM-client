import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
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

function DashHeader(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { data } = useSelector(selectUserInfo);
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  let err = error as IMsgRes;

  if (isError && err) {
    return <p>Error: {err?.data?.message}</p>;
  }

  const logoutButton = (
    <button title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
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
          {logoutButton}
        </nav>
        <div></div>
      </div>
    </header>
  );

  return content;
}

export default DashHeader;
