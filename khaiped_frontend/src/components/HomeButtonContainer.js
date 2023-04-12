import React from "react";
import randomButton from "../assets/svg/ButtonRandomEmpty.svg";
import HomeButton from './HomeButton'

function HomeButtonContainer(){
    return(
        <div>
            <div className="RandomButton">
                <HomeButton buttonImg = {randomButton} title = "Random Word" description = "New word you have never learn"/>
            </div>
        </div>
    )
}

export default HomeButtonContainer;