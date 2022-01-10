import { updateFieldVote } from "../../services/airtable";
export default async function (req, res) {
  const { method } = req;
  if (method !== "PUT") res.json("Method need to be PUT");
  const { votes, id: airtableId } = req.body;
  console.log(votes, airtableId);
  if (!airtableId) res.json("Body must contain an id");
  if (!votes) res.json("Body must contain a votes field");
  try {
    const result = await updateFieldVote({ airtableId, votes });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
}
