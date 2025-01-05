import React from 'react'
/* images */
import tesla from '../assets/tesla.png'
const Hero = () => {
  return (
    <div className='flex flex-col items-center p-10 py-20 gap-6 h-[660px] w-full bg-[#eef0fc]'>
      <h2 className='text-[80px]'>Find Your Dream Car</h2>
      <img src={tesla} alt="car image" className='mt-10' />
    </div>
  )
}

export default Hero