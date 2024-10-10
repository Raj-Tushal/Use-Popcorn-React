import { useState } from 'react';

function StarRating({ maxStars = 10,giveMeRating,setAddToListBtn,addToListBtn }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const handleMouseEnter = (rating) => setHoveredStar(rating);
  const handleMouseLeave = () => setHoveredStar(0);

//   function to handle clicking on stars
  const handleClick = (rating) =>{
     setSelectedStar(rating);
    //  console.log(rating,"-->s stars")
    giveMeRating(rating)
    setAddToListBtn(true)
  }

  return (
    <div className="flex w-full px-2 items-center space-x-1 text-yellow-400">
      {/* Create stars based on the maxStars prop */}
      {[...Array(maxStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <svg
            key={starNumber}
            className={`w-8 h-8 cursor-pointer ${
              (hoveredStar >= starNumber || selectedStar >= starNumber)
                ? 'text-yellow-400'
                : 'text-gray-400'
            }`}
            onMouseEnter={() => handleMouseEnter(starNumber)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starNumber)}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.375 2.453a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118l-3.375-2.453a1 1 0 00-1.175 0l-3.375 2.453c-.784.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.213 9.374c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.947z" />
          </svg>
        );
      })}
      <span className="ml-2 text-white">{hoveredStar || selectedStar}</span>
    </div>
  );
}

export default StarRating;
