import React from 'react'
import Searchbar from '../components/navbar/Searchbar'

function Dictionary() {
  return (
    <div className='content flex flex-col justify-center'>
      <div className="text-[128px] font-bold">
        Dictionary
      </div>
      <Searchbar isNav={false} />
    </div>
  )
}

export default Dictionary