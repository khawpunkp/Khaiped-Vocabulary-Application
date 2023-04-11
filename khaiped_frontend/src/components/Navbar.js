import React from "react";
import user_icon from "../assets/svg/User.svg";
import logo from "../assets/svg/Logo.svg";

function Navbar() {
  return (
    <div>
      <nav>
        <div className="bg-black">
          <img src={logo} alt="Khaiped Logo" />
        </div>
        <div className="searchbar "></div>        
        <div className="user">
          <img src={user_icon} alt="User Icon" />
        </div>
        
      </nav>
    </div>
  );
}

export default Navbar;
