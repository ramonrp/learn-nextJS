import Link from "next/link";
import { getCoffeeStoresData } from "../../services/getCoffeStores";
const Store = ({ coffeStoreData }) => {
  console.log(coffeStoreData);
  const { name, location } = coffeStoreData;
  const { address, neighborhood } = location;

  return (
    <div className="glass">
      <Link href="/">
        <a>Back to Home</a>
      </Link>{" "}
      <p>{name}</p>
      <p>{address}</p>
      {neighborhood.length > 0 && <p>{neighborhood[0]}</p>}
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
  const coffeStoreData = coffeStoresData.find((store) => store.fsq_id == id);
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
    paths: coffeStoreData.map((store) => ({ params: { id: store.fsq_id } })),
    fallback: "blocking",
  };
}
