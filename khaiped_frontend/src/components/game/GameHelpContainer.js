import React from 'react'

function GameHelpContainer() {
    return (
        <div className='w-[650px] h-[250px] bg-wordContainer rounded-[40px] border-4 border-black flex items-center justify-center'>
            <ul class=" list-inside text-3xl font-black space-y-7">
                <li>
                    Type your guess then click SUBMIT
                </li>
                <li>
                    +50 points when complete
                </li>
                <li>
                    +50 bonus points if correct in first try
                </li>
            </ul>

        </div>
    )
}
export default GameHelpContainer