import { createContext, ReactNode, useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";

interface MapContextData {
  position: LatLngExpression;
  handleSetPosition: (position: LatLngExpression) => void;
}

interface MapProviderProps {
  children: ReactNode;
}

export const MapContext = createContext<MapContextData>({} as MapContextData);

export const MapProvider = ({ children }: MapProviderProps) => {
  const [position, setPosition] = useState<LatLngExpression>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const handleSetPosition = (position: LatLngExpression) => {
    setPosition(position);
  };

  return (
    <>
      {position && (
        <MapContext.Provider
          value={{
            position,
            handleSetPosition,
          }}
        >
          {children}
        </MapContext.Provider>
      )}
    </>
  );
};
