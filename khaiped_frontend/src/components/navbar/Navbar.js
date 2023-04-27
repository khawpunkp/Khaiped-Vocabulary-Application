import React from "react";
import user_icon from "../../assets/svg/navbar/User.svg";
import logo from "../../assets/svg/navbar/Logo.svg";
// import magnify from "../assets/svg/Magnify.svg";
import Searchbar from "./Searchbar";
import UserButton from "../login/UserButton";
import GuestButton from "../login/GuestButton";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const [isShown, setIsShown] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const refUserButton = useRef();

  useEffect(() => {
    let handleClickOutside = (event) => {
      if (!refUserButton.current.contains(event.target)) {
        setIsShown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  })

  return (
    <div>
      <nav className="h-[70px] bg-primary px-3 flex justify-between items-center">
        <button className="">
          <img src={logo} alt="Khaiped Logo" />
        </button>
        <div className="flex space-x-4 items-center">
          <div className="searchbar">
            <Searchbar />
          </div>
          <div ref={refUserButton}>
            <button onClick={() => setIsShown(!isShown)}  className="user rounded-full p-1 bg-white">
              <img src={user_icon} alt="User Icon" className="transform scale-[0.85]" />
            </button>
            {isShown && isLogin && <div className='absolute right-3 top-[65px]'> <UserButton /> </div>}
            {isShown && !isLogin && <div className='absolute right-3 top-[65px]'> <GuestButton /> </div>}
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;
