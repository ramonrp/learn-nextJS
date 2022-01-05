import { createContext, useContext, useState } from "react";

const NearStores = createContext();

const NearStoreProvider = ({ children }) => {
  const [nearStores, setNearStores] = useState({
    latLong: "",
    nearStores: [],
  });
  return (
    <NearStores.Provider value={{ nearStores, setNearStores }}>
      {children}
    </NearStores.Provider>
  );
};

const useNearStores = () => {
  const context = useContext(NearStores);
  if (!context) {
    throw new Error("useNearStores must be used within a NearStoreProvider");
  }
  return context;
};

export { useNearStores, NearStoreProvider };
