import React, { useState } from "react";
import Category from "./Category";
import CarGrid from "./CarGrid";
import { mockListings } from "../Data/mockLisitngs";
import CarDetails from "./CarDetails";

export default function () {
  const [selectedListing, setSelectedListing] = useState(null);
  const [filterType, setFilterType] = useState({});

  let filteredCars = mockListings;
  if (Object.keys(filterType).length !== 0) {
    filteredCars = mockListings.filter((car) => {
      Object.keys(filterType).forEach((key) => {
        if (key === "feature") {
          if (!filterType[key].every((elem) => car.features.includes(elem))) {
            return false;
          }
        }
      });
      return true;
    });
  }
  const handleViewDetails = (id) => {
    setSelectedListing(id);
  };

  const selectedCar = mockListings.find(
    (listing) => listing.id === selectedListing
  );
  return (
    <div>
      <Category setFilterType={setFilterType} filterType={filterType} />
      <CarGrid
        listings={filteredCars}
        itemsPerPage={6}
        onViewDetails={handleViewDetails}
      />
      {selectedCar && (
        <CarDetails
          listing={selectedCar}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}
