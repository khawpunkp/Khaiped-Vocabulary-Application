import {React, useEffect, useState} from "react";
import magnify from "../../assets/svg/navbar/Magnify.svg";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';

function Searchbar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchPage = "w-full bg-transparent pt-2 pb-1 outline-none text-2xl placeholder-[#590070] placeholder-opacity-30"

  const submitSearch = () => {
    navigate(`/search/${searchQuery}`);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };

  useEffect(() => {
    setSearchQuery(""); // Reset searchQuery on route change
  }, [location]);

  return (
    <div className={`bg-white px-4 py-1 rounded-full flex justify-between items-center ${props.isNav ? 'w-[320px]' : 'w-[500px] h-[60px]'}`}>
      <input
        type="text"
        placeholder="Search a word"
        className={` ${props.isNav ? 'inputText' : searchPage} `}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button className="py-2" onClick={submitSearch}>
        <img src={magnify} alt="Magnify Icon"/>
      </button>
    </div>
  );
}

export default Searchbar;
