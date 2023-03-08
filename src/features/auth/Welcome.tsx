import React from "react";
import { useGetUserQuery } from "../users/userApiSlice";

function Welcome() {
  const {
    data: user,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useGetUserQuery("user", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>Projects map</section>
      <section>Todo List</section>
    </div>
  );
}

export default Welcome;
