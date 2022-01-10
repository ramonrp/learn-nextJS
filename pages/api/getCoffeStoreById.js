import { getCoffeStoreById } from "../../services/airtable";

export default async function (req, res) {
  const { id } = req.query;
  try {
    if (!id) res.json("id param is compulsory");
    const coffeStore = await getCoffeStoreById(id);
    if (coffeStore.length === 0) res.json("Id is not avalaible");
    res.status(200).json(coffeStore);
  } catch (err) {
    console.error(err);
  }
}
