import { useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import MapPresenter from "../presenter/MapPresenter";
import { Coords } from "../types";
const MapContainer = () => {
  const { isError, location, coordsHistory } = useLocation();
  const [currentCoords, setCurrentCoords] = useState<Coords | null>(null);
  const [coordsHistoryState, setCoordsHistoryState] = useState<Coords[]>([]);

  useEffect(() => {
    if (location) {
      setCurrentCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  useEffect(() => {
    setCoordsHistoryState(
      coordsHistory.map((coords) => ({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }))
    );
  }, [coordsHistory]);

  return (
    <MapPresenter
      currentCoords={currentCoords}
      coordsHistory={coordsHistoryState}
      isError={isError}
    />
  );
};
export default MapContainer;
