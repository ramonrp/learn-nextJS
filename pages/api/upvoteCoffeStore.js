import { updateFieldVote, getCoffeStoreById } from "../../services/airtable";
export default async function (req, res) {
  const { method } = req;
  if (method !== "PUT") res.json("Method need to be PUT");
  const { id } = req.body;
  if (!id) res.json("Body must contain an id");
  try {
    const records = await getCoffeStoreById(id);
    if (records.length > 0) {
      const airtableId = records[0].airtableId;
      const newVotes = records[0].votes + 1;
      console.log(newVotes);
      const result = await updateFieldVote({ airtableId, votes: newVotes });
      const minifiedRecords = result.map((record) => ({
        airtableId: record.id,
        ...record.fields,
      }));
      res.status(200).json(minifiedRecords);
    } else {
      res.json("id is not correct");
    }
  } catch (err) {
    console.error(err);
  }
}
