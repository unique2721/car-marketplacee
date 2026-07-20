import React, { useEffect, useState } from "react";
import Category from "./Category";
import CarGrid from "./CarGrid";
import { getMarketplaceListings, mockListings } from "../Data/mockLisitngs";
import CarDetails from "./CarDetails";
import { useSearch } from "../context/SearchContext";

export default function () {
  const [selectedListing, setSelectedListing] = useState(null);
  const [filterType, setFilterType] = useState({});
  const [listingsVersion, setListingsVersion] = useState(0);

  const { query } = useSearch();

  useEffect(() => {
    const syncListings = () => setListingsVersion((prev) => prev + 1);

    window.addEventListener("marketplace:listings-updated", syncListings);
    window.addEventListener("storage", syncListings);
    syncListings();

    return () => {
      window.removeEventListener("marketplace:listings-updated", syncListings);
      window.removeEventListener("storage", syncListings);
    };
  }, []);

  const listings = getMarketplaceListings();
  let filteredCars = listings;
  const q = (query || "").trim().toLowerCase();
  if (q) {
    const tokens = q.split(/\s+/).filter(Boolean);
    filteredCars = listings.filter((car) => {
      // For each token, require it to match at least one of make/model/year
      return tokens.every((token) => {
        if (!token) return true;
        const yearStr = String(car.year).toLowerCase();
        return (
          (car.make && car.make.toLowerCase().includes(token)) ||
          (car.model && car.model.toLowerCase().includes(token)) ||
          yearStr.includes(token)
        );
      });
    });
  }
  if (Object.keys(filterType).length !== 0) {
    // apply additional filters on top of search
    filteredCars = filteredCars.filter((car) => {
      return Object.keys(filterType).every((key) => {
        if (key === "feature") {
          return filterType[key].every((elem) => car.features.includes(elem));
        }
        if (key === "type") {
          const typeVal = filterType[key];
          if (!typeVal) return true;
          // prefer explicit `car.type` if present
          if (car.type) return String(car.type).toLowerCase() === String(typeVal).toLowerCase();
          // fallback: check make, model, description for the category word
          const needle = String(typeVal).toLowerCase();
          return (
            (car.make && car.make.toLowerCase().includes(needle)) ||
            (car.model && car.model.toLowerCase().includes(needle)) ||
            (car.description && car.description.toLowerCase().includes(needle))
          );
        }
        // Advanced filter keys handling
        if (key === "features" || key === "feature") {
          const vals = filterType[key];
          if (!vals || !vals.length) return true;
          if (!car.features || !Array.isArray(car.features)) return true; // no data to match -> ignore
          return vals.every((v) => car.features.includes(v));
        }
        if (key === "transmission") {
          const vals = filterType[key];
          if (!vals || !vals.length) return true;
          if (!car.transmission) return true;
          return vals.map(String).map(s=>s.toLowerCase()).includes(String(car.transmission).toLowerCase());
        }
        if (key === "fuelType" || key === "fuel") {
          const vals = filterType[key];
          if (!vals || !vals.length) return true;
          if (!car.fuel) return true;
          return vals.map(String).map(s=>s.toLowerCase()).includes(String(car.fuel).toLowerCase());
        }
        if (key === "bodyStyle") {
          const vals = filterType[key];
          if (!vals || !vals.length) return true;
          // prefer car.bodyStyle or car.type
          if (car.bodyStyle) return vals.map(v=>v.toLowerCase()).includes(String(car.bodyStyle).toLowerCase());
          if (car.type) return vals.map(v=>v.toLowerCase()).includes(String(car.type).toLowerCase());
          // fallback: check description or name
          const hay = ((car.description || "") + " " + (car.name || "") + " " + (car.model || "") + " " + (car.make || "")).toLowerCase();
          return vals.every(v => hay.includes(String(v).toLowerCase()));
        }
        if (key === "vehicleDetails") {
          const vals = filterType[key];
          if (!vals || !vals.length) return true;
          // if car.condition exists, compare; otherwise ignore
          if (car.condition) return vals.map(v=>v.toLowerCase()).includes(String(car.condition).toLowerCase());
          return true;
        }
        if (key === "safety") {
          const vals = filterType[key];
          if (!vals || !vals.length) return true;
          if (!car.safety || !Array.isArray(car.safety)) return true;
          return vals.every(v => car.safety.includes(v));
        }
        if (key === "make") {
          const val = filterType[key];
          if (!val) return true;
          return car.make && String(car.make).toLowerCase() === String(val).toLowerCase();
        }
        if (key === "model") {
          const val = filterType[key];
          if (!val) return true;
          return car.model && String(car.model).toLowerCase() === String(val).toLowerCase();
        }
        if (key === "priceRange") {
          const pr = filterType[key];
          if (!pr) return true;
          const price = Number(car.price || 0);
          const min = typeof pr.min === "number" ? pr.min : 0;
          const max = typeof pr.max === "number" ? pr.max : Infinity;
          return price >= min && price <= max;
        }
        return true;
      });
    });
  }
  const handleViewDetails = (id) => {
    setSelectedListing(id);
  };

  const selectedCar = listings.find(
    (listing) => listing.id === selectedListing
  );
  return (
    <div>
      <Category setFilterType={setFilterType} filterType={filterType} />
      {filteredCars.length === 0 ? (
        <div className="py-20">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">No listings found</h3>
            <p className="text-gray-600">
              There are no listed cars that match your search or selected filters.
            </p>
          </div>
        </div>
      ) : (
        <CarGrid
          listings={filteredCars}
          itemsPerPage={6}
          onViewDetails={handleViewDetails}
        />
      )}
      {selectedCar && (
        <CarDetails
          listing={selectedCar}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}
