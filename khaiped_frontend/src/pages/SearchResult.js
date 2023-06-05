import React, { useEffect, useState } from 'react'
import SearchWordContainer from '../components/word/SearchWordConatiner'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function SearchResult() {
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/word/search/?q=${searchQuery}`
        );
        setSearchResults(response.data.words);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    search()
  }, [searchQuery])

  if (isLoading) {
    return (
      <div className='content flex justify-center'>
        <h1 className='font-black text-[80px] text-center'>Loading...</h1>
      </div> // Show a loading state while fetching the word
    )
  }

  return (
    <div className=''>
      {searchResults ? (
        <div className="content space-y-4 mt-5 flex flex-col">
          <div className="font-black text-[80px] text-center">
            {searchResults.length} 
            {searchResults.length > 1 ? ' words' : ' word'} found
            </div>
          <div className="space-y-2">
            {searchResults.map((result) => (
              <SearchWordContainer key={result.id} wordID={result.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="content flex justify-center">
        <h1 className="font-black text-[80px] text-center">No words found.</h1>
      </div>
      )}
    </div>
  );
}

export default SearchResult