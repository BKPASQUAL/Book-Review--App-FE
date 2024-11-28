import React from "react";
import "../assets/css/Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import { useLoginUserMutation } from "../store/api/authApi";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data); 
      console.log("loginUser", response);
      if (response.data && !response.data.error) {
        const { accessToken, roleId , userId } = response.data.payload;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("userId", userId );
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Welcome to the Book Review!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        console.error("Login Error", response);
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload || "Login failed!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Login Error", error);
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="Login-main">
      <div className="Login-con">
        <div className="Login-top">
          <div className="Login-top-title">
            <h1>Book</h1>
            <h2>Review</h2>
          </div>
          <div className="Login-top-title-title">Log In</div>
        </div>
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <div className="Login-mid">
            <TextField
              id="username"
              label="User Name"
              variant="outlined"
              fullWidth
              {...register("username", { required: "Username is required" })}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", { required: "Password is required" })}
            />
            <Button
              type="submit"
              style={{ height: "45px", marginTop: "20px" }}
              variant="contained"
              fullWidth
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="Login-btm">
          Don't have an account? <a href="/register">Create an account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
