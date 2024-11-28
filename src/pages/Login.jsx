import React from "react";
import "../assets/css/Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  return (
    <div className="Login-main">
      <div className="Login-con">
        <div className="Login-top">
          <div className="Login-top-title">
            <h1>Book</h1>
            <h2>Review</h2>
          </div>
          <div className="Login-top-title-title">LogIn</div>
        </div>
        <div className="Login-mid">
          <TextField id="outlined-basic" label="User Name" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button style={{ height: "45px" }} variant="contained">
            Sing In
          </Button>
        </div>
        <div className="Login-btm">
          Don't have an account? <a>Create an account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
