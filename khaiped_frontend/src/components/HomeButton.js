import React from "react";

    function HomeButton(props) {
        return (
            <div>
                <div className="ButtonImg">
                    <img src={props.buttonImg} alt="Button"/>
                </div>
                <div className="Title">
                    {props.title}
                </div>
                <div className="Description">
                    {props.description}
                </div>
            </div>
        )
    }

export default HomeButton;