import React, { useEffect, useState } from "react";
import { fetchCampingData } from "../services/fetchCampingData";
import { useLoadingMessages } from "../services/loadingMessages";
import { Location, ResultsPageProps } from "../types/types";

export default function ResultsPage({ city, radius }: ResultsPageProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpansion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const loadingMessage = useLoadingMessages();

  useEffect(() => {
    const loadCampingData = async () => {
      try {
        const data = await fetchCampingData(city, radius);
        setLocations(data.locations);
      } catch (err) {
        setError("Failed to load camping data.");
      } finally {
        setLoading(false);
      }
    };

    loadCampingData();
  }, [city]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-lg text-gray-600">{loadingMessage}</p>
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Camping Locations Near {city} ⛺</h1>
        <a
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </a>
      </div>
      <div className="space-y-6">
        {locations.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No campsites found. Sorry 😔
          </div>
        ) : (
          locations.map((location, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center p-4 border rounded shadow hover:shadow-lg transition-shadow"
            >
              {location.image_url ? (
                <div className="w-full md:w-1/4">
                  <img
                    src={location.image_url}
                    alt={location.facility_name}
                    className="w-full h-auto rounded"
                  />
                </div>
              ) : (
                <div className="w-full md:w-1/4 flex items-center justify-center bg-gray-200 rounded h-32">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              <div className="flex-1 md:ml-4 mt-4 md:mt-0">
                <h2 className="text-lg font-semibold">
                  {location.facility_name}
                </h2>
                <p
                  className={`text-gray-600 ${
                    expandedIndex === index ? "" : "line-clamp-3"
                  }`}
                >
                  {location.description.replace(/<[^>]*>/g, "")}
                </p>
                <button
                  onClick={() => toggleExpansion(index)}
                  className="text-blue-500 hover:underline mt-2"
                >
                  {expandedIndex === index ? "View Less" : "View More"}
                </button>
                <p className="text-sm mt-2 text-gray-500">
                  Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
                <p
                  className={`text-sm mt-2 ${
                    location.reservable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {location.reservable ? "Reservable" : "Not Reservable"}
                </p>
                <p className="text-sm mt-2 text-gray-500">
                  Campsites: {location.campsites}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
