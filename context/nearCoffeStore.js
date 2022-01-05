import { createContext, useContext, useState } from "react";

const NearStores = createContext();

const NearStoreProvider = ({}) => {
  const [state, setState] = useState({
    latLong: "",
    nearStores: [],
  });
  return (
    <NearStores.Provider value={{ state, setState }}>
      {children}
    </NearStores.Provider>
  );
};

const useNearStores = () => {
  const context = useContext(NearStores);
  if (!context) {
    throw new error("useNearStores must be used within a NearStoreProvider");
  }
  return context;
};

export { useNearStores, NearStoreProvider };
