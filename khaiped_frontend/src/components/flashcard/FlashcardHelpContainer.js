import React from 'react'
import happy from "../../assets/svg/flashcard/happy.svg"
import mad from "../../assets/svg/flashcard/mad.svg"

function FlashcardHelpContainer() {
    return (
        <div className='w-[650px] h-[250px] bg-wordContainer rounded-[40px] border-4 border-black flex items-center justify-center'>
                <ul class=" list-inside text-3xl font-black space-y-5">
                    <li>
                        Click flashcard to filp card
                    </li>
                    <li>
                        <div className="flex flex-row items-center space-x-2">
                            <p className="">{"Click"}</p>
                            <img src={happy} alt='' style={{ width: '50px', height: '50px' }}/>
                            <p className="">{"if you guess word correctly"}</p>
                        </div>
                    </li>
                    <li>
                    <div className="flex flex-row items-center space-x-2">
                            <p className="">{"Click"}</p>
                            <img src={mad} alt='' style={{ width: '50px', height: '50px' }}/>
                            <p className="">{"if you didn’t"}</p>
                        </div>
                    </li>
                </ul>

        </div>
    )
}
export default FlashcardHelpContainer