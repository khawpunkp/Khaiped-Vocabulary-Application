import React from "react";
import closeButton from "../../assets/svg/mainWordContainer/Close.svg"
import refreshButton from "../../assets/svg/mainWordContainer/Refresh.svg"
import soundButton from "../../assets/svg/mainWordContainer/Sound.svg"

function MainWordContainer(props) {
    const handleClose = () => {
        props.onClose(false);
    };
    return (
        <div className="relative w-[580px] h-[580px] bg-wordContainer rounded-[40px] border-4 border-black flex flex-col items-center">
            <h1 className="h-[100px] px-[55px] text-[64px] font-bold absolute top-[25%]">Authentication</h1>
            <p className="h-[100px] px-[55px] font-bold absolute top-[40%]">(Noun)</p>
            <h2 className="thai text-2xl font-bold px-[55px] absolute top-[50%]">การรับรองความถูกต้อง</h2>
            <h2 className="text-2xl font-bold px-[55px] text-center absolute top-[65%]">the act of proving that something is real, true or what somebody claims it is</h2>
            <button className="close h-[37px] w-[37px] absolute top-[20px] right-[20px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${closeButton})`
                }}
                onClick={() => handleClose()}
            ></button>
            <button className="sound h-[37px] w-[37px] absolute bottom-[20px] left-[20px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${soundButton})`
                }}></button>
            <button className="refresh h-[37px] w-[37px] absolute bottom-[20px] right-[20px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${refreshButton})`
                }}></button>
        </div>
    )
}

export default MainWordContainer;