import React from 'react'
import Searchbar from '../components/navbar/Searchbar'
// import SearchWordConatiner from '../components/word/SearchWordConatiner'
// import SearchResult from './SearchResult'

function Dictionary() {
  // const [searchResults, setSearchResults] = useState([]);
  return (
    <div className='content flex flex-col justify-center'>
    <div className="text-[128px] font-bold">
    Dictionary
    </div>    
    <Searchbar isNav = {false}/>
    {/* <SearchResult results = {searchResults}/> */}
    </div>
  )
}

export default Dictionary