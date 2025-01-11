import React from 'react'
import { useState } from 'react'

/* components */
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CarFilter from '../components/CarFilter'
import Category from '../components/Category'
import Cars from '../components/Cars'
import Footer from './Footer'
import RegisterModal from '../components/auth/RegisterModal'
import CarCard from '../components/CarCard'
import CarGrid from '../components/CarGrid'
import CarDetails from '../components/CarDetails'
import { mockListings } from '../Data/mockData';


const Home = () => {
  const [selectedListing, setSelectedListing] = useState(null);

const handleViewDetails = (id) => {
  setSelectedListing(id);
};

const selectedCar = mockListings.find((listing) => listing.id === selectedListing);

  return (
    <div>
      <Navbar/>
     {/*  <CarFilter/> */}
      <Hero/>
      <Category/>
      <CarGrid 
            listings={mockListings}
            itemsPerPage={6}
            onViewDetails={handleViewDetails}
          />
           {selectedCar && (
            <CarDetails
              listing={selectedCar}
              onClose={() => setSelectedListing(null)}
            />
          )}
      
      <Cars/>
      <Footer/>
    </div>
  )
}

export default Home