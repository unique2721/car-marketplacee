import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [lastRun, setLastRun] = useState(Date.now());

  const runSearch = () => setLastRun(Date.now());

  return (
    <SearchContext.Provider value={{ query, setQuery, lastRun, runSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}

export default SearchContext;
