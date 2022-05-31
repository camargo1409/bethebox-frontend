import { useRouter } from "next/router";
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
  const {pathname} = useRouter()
  
  useEffect(() => {
    if(!isAuthenticated){
      if(pathname !== "/auth/signup") return
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
  }, [user, pathname]);

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
