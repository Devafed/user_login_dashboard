import React, { useState, useEffect } from "react";
import "../login/login.css";
import Logo from "../assets/logo-desk.png";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const loginUrl = "https://hire.zynerd.co.in/ui/user_sessions/login";
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3R1c2VyQHp5bmVyZC5jb20iLCJpYXQiOjE3MTIxMjY4ODAsImV4cCI6MTcxMjE3MDA4MH0.UfloqkYzxcq_WJClv9CNSVlvFctCV9JMLyqLKasnIUA",
  };
  const data = {
    email: value.email,
    password: value.password,
  };

  const handelChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handelClick = (e) => {
    setValue({ ...value, showPassword: !value.showPassword });
  };
  const Validation = () => {
    let error = {};
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!value.email) {
      error.email = "Email is required!";
    } else if (!regex.test(value.email)) {
      error.email = "Email address invalid!";
    }
    if (!value.password) {
      error.password = "Password is required!";
    } else if (value.password.length < 5) {
      error.password = "Password must be more than 5 characters!";
    }
    return error;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setError(Validation(value));
  };

  const fetchingData = async () => {
    try {
      let response = await axios.post(loginUrl, data, { headers: headers });
      if (response.status === 200) {
        toast.success(`Form submitted ${response.data.message}`, {
          autoClose: 3000,
        });
        localStorage.setItem("token", response.data.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      toast.warning(`${error.message}`, { autoClose: 10000 });
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (
      Object.keys(error).length === 0 &&
      value.email !== "" &&
      value.password !== ""
    ) {
      fetchingData();
    }
  }, [error]);

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://portal.zynerd.com/images/img-3.png" alt="Login" />
        </div>
        <form id="login-form" onSubmit={handelSubmit}>
          <img src={Logo} alt="logo" />
          <h1 className="form-title">Welcome back</h1>
          <p>Login to the Dashboard</p>
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              value={value.email}
              name="email"
              autoComplete="off"
              onChange={handelChange}
            />
            {error.email && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {error.email}
              </span>
            )}
          </div>
          <div className="form-control">
            <input
              type={value.showPassword ? "text" : "password"}
              placeholder="Password"
              value={value.password}
              name="password"
              autoComplete="off"
              onChange={handelChange}
            />
            <span className="eye-icons" onClick={handelClick}>
              {value.showPassword ? (
                <MdOutlineVisibility />
              ) : (
                <MdOutlineVisibilityOff />
              )}
            </span>
            {error.password && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {error.password}
              </span>
            )}
          </div>
          <div className="form-check">
            <label>
              <input
                type="checkbox"
                defaultChecked={checked}
                onChange={() => setChecked((state) => !state)}
              />
              Check Me!
            </label>
          </div>
          <button type="submit" className="login-form-button btn">
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
