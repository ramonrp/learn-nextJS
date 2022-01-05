import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Hero from "../components/hero";
import Card from "../components/card";

import { getCoffeeStoresData } from "../services/getCoffeStores";
import { useGeolocation } from "../hooks/useGeolocation";
import { useNearStores } from "../context/nearCoffeStore";
export default function Home({ coffeStoreData }) {
  const { handleGeoLocation, status, latLong } = useGeolocation();
  const { nearStores, setNearStores } = useNearStores();

  const isError = status === "error";
  const isSuccess = status === "success";
  const isLoading = status === "loading";
  console.log(nearStores);
  const handleButtonBannerClick = () => {
    handleGeoLocation();
  };
  useEffect(() => {
    if (nearStores.latLong) {
      getCoffeeStoresData(nearStores.latLong, "coffee", 30)
        .then((data) => setNearStores((s) => ({ ...s, nearStores: data })))
        .catch((err) => console.log(err));
    }
  }, [nearStores.latLong, setNearStores]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.heroImage}>
        <Hero />
      </div>
      <main className={styles.main}>
        <Banner
          buttonTitle={isLoading ? "Loading..." : "View stores nearby "}
          handleClick={handleButtonBannerClick}
        />
        {isError && <p>location is not avalaible</p>}
        {nearStores.nearStores.length > 0 && (
          <>
            <h2 className={styles.secondTitle}>Near Coffee Stores</h2>
            <div className={styles.cardLayout}>
              {nearStores.nearStores.map((coffeStore) => {
                const { id, name, imgUrl } = coffeStore;
                return (
                  <Card
                    key={id}
                    className={styles.card}
                    title={name}
                    img={imgUrl}
                    href={`/coffee-store/${id}`}
                  />
                );
              })}
            </div>
          </>
        )}
        <h2 className={styles.secondTitle}>Madrid Coffe Stores</h2>
        <div className={styles.cardLayout}>
          {coffeStoreData.map((coffeStore) => {
            const { id, name, imgUrl } = coffeStore;
            return (
              <Card
                key={id}
                className={styles.card}
                title={name}
                img={imgUrl}
                href={`/coffee-store/${id}`}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const MadridLatLong = "40.41708874959783%2C-3.702210342724132";
  const querySearch = "cafe";
  const limit = 6;
  const coffeStoreData = await getCoffeeStoresData(
    MadridLatLong,
    querySearch,
    limit
  );

  return {
    props: { coffeStoreData },
  };
}
