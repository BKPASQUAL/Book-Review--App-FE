import React from "react";
import "../assets/css/SignUp.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../store/api/authApi";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation(); // RTK mutation hook

  const onSubmit = async (data) => {
    try {
      const requestData = {
        ...data,
        roleId: 1, // Add the default roleId
      };

      // Call the API
      await registerUser(requestData).unwrap();

      // Navigate or show a success message
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle errors (e.g., show an alert or message)
    }
  };

  return (
    <div className="signup-main">
      <div className="signup-con">
        <div className="signup-top">
          <div className="signup-top-title">
            <h1>Book</h1>
            <h2>Review</h2>
          </div>
          <div className="signup-top-title-title">Sign UP</div>
        </div>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="signup-mid">
            <div className="signup-columns">
              <div className="signup-left">
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  {...register("firstName", { required: "First Name is required" })}
                />
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
              </div>
              <div className="signup-right">
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  {...register("lastName", { required: "Last Name is required" })}
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  {...register("email", { required: "Email is required" })}
                />
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                />
              </div>
            </div>
            <Button
              type="submit"
              style={{ height: "45px", marginTop: "20px" }}
              variant="contained"
              fullWidth
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="signup-btm">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
