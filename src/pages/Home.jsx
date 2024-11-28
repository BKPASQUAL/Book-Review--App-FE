import React from 'react'
import LandingPage from '../components/home/LandingPage'
import LatestBooks from '../components/home/LatestBooks'

function Home() {
  return (
    <div className='home-page-con'>
      <LandingPage/>
      <LatestBooks/>
    </div>
  )
}

export default Home
