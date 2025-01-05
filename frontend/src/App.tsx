import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ResultsPage from "./components/ResultsPage";

const App = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSearch = (city: string) => {
    setSelectedCity(city); 
  };

  return (
    <div>
      {selectedCity ? (
        <ResultsPage city={selectedCity} /> 
      ) : (
        <LandingPage onSearch={handleSearch} />
      )}
    </div>
  );
};

export default App;
