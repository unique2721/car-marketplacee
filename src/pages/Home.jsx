import React from 'react'


/* components */
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CarFilter from '../components/CarFilter'
import AdvancedFilters from '../components/AdvabcedFilters'
import Category from '../components/Category'
import Cars from '../components/Cars'
import CarDetails from '../components/CarDetails'
import Footer from './Footer'
import RegisterModal from '../components/auth/RegisterModal'

const Home = () => {
  return (
    <div>
      <Navbar/>
     {/*  <CarFilter/> */}
      <Hero/>
      <Category/>
      <Cars/>
      <Footer/>
    </div>
  )
}

export default Home