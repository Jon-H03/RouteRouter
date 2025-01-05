import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ResultsPage from "./components/ResultsPage";

const App = () => {
  const [searchParams, setSearchParams] = useState<{ city: string; radius: number } | null>(null);

  const handleSearch = (city: string, radius: number) => {
    setSearchParams({ city, radius }); 
  };

  return (
    <div>
      {searchParams ? (
        <ResultsPage city={searchParams.city} radius={searchParams.radius} />
      ) : (
        <LandingPage onSearch={handleSearch} />
      )}
    </div>
  );
};

export default App;
