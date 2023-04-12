import React from "react";
import user_icon from "../assets/svg/User.svg";
import logo from "../assets/svg/Logo.svg";
// import magnify from "../assets/svg/Magnify.svg";
import Searchbar from "./Searchbar";

function Navbar() {
  return (
    <div>
      <nav className="h-16 bg-primary px-3 flex justify-between items-center">
        <button className="">
          <img src={logo} alt="Khaiped Logo" />
        </button>
        <div className="flex space-x-4 items-center">
          <div className="searchbar">
            <Searchbar />
          </div>        
          <button className="user rounded-full p-1 bg-white">
            <img src={user_icon} alt="User Icon" className="transform scale-[0.85]"/>
          </button>
        </div>  
      </nav>
    </div>
  );
}

export default Navbar;
