import React, {useState} from "react";
import api from "../services/api";

export function RegisterForm({className = "", ...props}){

    const [username, setName] = useState("");
    const [profileID, setProfileID] = useState("");
    const [email, SetEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSumbit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        try{
            const res = await api.post("/auth/register" , {username, profileID, email, password});

            setSuccess(res.data.message);
            setTimeout(()=>{
                window.location.href="/login";
            },2000);
        }
        catch(err){
            setError(err.response?.data?.message || "Registration Failed");
        }
    };

    return(
        <form className = {`container mt-5 ${className}`} onSubmit={handleSumbit} {...props}>
            
            <div className="text-centre mb-4">
                <h1 className="h3 mb-2 font-weight-bold" style={{fontFamily:"poppins"}}>Create an account</h1>
            </div>

            {error && (
                <div className="alert alert-danger text-center py-2">{error}</div>
            )}
                {success && (
                <div className="alert alert-success text-center py-2">{success}</div>
            )}


            <div className="mb-3">
                <label className="form-label" style={{fontFamily:"montserrat"}}>Name</label>
                <input type="text" className="form-control" placeholder="Your name" id="name" value={username} onChange={(e)=>setName(e.target.value)} required style={{fontFamily:"montserrat"}}/>
            </div>

            <div className="mb-3">
                <label className="form-label" style={{fontFamily:"montserrat"}}>Profile Id</label>
                <input type="text" className="form-control" placeholder="User id that other users will see" id="user" value={profileID} onChange={(e)=>setProfileID(e.target.value)} required style={{fontFamily:"montserrat"}}/>
            </div>

            <div className="mb-3">
                <label className="form-label" style={{fontFamily:"montserrat"}}>Email</label>
                <input type="text" className="form-control" placeholder="abc@email.com" id="email" value={email} onChange={(e)=>SetEmail(e.target.value)} required style={{fontFamily:"montserrat"}}/>
            </div>
            
            <div className="mb-3">
                <label className="form-label" style={{fontFamily:"montserrat"}}>Password</label>
                <input type="password" className="form-control" placeholder="6-14 characters minimum" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>

            <button className="btn btn-primary w-100 mb-3" style={{fontFamily:"montserrat"}}>Sign Up</button>


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
                <b>Sign Up with Google</b>
            </button>

            <div className="text-center text-sm">
                Already have an account? {" "}
                <a href="/login" className="text-decoration-underline" style={{color:"black", fontFamily:"montserrat" ,fontSize:"14px"}}>Sign In</a>
            </div>

        </form>
    );
}