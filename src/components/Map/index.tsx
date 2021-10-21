import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapContext } from "../../contexts/MapContenxt";
import { DraggableMarker } from "../DraggableMarker";
import styles from "./index.module.css";
export const Map = () => {
  const { position } = useContext(MapContext);

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
        <DraggableMarker initialPosition={position} />
      </MapContainer>
    </>
  );
};
