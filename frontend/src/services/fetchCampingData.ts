import axios from "axios";
import { CampingDataResponse } from "../types/types"; 
const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5003";

export const fetchCampingData = async (city: string, radius: number): Promise<CampingDataResponse> => {
  try {
    const response = await axios.post<CampingDataResponse>(`${BASE_URL}/campsites`, {
      city, 
      radius
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching camping data:", error);
    throw new Error("Failed to fetch camping data.");
  }
};
