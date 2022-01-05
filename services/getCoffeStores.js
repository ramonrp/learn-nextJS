import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
});

export async function getCoffeeStoresData(latLong, query, limit) {
  async function getCoffeStorePictures() {
    const photos = await unsplashApi.search.getPhotos({
      query: "coffee stores",
      perPage: limit,
    });
    const unsplashResults = photos.response?.results || [];
    return unsplashResults.map((result) => result.urls["small"]);
  }
  const photos = await getCoffeStorePictures();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOUR_SQUARE_KEY,
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
