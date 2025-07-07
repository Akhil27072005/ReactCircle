import { LoginForm } from "../components/LoginForm";
import logo from "../assets/logo.png";
import logincover from "../assets/logincover.jpg";

export default function LoginPage() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left: Logo + Form */}
        <div className="col-lg-6 d-flex flex-column p-4">
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" height="45" width="45" className="me-2" />
            <h4 className="mb-0" style={{ fontFamily: "poppins" }}>React</h4>
          </div>
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <LoginForm />
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
}
