export async function getCoffeeStoresData(latLong, query, limit) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: String(process.env.FOUR_SQUARE_KEY),
    },
  };

  const resp = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`,
    options
  );
  const coffeStoreResult = await resp.json();
  return coffeStoreResult.results;
}
