import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { LatLng, LatLngExpression } from "leaflet";
import { MapContext, Position } from "../../contexts/MapContenxt";

interface DraggableMarkerProps {
  initialPosition: Position;
}

export function DraggableMarker({ initialPosition }: DraggableMarkerProps) {
  const [draggable, setDraggable] = useState(false);
  const { position, handleSetPosition } = useContext(MapContext);
  const markerRef = useRef<any>(null);
  const map = useMap();
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          
          const position:LatLng = {...marker.getLatLng()}

          const {lat,lng} = position;
          
          handleSetPosition({lat,long:lng})
          map.flyTo(marker.getLatLng());
        }
      },
    }),
    [handleSetPosition, map]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <>
      {position && (
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={{ lat: position.lat, lng: position.long }}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "Arraste o ponteiro até seu endereço"
                : "Clique aqui para tornar o ponteiro arrastável"}
            </span>
          </Popup>
        </Marker>
      )}
    </>
  );
}
