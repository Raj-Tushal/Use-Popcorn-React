import poster from '../assets/jai ho.jpg'
import { useEffect, useState } from 'react'
import StarRating from './Starrating';
function Right({imdbIdForRight}) {
    const [historySection, setHistorySection] = useState(true)
    const [detailsSection, setDetailsSection] = useState(false)
    const [dataFromApi, setDataFromApi] = useState({})
    const [addToListBtn,setAddToListBtn] = useState(false)
    const [userRating,setUserRating] = useState(0)
    const [watchedMoviesDetails,setWathedMoviesDetails]= useState(
      [{
        poster:poster,
        movieName:"Jai Ho",
       ImdbRating:8.8,
       starRating:5,
       duration:"140 minutes",
       imdbID:2001
      }]
    )
  

    // fucntion to add details watched history
    const handleWatchedHistory = (dataFromApi) => {
      setDetailsSection((d)=>!d);
      setHistorySection((h)=>!h);
      setWathedMoviesDetails((prevWatchedMoviesDetails) => [
        ...prevWatchedMoviesDetails,
        {
          poster: dataFromApi.Poster,
          movieName:  dataFromApi.Title,
          ImdbRating: dataFromApi.imdbRating,
          starRating:   userRating,
          duration: dataFromApi.Runtime,
          imdbID: dataFromApi.imdbID
        }
      ]); // Note: This may not reflect the update immediately
    }

    // function to set user rating from child comp
    const userRatingHandler = (ratingfromUser)=>{
       setUserRating(ratingfromUser)
    }
    
    
    // fetching api for deeetials about specific movie
    useEffect(() => {
      if (imdbIdForRight) {
        const FetchDetailsAboutMovie = async () => {
          setHistorySection(false);
          setDetailsSection(true);
          const response = await fetch(`https://www.omdbapi.com/?i=${imdbIdForRight}&apikey=215149ed`);
          const data = await response.json();
          setDataFromApi(data);
        };
        FetchDetailsAboutMovie();
      }
    }, [imdbIdForRight]);

// funtion to delete movie hisotry
const handleDeleteHistory = (imdbIdForRight) => {
  setWathedMoviesDetails((prevWatchedMoviesDetails) =>
    prevWatchedMoviesDetails.filter((movie) => movie.imdbID !== imdbIdForRight)
  );
}

const sectionToggleHandler = ()=>{
  setDetailsSection(false),
  setHistorySection(true)
}

  return (
    <div className="w-1/3 h-[95%] bg-[#2b3035] overflow-x-scroll overflow-y-scroll no-scrollbar rounded-xl
     max-sm:w-full max-sm:h-1/2">
    {/* right-container or History Section*/}
   {historySection && ( <div>

      {/* top status bar */}
      <div className="w-full h-24 bg-[#293234] flex flex-col items-start justify-center p-10 gap-2 ">

        {/* note */}
        <h1 className="text-white font-bold text-l">MOVIES YOU WATCHED</h1>

        {/* details */}
        <div className="flex gap-10 text-white">
          <p>#️⃣{watchedMoviesDetails.length} movies</p>
          <p>⭐️0.0</p>
          <p>🌟0.0</p>
          <p>⏳0 min</p>
        </div>
      </div>

      {/* Movies cart */}
      <div className='w-full h-full'>
        {/* movie div */}
       {watchedMoviesDetails.map((movie,index) => (
          <div key={index} className="w-full h-24  flex pl-2  items-center gap-4 border border-gray-700 border-t-1 border-b-1">
          {/* img */}
          <div className="w-20 h-full   flex items-center justify-center">
            <img src={movie.poster} alt="" className="h-[80%] w-16 rounded-md" />
          </div>

          {/* details */}
          <div className=" h-full w-full flex flex-col items-start justify-center gap-1  ">
           <div className='flex justify-between w-full pr-8'>
           <h1 className="text-white font-bold text-xl text-start">
              {movie.movieName}
            </h1>
            <p className='text-xl cursor-pointer'
               onClick={() => handleDeleteHistory(movie.imdbID)}>❌
            </p>
           </div>
            <div className="flex    gap-12 text-white">
              <p>⭐️{  movie.ImdbRating}</p>
              <p>🌟 {  movie.starRating}</p>
              <p>⏳{  movie.duration}</p>
            </div>
          </div>
        </div>
       ))}
      </div>
    </div>)}
      
      {/* Detail About Indivisual Movie */}
      {detailsSection && (
        <div className='w-full h-full px-2 py-1 bg-[#1b2021] flex flex-col no-scrollbar items-center gap-7 border border-gray-700 border-t-1 border-b-1'
        >
          {/* top */}                  
      <div
       className='w-full h-48 relative bg-[#293234]  flex items-center
        gap-7 text-center justify-center px-2 rounded-xl'>
        {/* img */}
      <div className='w-52 h-full   flex items-center justify-center'>
       <img src={dataFromApi?.Poster} alt="" className='h-[90%] w-full rounded-md' />
       </div>

       {/* details */}
       <div className=' h-full w-full flex flex-col  items-start justify-center gap-3  '>
         <h1 className='text-white font-bold text-2xl text-start' >{dataFromApi?.Title}</h1>
         <p className='text-[#adb5bd]'>{dataFromApi?.Released} • {dataFromApi?.Runtime}</p>
         <p className='text-[#adb5bd]'>{dataFromApi?.Genre}</p>
         <p className='text-[#adb5bd]'>⭐{dataFromApi?.imdbRating} IMDb rating</p>
       </div>

      {/* backward btn */}
       <div
      className='absolute z-20 right-4 top-2 text-black text-2xl cursor-pointer'
      onClick={sectionToggleHandler}>
        {<i class="fa-solid fa-backward"></i>}
        </div>
      </div>

      {/* bottom */}
      <div className='w-full h-[80%]   flex gap-2 flex-col items-center justify-between py-2 '>
            {/* star⭐-bar */}
            <div
             className='w-[90%] h-16 bg-[#293234] flex rounded-xl
              flex-col items-center justify-center gap-2 py-12'>
          
            <StarRating giveMeRating={userRatingHandler}
            setAddToListBtn={setAddToListBtn} addToListBtn={addToListBtn}/>

          {addToListBtn && (
              <button
              onClick={() => handleWatchedHistory(dataFromApi)}
               className='w-[80%] bg-[#7950f2] text-white rounded-2xl py-1'
               >
                + Add to List
              </button>
          )}
            </div>

            {/* details */}
            <div
             className='w-[90%] flex text-white  flex-col
              gap-4 h-[80%]  p-4'>

              {/* plot */}
             <i className='text-white text-start text-balance'>
              {dataFromApi?.Plot}
             </i>
             
             {/* cast and crew */}
             <p className='text-white text-start text-balance '>
             Actors: {dataFromApi?.Actors}
             </p>

             {/* Director */}
             <p>
               Directed by: {dataFromApi?.Director}
             </p>
            </div>
      </div>
</div>
      )}

    </div>
  )
}

export default Right