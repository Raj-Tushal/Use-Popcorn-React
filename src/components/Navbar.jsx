import logo from '../assets/popcornLogo.png'
import { useState } from 'react'
function Navbar({sendDataToApp,MoviesListLnegth}) {
    const [searchFromUser, setSearchFromUser] = useState('')

    const handleDataFromUser = () => {
         sendDataToApp(searchFromUser) 
      
    }
  return (
    <>
      <nav className="w-full h-16 bg-[#6741d9] flex justify-between items-center px-9
      max-sm:px-4 max-sm:py-2 max-sm:relative max-sm:h-28 max-sm:flex max-sm:items-start
      max-sm:p-2 max-sm:text-center  ">
        <div className="flex items-center  h-full
        max-sm:flex max-sm:items-start">
          <img src={logo} alt="" className="w-9 h-9 mr-2" />
          <h1 className="text-white font-bold text-2xl
          max-sm:text-sm max-sm:hidden ">Use Popcorn</h1>
        </div>

        {/* input */}
        <div className=" flex justify-center gap-6 w-[40%] h-full py-2 font-semibold
        max-sm:absolute max-sm:bottom-0 max-sm:left-0 max-sm:px-3 max-sm:w-full top-14 max-sm:h-[50%]">
          <input
            type="text"
            className="bg-[#7950f2] py-3 w-[80%] text-[#adb5bd] border-none text-xl text-start px-5 rounded-2xl"
            placeholder="Search Movie"
            value={searchFromUser}
            onChange={(e) => setSearchFromUser(e.target.value)}
          />
          <button onClick={handleDataFromUser} className="bg-[#7950f2] text-[#adb5bd] px-8 rounded-2xl font-bold">
            {<i class="fa-solid fa-magnifying-glass"></i>}
          </button>
        </div>

        <p className="text-[#adb5bd] font-bold text-xl
        max-sm:text-sm">Found {MoviesListLnegth} results</p>
      </nav>
    </>
  );
}

export default Navbar