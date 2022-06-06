import L from "leaflet";
import { useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapContext } from "../../contexts/MapContenxt";
import { DraggableMarker } from "../DraggableMarker";

import {
  Flex,
  Text,
} from "@chakra-ui/layout";

import styles from "./index.module.css";
import { Button } from "@chakra-ui/react";
import { RequestContext } from "../../contexts/RequestContext";
export interface UserNearMeData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  address: string;
  state: string;
  city: string;
  lat: number;
  long: number;
  available: boolean;
  distance: number;
  cellphone: string;
}
export interface MapProps {
  isDraggable?: boolean;
  usersNearMe?: UserNearMeData[] | null;
}

const myIcon = L.icon({
  iconUrl: "/images/location.png",
  iconSize: [60, 60],
  iconAnchor: [32, 64],
  popupAnchor: [0, -64],
  // shadowUrl: null,
  // shadowSize: null,
  // shadowAnchor: null
});

export const Map = ({ isDraggable = true, usersNearMe = null }: MapProps) => {
  const { position } = useContext(MapContext);

  const { handleSetSelectedUser } = useContext(RequestContext);

  return (
    <>
      <MapContainer
        className={styles.leafletContainer}
        center={{
          lat: position?.lat,
          lng: position?.long,
        }}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isDraggable ? (
          <DraggableMarker initialPosition={position} />
        ) : (
          <Marker
            icon={myIcon}
            position={{
              lat: position?.lat,
              lng: position?.long,
            }}
          >
            <Popup minWidth={90}>
              <Text fontSize="sm">My Address</Text>
            </Popup>
          </Marker>
        )}

        {usersNearMe &&
          usersNearMe.map((user) => (
            <Marker key={user.id} position={[user.lat, user.long]}>
              <Popup minWidth={90}>
                <Flex direction="column">
                  <Text fontSize="sm">
                    {user.first_name} está a {user.distance.toFixed(2)}km do seu
                    endereço
                  </Text>
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    onClick={() => handleSetSelectedUser(user)}
                  >
                    Mais informações
                  </Button>
                </Flex>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};
