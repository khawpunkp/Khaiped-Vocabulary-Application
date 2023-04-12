import React from "react";
import magnify from "../assets/svg/Magnify.svg";

function Searchbar() {
  return (
    <div className="bg-white px-4 py-2 rounded-full flex justify-between items-center">
      <input
        type="text"
        placeholder="Search a word"
        className="w-full bg-transparent outline-none text-lg font-bold placeholder-[#590070] placeholder-opacity-[0.28]"
      />
      <button className="">
        <img src={magnify} alt="Magnify Icon"/>
      </button>
    </div>
  );
}

export default Searchbar;
