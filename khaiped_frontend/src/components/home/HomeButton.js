import React from "react";

function HomeButton(props) {
    return (
        <button
            className="w-[420px] h-[100px] bg-cover bg-center p-4 pl-36 flex items-center"
            style={{
                backgroundImage: `url(${props.buttonImg})`
            }}        >
            <div className="text-left">
                <h2 className="text-3xl font-black">{props.title}</h2>
                <p className="text-sm">{props.description}</p>
            </div>
        </button>
    );
}

export default HomeButton;
