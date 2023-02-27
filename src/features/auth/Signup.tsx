import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

type FormData = {
  username: string;
  email: string;
  password: string;
};

interface tokenPayload {
  userId: string;
}

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ username, email, password }: FormData) => {
    try {
      const { accessToken } = await signup({
        username,
        email,
        password,
      }).unwrap();
      const decoded: tokenPayload = jwt_decode(accessToken);
      dispatch(setCredentials({ accessToken, userId: decoded.userId }));

      navigate("/dash");
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username, Email or Password");
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
        <h1>Sign up</h1>
      </header>
      <main>
        <p className={errors ? "redmsg" : "offscreen"} aria-live="assertive">
          {errors.email?.message || errors.password?.message || errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Please enter your username",
            })}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Please enter your email",
            })}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Please enter your password",
            })}
          />
          <button type="submit">Sign up</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
}

export default Signup;
