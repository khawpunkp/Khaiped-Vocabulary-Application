import React from 'react'

function QuizHelpContainer() {
    return (
        <div className='w-[700px] h-[250px] bg-wordContainer rounded-[40px] border-4 border-black flex items-center justify-center'>
            <ul class=" list-inside text-3xl font-black space-y-7">
                <li>
                    Select a choice that match the question
                </li>
                <li>
                    +100 points when complete
                </li>
                <li>
                    +50 bonus points for each score you get
                </li>
            </ul>

        </div>
    )
}

export default QuizHelpContainer