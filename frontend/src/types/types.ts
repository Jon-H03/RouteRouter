export interface Campsite {
  name: string;
  type: string;
  accessible: boolean;
}

export interface Location {
  facility_name: string;
  description: string;
  latitude: number;
  longitude: number;
  reservable: boolean;
  campsites: Campsite[];
}

export interface CampingDataResponse {
  locations: Location[];
}

export interface ResultsPageProps {
  city: string;
}

export interface LandingPageProps {
  onSearch: (city: string) => void;
}
