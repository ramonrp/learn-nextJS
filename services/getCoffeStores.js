import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_KEY,
});

async function getCoffeStorePictures() {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee stores",
    perPage: 6,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
}

export async function getCoffeeStoresData(latLong, query, limit) {
  const photos = await getCoffeStorePictures();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOUR_SQUARE_KEY,
    },
  };

  const resp = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`,
    options
  );
  const coffeStoreResult = await resp.json();
  const result = coffeStoreResult.results.map((coffeStore, index) => {
    const { fsq_id: id, location, name } = coffeStore;
    const { address, neighborhood } = location;
    return {
      id,
      address,
      name,
      neighborhood: neighborhood?.[0] || null,
      imgUrl: photos[index],
    };
  });
  return result;
}
