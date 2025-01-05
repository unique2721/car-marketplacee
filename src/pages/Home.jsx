import React from 'react'


/* components */
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CarFilter from '../components/CarFilter'
import Category from '../components/Category'
import Cars from '../components/Cars'
import Footer from './Footer'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <CarFilter/>
      <Hero/>
      <Category/>
      <Cars/>
      <Footer/>
    </div>
  )
}

export default Home