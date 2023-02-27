import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { projectApiSlice } from "../projects/projectApiSlice";
import { userApiSlice } from "../users/userApiSlice";

const Prefetch = () => {
  const { userId } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log("subscribing");
    const projects = store.dispatch(
      projectApiSlice.endpoints.getUserProjects.initiate(userId)
    );
    const users = store.dispatch(
      userApiSlice.endpoints.getUser.initiate(userId)
    );

    return () => {
      console.log("unsubscribing");
      projects.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
