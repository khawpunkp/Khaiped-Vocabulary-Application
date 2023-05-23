import React from "react";
import magnify from "../../assets/svg/navbar/Magnify.svg";

function Searchbar(props) {
  return (
    <div className={`bg-white px-4 py-1 rounded-full flex justify-between items-center ${props.isNav ? 'w-[320px]' : 'w-[500px]'}`}>
      <input
        type="text"
        placeholder="Search a word"
        className={`w-full bg-transparent pt-2 pb-1 outline-none ${props.isNav ? 'text-lg' : 'text-2xl'} placeholder-[#590070] placeholder-opacity-[0.28]`}
      />
      <button className="py-2">
        <img src={magnify} alt="Magnify Icon"/>
      </button>
    </div>
  );
}

export default Searchbar;
