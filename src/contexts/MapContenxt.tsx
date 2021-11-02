import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
export interface Position {
  lat: number;
  long: number;
}
interface MapContextData {
  position: Position;
  handleSetPosition: (position: Position) => void;
}

interface MapProviderProps {
  children: ReactNode;
}

export const MapContext = createContext<MapContextData>({} as MapContextData);

export const MapProvider = ({ children }: MapProviderProps) => {
  const [position, setPosition] = useState<Position>({lat:0,long:0});
  const {isAuthenticated, user} = useContext(AuthContext);

  useEffect(() => {
    if(!isAuthenticated){
      
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          lat: position.coords.latitude, 
          long: position.coords.longitude
        });
      });
    } else {
      setPosition({
        lat:user?.lat,
        long:user?.long
      })
    }
  }, [user]);

  const handleSetPosition = (position: Position) => {
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
