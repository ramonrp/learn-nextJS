import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Hero from "../components/hero";
import Card from "../components/card";
export default function Home({ coffeStoreData }) {
  console.log(coffeStoreData);
  const handleButtonBannerClick = () => {
    console.log("button banner click");
  };
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
          buttonTitle="View stores nearby "
          handleClick={handleButtonBannerClick}
        />

        <div className={styles.cardLayout}>
          {coffeStoreData.map((coffeStore) => {
            const { fsq_id: id, name } = coffeStore;
            return (
              <Card
                key={id}
                className={styles.card}
                title={name}
                img="/static/hero-image.png"
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
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: String(process.env.FOUR_SQUARE_KEY),
    },
  };

  const resp = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=${MadridLatLong}&query=${querySearch}&limit=${limit}`,
    options
  );
  const coffeStoreResult = await resp.json();
  const coffeStoreData = coffeStoreResult.results;

  return {
    props: { coffeStoreData },
  };
}
