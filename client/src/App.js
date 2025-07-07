import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile"; 
import SearchPage from "./pages/search";
import HomePage from "./pages/home";
import CreatePost from "./pages/create_post";
import EditPost from "./pages/edit_post";
import EditProfile from "./pages/edit_profile";
import ViewPost from "./pages/view_post";
import ResetPassword from "./pages/reset_password";
import OAuthSuccess from "./pages/oAuth_success"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/new-post" element={<CreatePost/>}/>
        <Route path="/edit-post/:id" element={<EditPost/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
        <Route path="/view-post/:id" element={<ViewPost />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/oauth-success/:accessToken/:refreshToken" element={<OAuthSuccess />} />

      </Routes>
    </Router>
  );
}

export default App;
