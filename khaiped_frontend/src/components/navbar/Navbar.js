import React from "react";
import logo from "../../assets/svg/navbar/Logo.svg";
// import magnify from "../assets/svg/Magnify.svg";
import Searchbar from "./Searchbar";
import UserButton from "../login/UserButton";
import GuestButton from "../login/GuestButton";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';

function Navbar() {
  const [isShown, setIsShown] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const refUserButton = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/`, { withCredentials: true })
      .then(response => {
        setIsLogin(true);
        console.log(response);
      })
      .catch(error => {
        setIsLogin(false);
        console.log(error);
      });
  }, [isShown]);  

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
        <button onClick={() => navigate("/")} className="">
          <img src={logo} alt="Khaiped Logo" />
        </button>
        <div className="flex space-x-4 items-center">
          <div className="searchbar">
            <Searchbar isNav = {true}/>
          </div>
          <div ref={refUserButton}>
            <button onClick={() => setIsShown(!isShown)} className="user rounded-full p-1 bg-white w-[48px] h-[48px]">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: "27px" }} />
            </button>
            {isShown && isLogin && <div className='absolute right-3 top-[65px]'> <UserButton onClose={() => setIsShown(false)} /> </div>}
            {isShown && !isLogin && <div className='absolute right-3 top-[65px]'> <GuestButton onClose={() => setIsShown(false)} /> </div>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
