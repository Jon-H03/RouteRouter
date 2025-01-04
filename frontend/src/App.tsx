import React, { useState } from "react";
import axios from "axios";

function LandingPage() {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  console.log(process.env.REACT_APP_OPENCAGE_API_KEY);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: query,
          key: process.env.REACT_APP_OPENCAGE_API_KEY,
          limit: 5,
          countrycode: "us",
        },
      });

      const cities = response.data.results.map((result: any) => result.formatted);
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (city: string) => {
    setLocation(city);
    setSuggestions([]);
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
          onClick={() => console.log(`Selected location: ${location}`)}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Search
        </button>
      </main>
    </div>
  );
}

export default LandingPage;
