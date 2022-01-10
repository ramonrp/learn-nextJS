import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getCoffeeStoresData } from "../../services/getCoffeStores";
import styles from "./coffe-store.module.css";
import { useNearStores } from "../../context/nearCoffeStore";
const Store = ({ coffeStoreData }) => {
  const router = useRouter();
  const [coffeStore, setCoffeStore] = useState(coffeStoreData);
  const { id } = router.query;
  const { nearStores } = useNearStores();

  useEffect(() => {
    if (Object.keys(coffeStore).length === 0) {
      if (nearStores.nearStores.length > 0) {
        setCoffeStore(nearStores.nearStores.find((store) => store.id === id));
      }
    }
  }, [coffeStore, id, nearStores]);

  const { name, neighborhood, address, imgUrl } = coffeStore;

  useEffect(() => {
    const data = {
      id,
      name,
      neighborhood,
      address,
      imgUrl,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/api/createCoffeStore", options);
  }, [address, id, imgUrl, name, neighborhood]);
  const [votes, setVotes] = useState(0);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(`/api/getCoffeStoreById?id=${id}`, fetcher);
  useEffect(() => {
    if (data && data.length > 0) {
      setVotes(data[0].votes);
    }
  }, [data]);

  function handleUpvote() {
    console.log("upvoting");
  }
  return (
    <div className="">
      <div className="">
        <Link href="/">
          <a>Back to Home</a>
        </Link>{" "}
        <div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1482350325005-eda5e677279b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODgyNTN8MHwxfHNlYXJjaHwyMHx8Y29mZmVlJTIwc3RvcmVzfGVufDB8fHx8MTY0MTM3MjY0NQ&ixlib=rb-1.2.1&q=80&w=400"
            }
            alt={name}
            width={600}
            height={360}
          ></Image>
        </div>
      </div>
      <div className="">
        <div className="glass">
          <p>{name}</p>
          <p>{address}</p>
          {neighborhood !== undefined > 0 && <p>{neighborhood}</p>}
          <p>{votes} Likes</p>
        </div>
        <button onClick={handleUpvote} className={styles.button}>
          upvote!
        </button>
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
  let coffeStoreData = coffeStoresData.find((store) => store.id == id);
  if (coffeStoreData === undefined) {
    coffeStoreData = {};
  }
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
    paths: coffeStoreData.map((store) => ({
      params: { id: store.id.toString() },
    })),
    fallback: true,
  };
}
