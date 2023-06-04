import React from "react";
import HomeButtonContainer from '../components/home/HomeButtonContainer'
import HelpButton from "../components/home/HelpButton";

function Home() {
    return (
        <div className="content flex justify-center space-y-5">
            <HomeButtonContainer />
            <div className="fixed right-5 top-28 z-40">
                <HelpButton home={true}/>
            </div>
        </div>
    )
}

export default Home