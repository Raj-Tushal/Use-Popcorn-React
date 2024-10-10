import load from '../assets/load.gif'
function Left({data,imdbIdToSendHandler,isValidating}) {

  // function to get specific id movie from list
  const imdbIdHandler = (specificImdb) => {
    const foundMovie = data?.Search?.find((movie) => specificImdb === movie.imdbID);
    if (foundMovie) {
      imdbIdToSendHandler(foundMovie.imdbID);
console.log(foundMovie.imdbID)
    }
  }
  return (
    <>
       <div className='w-1/3 h-[95%] bg-[#2b3035]  overflow-x-scroll
        overflow-y-scroll no-scrollbar rounded-xl relative max-sm:w-full max-sm:h-1/2
        max-sm:px-2'>

       {/* <div className="Loading">Loading...</div> */}

       {isValidating && (
    <div className="Loading absolute z-20 left top-1/3 left-1/3 w-full h-full ">
        <img id='' className=" size-28" src={load} alt="" />
    </div>
)}

               {/* filmlist */}
               {data?.Search?.map((movie,index) => (

<div
 className='w-full h-24 px-2 bg-[#24292c] flex no-scrollbar
  items-center gap-2 border border-gray-700 border-t-1 border-b-1
  cursor-pointer'
 onClick={() => imdbIdHandler(movie.imdbID)}
 key={index}>

{/* img */}
<div className='w-20 h-full  flex items-center justify-center'>
<img src={movie.Poster} alt="" className='h-[80%] w-16 rounded-md' />
</div>

{/* title and year */}
<div className=' h-full w-full flex flex-col items-start justify-center gap-2  '>
  <h1 className='text-white font-bold text-md text-start' >{movie.Title}</h1>
  <p className='text-white'>📅{movie.Year}</p>
</div>
</div>
))}
               
            </div>
    </>
  )
}

export default Left