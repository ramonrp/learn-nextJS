import { useState } from "react";

const useGeolocation = () => {
  const [status, setStatus] = useState("idle");
  const [latLong, setLatLong] = useState("");

  function success(position) {
    setStatus("success");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong(`${latitude},${longitude}`);
  }
  function error() {
    setStatus("error");
    setLatLong("");
  }
  function handleGeoLocation() {
    if (!navigator.geolocation) {
      setStatus("unsuported");
    } else {
      setStatus("loading");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  return { handleGeoLocation, status, latLong };
};

export { useGeolocation };
