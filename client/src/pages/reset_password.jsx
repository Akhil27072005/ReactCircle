import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import logincover from "../assets/logincover.jpg";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reactcircle.onrender.com/api/auth/reset-password", {
        token,
        newPassword,
      });
      setMessage("✅ Password updated! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage("❌ Error: Invalid or expired link.");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left: Logo + Reset Form */}
        <div className="col-lg-6 d-flex flex-column p-4">
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" height="45" width="45" className="me-2" />
            <h4 className="mb-0" style={{ fontFamily: "poppins" }}>React</h4>
          </div>
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <h3 className="text-center mb-4">Reset Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Reset Password
                </button>
              </form>
              {message && (
                <div className="alert alert-info mt-3 text-center">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Image (hidden on small screens) */}
        <div className="col-lg-6 d-none d-lg-flex flex-column p-0">
          <img
            src={logincover}
            alt="Login side visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover", maxHeight: "100vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
