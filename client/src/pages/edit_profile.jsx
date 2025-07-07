import Header from "../components/header_logged_in";
import EditProfile from "../components/editProfile";
import "../styles/edit_profile.css";


const EditPostPage = () => {
  return (
    <div>
      <Header title="Edit Profile" />

      <div>
          <EditProfile/>
      </div>
    </div>
  );
};

export default EditPostPage;