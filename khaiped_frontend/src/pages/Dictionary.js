import React from 'react'
import Searchbar from '../components/navbar/Searchbar'
import SearchWordConatiner from '../components/word/SearchWordConatiner'

function Dictionary() {
  return (
    <div className='content flex flex-col justify-center'>
    <div className="text-[128px] font-bold">
    Dictionary
    </div>    
    <Searchbar isNav = {false}/>
    <SearchWordConatiner/>
    </div>
  )
}

export default Dictionary