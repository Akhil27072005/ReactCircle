import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OAuthSuccess = () => {
  const { accessToken, refreshToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setTimeout(2000);
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [accessToken, refreshToken, navigate]);

  return <div>Logging you in via Google...</div>;
};

export default OAuthSuccess;
