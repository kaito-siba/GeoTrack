import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

const COORDS_HISTORY_LENGTH = 10;

/**
 * Hook to get the current location and the location history.
 * @param interval The interval to get the location.
 * @returns location -  The current location.
 * @returns coordsHistory - The location history.
 * @returns isLoading - If the location is loading.
 * @returns isError - If there is an error getting the location.
 */
export default function useLocation(interval = 1000) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [coordsHistory, setCoordsHistory] = useState<
    Location.LocationObjectCoords[]
  >([]);

  /**
   * Update the coords history with the new coords.
   * If the history is full, remove the oldest coords.
   * @param coords The new coords to add to the history.
   * @returns void
   */
  const updateCoordsHistory = useCallback(
    (coords: Readonly<Location.LocationObjectCoords>) => {
      setCoordsHistory((prev) => {
        if (prev.length >= COORDS_HISTORY_LENGTH) {
          return [...prev.slice(1), coords];
        } else {
          return [...prev, coords];
        }
      });
    },
    []
  );

  /**
   * Get the current location.
   * If the location is not granted, set an error.
   * @returns void
   */
  const getLocation = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setIsError(true);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    updateCoordsHistory(location.coords);
    setIsLoading(false);
  }, []);

  /**
   * Get the location on mount and every interval.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      getLocation();
    }, interval);

    return () => clearInterval(timer);
  }, [getLocation, interval]);

  return { location, coordsHistory, isLoading, isError };
}
