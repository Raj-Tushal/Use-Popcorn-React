import './Navbar.css'
import { useEffect, useState } from 'react'
import useSWR from 'swr';
import Left from './Left.jsx';
import Right from './Right.jsx';


const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Content({userSearchfromContent,sendLengthToNavbar}) {
  const [noOfMovies, setNoOfMovies] = useState(0)
  const [imdbIdToSend, setImdbIdToSend] = useState('')

    const {
        data,
        error,
        isValidating,
      } = useSWR('https://www.omdbapi.com/?s=' + userSearchfromContent + '&apikey=215149ed', fetcher);

        // funtion to handle length of list of movies
        useEffect(() => {
          if (data && data.Search) {
            const moviesLength = data.Search.length;
            setNoOfMovies(moviesLength);
            sendLengthToNavbar(noOfMovies);
          } else {
            setNoOfMovies(0);
            sendLengthToNavbar(0);
          }
        }, [data, sendLengthToNavbar,noOfMovies]);
      
        // function to handle imdb id from left comp
const imdbIdHandler = (ImdbFromLeft) => {
  setImdbIdToSend(ImdbFromLeft)
}


  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  // if (isValidating) return <div className="Loading">Loading...</div>;

console.log(userSearchfromContent,'-->me content comp se araha hun')

  return (
    <>
      <div className="w-full h-full bg-[#1b2021] flex justify-center items-start pt-7 gap-4
      max-sm:flex-col ">
        {/* left */}
        <Left data={data} imdbIdToSendHandler={imdbIdHandler}
        isValidating={isValidating} />
        {/* right */}
        <Right imdbIdForRight={imdbIdToSend} />
      </div>
    </>
  );
}

export default Content;