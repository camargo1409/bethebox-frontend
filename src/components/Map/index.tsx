import L from "leaflet";
import { useContext, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapContext } from "../../contexts/MapContenxt";
import { DraggableMarker } from "../DraggableMarker";
import styles from "./index.module.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
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

export const Map = ({
  isDraggable = true,
  usersNearMe = null,
}: MapProps) => {
  const { position } = useContext(MapContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentUser,setCurrentUser] = useState({} as UserNearMeData);

  const handleOnOpen = (user:UserNearMeData) =>{
    setCurrentUser(user);
    onOpen();
  }

  return (
    <>
      <MapContainer
        className={styles.leafletContainer}
        center={position}
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
          <Marker icon={myIcon} position={position}>
            <Popup minWidth={90}>
              <span>My Address</span>
            </Popup>
          </Marker>
        )}

        {usersNearMe &&
          usersNearMe.map((user) => (
            <Marker position={[user.lat, user.long]}>
              <Popup minWidth={90}>
                <span>
                  {user.first_name} {user.last_name}
                </span>
                <Button colorScheme="pink" onClick={() => handleOnOpen(user)}>
                  Mais informações
                </Button>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>informações de {currentUser.first_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
