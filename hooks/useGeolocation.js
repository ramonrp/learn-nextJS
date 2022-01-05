import { useState } from "react";
import { useNearStores } from "../context/nearCoffeStore";
const useGeolocation = () => {
  const [status, setStatus] = useState("idle");
  const { nearStores, setNearStores } = useNearStores();

  function success(position) {
    setStatus("success");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setNearStores({
      ...nearStores,
      latLong: `${latitude},${longitude}`,
    });
  }
  function error() {
    setStatus("error");
    setNearStores({
      ...nearStores,
      latLong: "",
    });
  }
  function handleGeoLocation() {
    if (!navigator.geolocation) {
      setStatus("unsuported");
    } else {
      setStatus("loading");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  return { handleGeoLocation, status };
};

export { useGeolocation };
