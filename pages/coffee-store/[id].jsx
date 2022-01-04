import Link from "next/link";
import Image from "next/image";
import { getCoffeeStoresData } from "../../services/getCoffeStores";
import styles from "./coffe-store.module.css";
const Store = ({ coffeStoreData }) => {
  const { name, neighborhood, address, imgUrl } = coffeStoreData;

  return (
    <div className={styles.layout}>
      <div className={styles.col1}>
        <Link href="/">
          <a>Back to Home</a>
        </Link>{" "}
        <div>
          <Image src={imgUrl} alt={name} width={600} height={360}></Image>
        </div>
      </div>
      <div className={styles.col2}>
        <div className="glass">
          <p>{name}</p>
          <p>{address}</p>
          {neighborhood !== undefined > 0 && <p>{neighborhood}</p>}
        </div>
      </div>
    </div>
  );
};

export default Store;

export async function getStaticProps({ params }) {
  const { id } = params;
  const MadridLatLong = "40.41708874959783%2C-3.702210342724132";
  const querySearch = "cafe";
  const limit = 6;
  const coffeStoresData = await getCoffeeStoresData(
    MadridLatLong,
    querySearch,
    limit
  );
  const coffeStoreData = coffeStoresData.find((store) => store.id == id);
  return {
    props: { coffeStoreData },
  };
}

export async function getStaticPaths() {
  const MadridLatLong = "40.41708874959783%2C-3.702210342724132";
  const querySearch = "cafe";
  const limit = 6;
  const coffeStoreData = await getCoffeeStoresData(
    MadridLatLong,
    querySearch,
    limit
  );
  return {
    paths: coffeStoreData.map((store) => ({ params: { id: store.id } })),
    fallback: "blocking",
  };
}
