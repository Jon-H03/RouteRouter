import React, { useEffect, useState } from "react";
import { fetchCampingData } from "../services/fetchCampingData";
import { Location, ResultsPageProps } from "../types/types";

export default function ResultsPage({ city }: ResultsPageProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampingData = async () => {
      try {
        const data = await fetchCampingData(city);
        setLocations(data.locations);
      } catch (err) {
        setError("Failed to load camping data.");
      } finally {
        setLoading(false);
      }
    };

    loadCampingData();
  }, [city]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Camping Locations Near {city}</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold">{location.facility_name}</h2>
            <p className="text-gray-600 line-clamp-3">
              {location.description.replace(/<[^>]*>/g, "")}
            </p>
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
            <div className="mt-4">
              <h3 className="font-semibold">Campsites:</h3>
              <ul>
                {location.campsites.map((campsite, idx) => (
                  <li key={idx} className="text-sm">
                    {campsite.name} ({campsite.type}){" "}
                    {campsite.accessible ? "♿ Accessible" : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
