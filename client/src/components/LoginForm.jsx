import React, {useState} from "react";
import api from "../services/api";
import ForgotPasswordModal from "./forgotPassword_modal";

export function LoginForm({className = "", ...props}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSumbit = async(e) => {
        e.preventDefault();

        try{
            const res = await api.post("/auth/login",{email,password});

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            window.location.href = "/profile";
        }
        catch(err){
            setError(err.response?.data?.message || "Login Failed! Please try again");
        }
    };


    return(
        <>
        <form className = {`container mt-5 ${className}`} onSubmit={handleSumbit} {...props}>
            
            <div className="text-centre mb-4">
                <h1 className="h3 mb-2 font-weight-bold" style={{fontFamily:"poppins"}}>Login to your account</h1>
                <p className="text-muted" style={{fontFamily:"montserrat"}}>Enter your email to login to your account</p>
            </div>

            {error && (
                <div className="alert alert-danger text-center py-2">{error}</div>
            )}

            <div className="mb-3">
                <label className="form-label" style={{fontFamily:"montserrat"}}>Email</label>
                <input type="text" className="form-control" id="email" placeholder="abc@email.com" required style={{fontFamily:"montserrat"}} value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label" style={{fontFamily:"montserrat"}}>Password</label>
                    <button className="btn btn-link" style={{color:"black", fontFamily:"montserrat",fontSize:"13px", paddingRight:"0px"}} data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Forgot Password?</button>
                </div>
                <input type="password" className="form-control" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            
            <button className="btn btn-primary w-100 mb-3" style={{fontFamily:"montserrat"}}>Login</button>


            <div className="text-center position-relative my-3">
                <hr />
                <span
                className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted" style={{ fontSize: "0.9rem" ,fontFamily:"montserrat"}}>
                Or continue with
                </span>
            </div>

            <button
                type="button"
                className="btn btn-outline-dark w-100 mb-3"
                onClick={() => {window.location.href = "http://localhost:5000/api/auth/google";}}>
                <i className="bi bi-google me-2"></i>
                <b>Login with Google</b>
            </button>


            <div className="text-center text-sm">
                Don't have an account? {" "}
                <a href="/register" className="text-decoration-underline" style={{color:"black", fontFamily:"montserrat" ,fontSize:"14px"}}>Sign Up</a>
            </div>
        </form>
        <ForgotPasswordModal/>
        </>
    );
}