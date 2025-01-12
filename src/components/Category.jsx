import React from "react";
import Data from "../Data/Data";
import SearchFilters from "./SearchFilters";

const Category = () => {
  return (
    <div
      className="py-12"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)",
      }}
    >
      <h2 className=" font-bold text-3xl text-center mb-10 text-white ">Browse Cars By Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-9 gap-6 px-20">
        {Data.Category.map((category, index) => (
          <div
            key={index}
            className="border bg-white text-black rounded-xl p-3 flex flex-col items-center hover:shadow-md hover:bg-slate-100 cursor-pointer"
          >
            <img
              className=" bg-white"
              src={category.icon}
              alt="brand"
              width={35}
              height={35}
            />
            <h2 className="mt-2 font-semibold">{category.name}</h2>
          </div>
        ))}
      </div>
      <SearchFilters />
    </div>
  );
};

export default Category;
