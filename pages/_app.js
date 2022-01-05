import "../styles/globals.css";
import { NearStoreProvider } from "../context/nearCoffeStore";
function MyApp({ Component, pageProps }) {
  return (
    <NearStoreProvider>
      <Component {...pageProps} />
    </NearStoreProvider>
  );
}

export default MyApp;
