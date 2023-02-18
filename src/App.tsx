import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/DashLayout.js";
import Layout from "./components/Layout.js";
import Public from "./components/Public.js";
import Login from "./features/auth/Login.js";
import Signup from "./features/auth/Signup.js";
import Welcome from "./features/auth/Welcome.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
