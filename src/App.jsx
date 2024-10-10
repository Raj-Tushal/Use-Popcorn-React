import './App.css'
import Content from './components/Content.jsx'
import Navbar from './components/Navbar.jsx'
import { useState } from 'react'


function App() {
  const [userSearchfromContent, setUserSearchfromContent] = useState('')
  const [noOfMovies, setNoOfMovies] = useState(0)

  // funtion to handle data from navbar
  const handleDataFromNavbar = (searchFromUser) => {
    setUserSearchfromContent(searchFromUser)
}

// funtion to hangle length of list of movies
const handleNoOfMovies = (num) => {
  setNoOfMovies(num);
  console.log(noOfMovies);
};


// console.log(userSearchfromContent,"==>userSearchfromContent")

  return (
    <section className='w-full h-screen bg-[#2b3035]'>
      {/* navbar */}
      <Navbar sendDataToApp={handleDataFromNavbar} MoviesListLnegth={noOfMovies} />

      {/* content */}
      <Content userSearchfromContent={userSearchfromContent} sendLengthToNavbar={handleNoOfMovies}  />
    </section>
  )
}

export default App
