import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { projectApiSlice } from "../projects/projectApiSlice";
import { userApiSlice } from "../users/userApiSlice";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const projects = store.dispatch(
      projectApiSlice.endpoints.getUserProjects.initiate()
    );
    const users = store.dispatch(userApiSlice.endpoints.getUser.initiate());

    return () => {
      console.log("unsubscribing");
      projects.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
