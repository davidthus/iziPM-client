import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/DashLayout.js";
import Layout from "./components/Layout.js";
import Public from "./components/Public.js";
import Login from "./features/auth/Login.js";
import PersistLogin from "./features/auth/PersistLogin.js";
import Prefetch from "./features/auth/Prefetch.js";
import RequireAuth from "./features/auth/RequireAuth.js";
import Signup from "./features/auth/Signup.js";
import Welcome from "./features/auth/Welcome.js";
import Project from "./features/projects/Project.js";
import ProjectSettings from "./features/projects/ProjectSettings.js";
import Task from "./features/projects/Task/Task.js";
import TaskSettings from "./features/projects/Task/TaskSettings.js";
import { userRoles } from "./hooks/useAuth.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              {/* project routes */}
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      userRoles.member,
                      userRoles.projectManager,
                      userRoles.owner,
                    ]}
                  />
                }
              >
                <Route path="projects/:projectId">
                  <Route index element={<Project />} />

                  <Route
                    path="settings"
                    element={<RequireAuth allowedRoles={[userRoles.owner]} />}
                  >
                    <Route index element={<ProjectSettings />} />
                  </Route>

                  <Route path="task/:taskId">
                    <Route index element={<Task />} />
                    <Route
                      path="settings"
                      element={
                        <RequireAuth
                          allowedRoles={[
                            userRoles.projectManager,
                            userRoles.owner,
                          ]}
                        />
                      }
                    >
                      <Route index element={<TaskSettings />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
              {/* end of project routes */}
            </Route>
          </Route>
        </Route>
        {/* end of protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
