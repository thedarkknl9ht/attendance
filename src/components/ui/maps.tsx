import { Fragment, useEffect, useState } from "react";
import {
  Circle,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
};

interface marker {
  lat: number;
  lng: number;
  icon?: any;
  circle?: any;
}

interface mapsProps {
  center?: marker;
  markers?: marker[];
  showLocation?: boolean;
  zoom?: number;
  toggle?: any;
}

export const Maps = ({
  center,
  markers,
  zoom,
  toggle,
  showLocation,
}: mapsProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAJK6H7umVszBb9nwHGoZ5UleHnHYPyoBI",
  });

  const [currentLocation, setCurrentLocation] = useState<any>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (toggle?.open)
      navigator.geolocation.getCurrentPosition(setCurrent, error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle.open]);

  function setCurrent(location: any) {
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    setCurrentLocation({ lat, lng });
  }

  function error(error: any) {
    console.log(error);
  }

  return (
    isLoaded &&
    currentLocation && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center ?? currentLocation}
        zoom={zoom ?? 15}
      >
        {showLocation !== false && (
          <MarkerF position={center ?? currentLocation} />
        )}
        {markers?.map((marker, index) => (
          <Fragment key={index}>
            <MarkerF position={{ lat: marker.lat, lng: marker.lng }} />
            {marker.circle && (
              <Circle
                center={{ lat: marker.lat, lng: marker.lng }}
                radius={marker.circle.radius}
                options={{
                  fillColor: "white",
                  fillOpacity: 0.3,
                  strokeWeight: 1,
                  strokeColor: "rgb(200,200,200)",
                  clickable: false,
                  editable: true,
                  zIndex: 1,
                }}
              />
            )}
          </Fragment>
        ))}
      </GoogleMap>
    )
  );
};

export function calculateDistance(mk1: any, mk2: any) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}
