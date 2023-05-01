import React from 'react'

function StatContainer(props) {
  return (
    <div className='h-[100px] flex items-center space-x-5'>
        <div className="w-[380px] font-black text-left text-[48px]">{props.title}</div>
        <div className="border-x border-black h-full" />
        <div className="w-[180px] font-black text-right text-[48px]">{props.value}</div>
        <div className="w-[210px] font-black text-left text-[48px]">{props.classifier}</div>
    </div>
  )
}

export default StatContainer