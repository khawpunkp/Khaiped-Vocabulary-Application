import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomeHelpContainer() {
    const navigate = useNavigate();
    return (
        <div className='w-[600px] h-[250px] bg-wordContainer rounded-[40px] border-4 border-black flex items-center justify-center'>
                <ul class=" list-inside text-3xl font-black space-y-2">
                    <li>
                        <div className="flex flex-row space-x-2">
                            <p className="">{"Learn words through"}</p>
                            <button className="text-primary" onClick={() => navigate('/flashcard')}>Flashcard</button>
                        </div>
                    </li>
                    <li>Gain scores by:
                        <ul class=" list-inside pl-12 space-y-2">
                            <li>
                                <div className="flex flex-row space-x-2">
                                    <p className="">{"- Playing"}</p>
                                    <button className="text-primary" onClick={() => navigate('/game')}>Game</button>
                                </div>
                            </li>
                            <li>
                            <div className="flex flex-row space-x-2">
                            <p className="">{"- Taking"}</p>
                            <button className="text-primary" onClick={() => navigate('/quiz')}>Quiz</button>
                        </div>
                                </li>
                            <li>- Doing Daily Quest</li>
                        </ul>
                    </li>
                </ul>

        </div>
    )
}
export default HomeHelpContainer