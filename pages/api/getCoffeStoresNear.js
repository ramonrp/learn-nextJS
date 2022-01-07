import { getCoffeeStoresData } from "../../services/getCoffeStores";

export default async function handler(req, res) {
  const { latLong, query, limit } = req.query;
  try {
    const data = await getCoffeeStoresData(latLong, query, limit);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
