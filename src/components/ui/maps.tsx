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
  color?: string;
  title?: string;
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
          <MarkerF
            position={center ?? currentLocation}
            title="Your Location"
            onLoad={(marker) => {
              const customIcon = (opts: any) =>
                Object.assign(
                  {
                    path: "M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0",
                    fillColor: "#B22222",
                    fillOpacity: 1,
                    strokeColor: "white",
                    strokeWeight: 1,
                    scale: 2,
                  },
                  opts
                );

              marker.setIcon(
                customIcon({
                  fillColor: "#4169E1",
                  strokeColor: "white",
                })
              );
            }}
          />
        )}
        {markers?.map((marker, index) => (
          <Fragment key={index}>
            <MarkerF
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
            />
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
