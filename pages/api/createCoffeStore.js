import { getCoffeStoreById, addCoffeStore } from "../../services/airtable";

export default async function handler(req, res) {
  if (req.method !== "POST") res.status(500).json("method should be POST");
  const { id, name } = req.body;
  try {
    const records = await getCoffeStoreById(id);
    if (records.length === 0) {
      if (name) {
        const record = await addCoffeStore(req.body);
        res.status(200).json(record[0].fields);
      } else {
        res.json("name field is compulsory");
      }
    } else {
      res.status(200).json(records);
    }
  } catch (err) {
    res.json("something went wrong", err);
  }
}
