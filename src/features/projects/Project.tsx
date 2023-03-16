import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProjectById } from "./projectApiSlice";

function Project() {
  const { projectId } = useParams();
  const projectObject = projectId
    ? useSelector(selectProjectById({ projectId }))
    : null;

  if (!projectId) {
    return <div>No project id provided...</div>;
  }
  if (!projectObject || projectObject?.isLoading) {
    return <div>Loading...</div>;
  }
  if (projectObject?.notFound) {
    return <div>Project not found.</div>;
  }
  const project = projectObject?.data;

  return (
    <div>
      <h1>Project Name: {project?.name}</h1>
      <p>Project Owner username: {project?.owner.username}</p>
    </div>
  );
}

export default Project;
