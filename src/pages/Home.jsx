import React from 'react'
import LandingPage from '../components/home/LandingPage'
import LatestBooks from '../components/home/LatestBooks'
import Footer from '../components/common/Footer'

function Home() {
  return (
    <>
    <div className='home-page-con'>
      <LandingPage/>
      <LatestBooks/>
    </div>
    <Footer/>

    </>
    
  )
}

export default Home
