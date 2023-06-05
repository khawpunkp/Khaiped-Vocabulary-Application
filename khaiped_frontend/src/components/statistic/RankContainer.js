import { React } from 'react'

function RankContainer(props) {
    const borderColor = props.currentUser ? 'border-primary' : (props.rank === '1st' ? 'border-yellow-400' : props.rank === '2nd' ? 'border-gray-400' : props.rank === '3rd' ? 'border-yellow-600' : 'border-black')
    const textColor = props.rank === '1st' ? 'text-yellow-400' : props.rank === '2nd' ? 'text-gray-400' : props.rank === '3rd' ? 'text-yellow-600' : ''
    return (
        <div className={`border-y-2 ${borderColor} w-fit`}>
            <div className=''>
                <div className="flex flex-row items-center py-2 space-x-5">
                    <h1 className={`w-[200px] thai text-5xl font-bold text-left ${textColor}`}>{props.rank}</h1>
                    <h2 className="w-[380px] thai text-5xl font-bold text-left">{props.username}</h2>
                    <h2 className="w-[250px] thai text-5xl font-bold text-right">{props.score}</h2>
                    <h2 className="w-[200px] thai text-2xl font-bold text-right">points</h2>
                </div>
            </div>
        </div>
    )
}
export default RankContainer


