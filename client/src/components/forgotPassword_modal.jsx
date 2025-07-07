import React, { useState } from "react";
import api from "../services/api";

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    console.log("HandleSubmit called");
    e.preventDefault();

    try {
      const res = await api.post("auth/forgot-password", {email,});
      console.log("OK");
      setMessage("Reset link sent to your email.");
      setEmail("");
    } catch (err) {
        console.log("NO");    
        setMessage("Error sending reset link.");
        setEmail("");
    }
  };

  return (
    <div
      className="modal fade"
      id="forgotPasswordModal"
      tabIndex="-1"
      aria-labelledby="forgotPasswordModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="forgotPasswordModalLabel" style={{fontFamily:"Montserrat"}}>
              Reset Your Password
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="email"
                className="form-control"
                style={{fontFamily:"Montserrat"}}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {message && (
                <div className="mt-2 text-info">{message}</div>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" style={{fontFamily:"Montserrat"}}>
                Send Reset Link
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
