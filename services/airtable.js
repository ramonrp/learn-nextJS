const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  "appg41QV4dZ7tA4Bm"
);

async function getCoffeStoreById(id) {
  const records = await base("coffe-stores")
    .select({
      view: "Grid view",
    })
    .firstPage();
  return records
    .filter((record) => record.fields.id === id)
    .map((record) => ({ airtableId: record.id, ...record.fields }));
}

async function addCoffeStore(record) {
  return base("coffe-stores").create([
    {
      fields: {
        votes: 0,
        ...record,
      },
    },
  ]);
}

export { getCoffeStoreById, addCoffeStore };
