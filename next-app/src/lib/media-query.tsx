import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
  // Initialize state with whether the media query matches or not
  const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

  useEffect(() => {
    // Create a media query list for the query
    const mediaQueryList = window.matchMedia(query);

    // Define a handler to update the state when the query match changes
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Attach the listener
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
