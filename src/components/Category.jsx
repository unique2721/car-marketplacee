import React from "react";
import Data from "../Data/Data";
import SearchFilters from "./SearchFilters";

const Category = ({ setFilterType, filterType }) => {
  return (
    <div
      className="py-12"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)",
      }}
    >
      <h2 className=" font-bold text-3xl text-center mb-10 text-white ">
        Browse Cars By Type
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 px-20">
        {Data.Category.map((category, index) => (
          <div
            key={index}
            className="border bg-white text-black rounded-xl p-1 flex flex-wrap justify-center items-center gap-2 hover:shadow-md hover:bg-slate-100 cursor-pointer"
          >
            <img src={category.icon} alt="brand" width={20} height={20} />
            <h2 className=" font-semibold">{category.name}</h2>
          </div>
        ))}
      </div>
      <SearchFilters setFilterType={setFilterType} filterType={filterType} />
    </div>
  );
};

export default Category;
