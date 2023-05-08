import React from 'react'
import StatContainer from '../components/statistic/StatContainer'

function Statistic() {
  return (
    <div className="content flex flex-col justify-center">
      <h1 className='font-black text-[80px]'>{'Statistic'}</h1>
      <StatContainer title='Word Learned' value="54" classifier='Words'/>
      <StatContainer title='Game Played' value="54" classifier='Games'/>
      <StatContainer title='Quiz Score' value="54" classifier='Percent'/>
      <StatContainer title='Day Streak' value="54" classifier='Days'/>
    </div>
  )
}

export default Statistic