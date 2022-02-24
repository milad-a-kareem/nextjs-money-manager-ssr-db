// mydomain/api/costs

import { getAllCosts, insertNewCost } from "../../database/functions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    getAllCosts()
      .then((costs) => {
        res.status(200).json(costs);
      })
      .catch((_) => {
        res.status(404).json({ message: "Not found" });
      });
  } else if (req.method === "POST") {
    insertNewCost(JSON.parse(req.body))
      .then((cost) => {
        res.status(200).json(cost);
      })
      .catch((_) => {
        res.status(404).json({ message: "Not Added" });
      });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
