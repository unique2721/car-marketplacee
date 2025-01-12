import React from "react";
import Data from "../Data/Data";
import SearchFilters from "./SearchFilters";

const Category = () => {
  return (
    <div
      className="py-20"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)",
      }}
    >
      <h2 className=" font-bold text-3xl text-center mb-6 ">Browse By Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-9 gap-6 px-20">
        {Data.Category.map((category, index) => (
          <div
            key={index}
            className="border rounded-xl p-3 flex flex-col items-center hover:shadow-md cursor-pointer"
          >
            <img src={category.icon} alt="brand" width={35} height={35} />
            <h2 className="mt-2">{category.name}</h2>
          </div>
        ))}
      </div>
      <SearchFilters />
    </div>
  );
};

export default Category;
