import axios from "axios";

export const fetchSuggestions = async (query: string): Promise<string[]> => {
  if (!query) {
    return [];
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

    const cities = response.data.results
      .filter((result: any) => {
        const { components } = result;
        return (
          components.city ||
          components.town ||
          components.village ||
          components.hamlet ||
          components.state
        );
      })
      .map((result: any) => {
        const { components } = result;
        if (components.city) {
          return `${components.city}, ${components.state}`;
        }
        if (components.town || components.village || components.hamlet) {
          return `${components.town || components.village || components.hamlet}, ${components.state}`;
        }
        return result.formatted;
      });

    return cities;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};
