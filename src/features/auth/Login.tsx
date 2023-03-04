import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getTokenPayload from "../../util/getTokenPayload";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials(getTokenPayload(accessToken)));
      navigate("/dash");
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <p className={errors ? "redmsg" : "offscreen"} aria-live="assertive">
          {errors.email?.message || errors.password?.message || errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "Please enter your email",
            })}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="on"
            {...register("password", {
              required: "Please enter your password",
            })}
          />
          <button type="submit">Login</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
}

export default Login;
