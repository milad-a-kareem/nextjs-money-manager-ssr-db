import { ObjectId } from "mongodb";
import client from "./connection";

//ADD
export async function insertNewCost(costObject) {
  await client.connect();
  const db = client.db();
  const collection = db.collection("costs");

  const result = await collection.insertOne({
    _id: ObjectId(),
    title: costObject.title,
    costAmount: costObject.costAmount,
    date: costObject.date,
  });

  const data = await collection.findOne({ _id: result.insertedId });

  return data;
}

//GET
export async function getAllCosts() {
  await client.connect();
  const db = client.db();
  const collection = db.collection("costs");
  const findResult = await collection.find({}).toArray();
  client.close();
  return findResult;
}
export async function getOneCost(id) {
  await client.connect();
  const db = client.db();
  const collection = db.collection("costs");
  const findResult = await collection.findOne({ _id: ObjectId(id) });
  return findResult;
}

//UPDATE
export async function updateOne(id, newData) {
  await client.connect();
  const db = client.db();
  const collection = db.collection("costs");
  const result = await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    {
      $set: {
        title: newData.title,
        costAmount: Number(newData.costAmount),
        date: newData.date,
      },
    }
  );

  return result;
}

//REMOVE
export async function removeOne(id) {
  await client.connect();
  const db = client.db();
  const collection = db.collection("costs");
  const result = await collection.findOneAndDelete({ _id: ObjectId(id) });
  return result;
}
