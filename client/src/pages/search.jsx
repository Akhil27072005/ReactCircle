import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/searchBar";
import Header from "../components/header_logged_in";
import Searching from "../assets/searching.png";
import SideCover from "../assets/sidecover.jpeg";
import DefaultProfile from "../assets/default_profile.png";
import "../styles/search.css";

const Search = () => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleResultClick = () => {
    if (result?.id) navigate(`/profile/${result.id}`);
  };

  return (
    <div className="search-page">
      <Header title="Find My Friends" className="header" />

      <div className="search-content">
        <img src={SideCover} alt="Side Filler" className="side-img" />

        <div className="middle">
          <div className="search-bar-wrapper">
            <SearchBar onSearchResult={setResult} />
          </div>

          {result ? (
            <div className="search-result-box" onClick={handleResultClick}>
              <img
                src={
                  result.profilePic
                    ? `${result.profilePic}`
                    : DefaultProfile
                }
                alt="profile"
                className="search-result-pic"
              />
              <div className="search-result-text">
                <strong>{result.profile_name}</strong>
                <div className="text-muted">@{result.username}</div>
              </div>
            </div>
          ) : (

          
            <div className="middle-img-wrapper">
              <img
                src={Searching}
                alt="Search Illustration"
                className="middle-img"
              />
            </div>
          )}
        </div>

        <img src={SideCover} alt="Side Filler" className="side-img" />
      </div>
    </div>
  );
};

export default Search;
