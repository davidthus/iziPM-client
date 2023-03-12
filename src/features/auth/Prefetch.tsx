import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { projectApiSlice } from "../projects/projectApiSlice";
import { userApiSlice } from "../users/userApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      projectApiSlice.util.prefetch("getUserProjects", "project", {
        force: true,
      })
    );
    store.dispatch(
      userApiSlice.util.prefetch("getUser", "user", { force: true })
    );
  }, []);
  return <Outlet />;
};
export default Prefetch;
