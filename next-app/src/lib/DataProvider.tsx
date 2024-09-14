import { createContext, useState, useContext, useEffect } from 'react';
import { Place } from '../components/places/places';
import { Review } from '../components/places/reviews';

interface DataContextType {
  places: Place[] | null;
  reviews: reviewRating[] | null;
  setFilterCriteria: (filters: PlaceFilters) => void;
}

interface ReviewFilters {
  [key: string]: string | number;
  Place: string;
  Rating: number;
  Contains: string;
  Prompt: string;
  Date: string;
}

interface PlaceFilters {
  [key: string]: string | number;
  Name: string;
  Types: string;
  Rating: number;
  Contains: string;
  Prompt: string;
  Radius: number;
  Latitude: number;
  Longitude: number;
}

export interface reviewRating {
  [key: string]: number | Date;
  Rating: number;
  TimeStamp: Date;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [reviews, setReviews] = useState<reviewRating[] | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<PlaceFilters | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (filterCriteria) {  // Only fetch if there are filter criteria
        try {
          await fetchFilteredPlaces(filterCriteria);
          await fetchPlacesReviews(filterCriteria);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [filterCriteria]);

  const fetchPlaces = async () => {
    const response = await fetch('http://127.0.0.1:8000/places');
    const data = await response.json();
    setPlaces(data);
  };

  const refreshPlaces = async () => {
    await fetchPlaces();
  };

  const fetchFilteredPlaces = async (filters: PlaceFilters) => {

    for (const key in filters) {
      if (filters[key] === '' || filters[key] === 0) {
        delete filters[key];
      }
    }
    const lowerCaseFilters: { [key: string]: string | number } = {};
    for (const key in filters) {
      lowerCaseFilters[key.toLowerCase()] = filters[key];
    }
    try {
      const query = new URLSearchParams(lowerCaseFilters as any).toString();
      const res = await fetch(`http://127.0.0.1:8000/places/filter?${query}`);  // Your API endpoint
      const data = await res.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchReviews = async () => {
    const response = await fetch('http://127.0.0.1:8000/reviews');
    const data = await response.json();
    setReviews(data);
  };

  const refreshReviews = async () => {
    await fetchReviews();
  };

  const fetchPlacesReviews = async (filters: PlaceFilters) => {
    for (const key in filters) {
      if (filters[key] === '' || filters[key] === 0) {
        delete filters[key];
      }
    }
    const lowerCaseFilters: { [key: string]: string | number } = {};
    for (const key in filters) {
      lowerCaseFilters[key.toLowerCase()] = filters[key];
    }

    try {
      const query = new URLSearchParams(lowerCaseFilters as any).toString();
      const response = await fetch(`http://127.0.0.1:8000/places/reviews?${query}`, {
      });
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      places,
      reviews,
      setFilterCriteria,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
