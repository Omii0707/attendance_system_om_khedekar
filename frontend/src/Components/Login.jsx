import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(
      "http://localhost:3000/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    )

      .then((response) => {
        console.log(response);
        if (response.data.success) {
          login(response.data.user);
          window.localStorage.setItem("token", response.data.token);
          window.localStorage.setItem("role", response.data.role);
          if (response.data.user.role === "admin") {
            alert("Admin Successfully logged in");
            navigate("/admin");
          } else if (response.data.user.role === "teacher") {
            alert("Teacher Successfully logged in");
            navigate("/teacher");
          } else {
            alert("Successfully logged in");
            navigate("/student");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please check your email and password.");
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label className="login-label" htmlFor="email">
          Email:
        </label>
        <input
          className="login-input"
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="login-label" htmlFor="password">
          Password:
        </label>
        <input
          className="login-input"
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-btn" type="submit">
          Login
        </button>
        <Link to="/forgotPassword">Forgot Password?</Link>

        <p>
          Don't Have Account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
