import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function StatContainer(props) {
  const navigate = useNavigate();

  return (
    <div className='h-[100px] flex items-center space-x-5'>
      <div className="w-[380px] font-black text-left text-[48px]">{props.title}</div>
      <div className="border-x border-black h-full" />
      <div className="w-[180px] font-black text-right text-[48px]">{props.value}</div>
      <div className="w-[210px] font-black text-left text-[48px]">{props.classifier}</div>
      {props.learned && <button className='text-left' onClick={() => navigate('/wordLearned')}>
        <FontAwesomeIcon icon={faEye} style={{ fontSize: "30px" }} />
      </button>}
    </div>
  )
}

export default StatContainer