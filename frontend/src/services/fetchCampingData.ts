import axios from "axios";
import { CampingDataResponse } from "../types/types"; 
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

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
