import React, { useState } from "react";
import { fetchSuggestions } from "./services/locationServices";

function LandingPage() {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    const cities = await fetchSuggestions(value);
    setSuggestions(cities);

    setIsValid(cities.includes(value));
  };

  const handleSelectSuggestion = (city: string) => {
    setLocation(city);
    setSuggestions([]);
    setIsValid(true);
  };

  const handleSearch = () => {
    if (!isValid) {
      alert("Please select a valid location from the suggestions.");
      return;
    }
    console.log(`Selected location: ${location}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-bold text-green-600">RouteRouter</h1>
        <p className="text-xl text-gray-600 mt-4">Your adventure starts here!</p>
      </header>

      <main className="w-full max-w-lg px-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Where would you like to camp?
          </h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter a city"
            className="w-full p-3 border rounded shadow-sm focus:ring focus:ring-green-300"
            value={location}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded shadow-md mt-1 max-h-48 overflow-y-auto">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSearch}
          className={`mt-4 px-4 py-2 rounded text-white ${
            isValid
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isValid}
        >
          Search
        </button>
      </main>
    </div>
  );
}

export default LandingPage;