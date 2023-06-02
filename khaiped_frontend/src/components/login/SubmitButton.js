import React from 'react'

function SubmitButton(props) {
    const handleButtonHover = (event) => {
        event.currentTarget.style.transform = "scale(1.05)";
    };
    const handleButtonLeave = (event) => {
        event.currentTarget.style.transform = "scale(1)";
    };
    return (
        <div className='submitButton' onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}>{props.text}
        </div>
    )
}

export default SubmitButton