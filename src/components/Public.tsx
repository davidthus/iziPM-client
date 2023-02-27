import { Link } from "react-router-dom";

function Public() {
  return (
    <div>
      Public
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default Public;
