import React from "react";
import { useState } from "react";

/* components */
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CarFilter from "../components/CarFilter";
import Category from "../components/Category";
import Cars from "../components/Cars";
import Footer from "./Footer";
import RegisterModal from "../components/auth/RegisterModal";
import CarGrid from "../components/CarGrid";
import CarDetails from "../components/CarDetails";
import CarComparison from "../components/CarComparison";
import { mockListings } from "../Data/mockData";
import SearchFilters from "../components/SearchFilters";
import BrowseCars from "../components/BrowseCars";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/*  <CarFilter/> */}
      <Hero />
      <BrowseCars />
      {/* <Cars /> */}
      <Footer />
    </div>
  );
};

export default Home;
