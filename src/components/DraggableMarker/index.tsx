import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMap} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { MapContext } from "../../contexts/MapContenxt";

interface DraggableMarkerProps {
  initialPosition: LatLngExpression;
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
          handleSetPosition(marker.getLatLng());
          
          map.flyTo(marker.getLatLng())
        }
      },
    }),
    [handleSetPosition,map]
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
          position={position}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? "Marker is draggable"
                : "Click here to make marker draggable"}
            </span>
          </Popup>
        </Marker>
      )}
    </>
  );
}
