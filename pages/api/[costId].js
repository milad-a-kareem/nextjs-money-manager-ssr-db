// mydomain/api/:costId
import { getOneCost, removeOne, updateOne } from "../../database/functions";

export default function costHandler(req, res) {
  if (req.method === "GET") {
    getOneCost(req.query.costId)
      .then((cost) => {
        res.status(200).json(cost);
      })
      .catch((_) => {
        res.status(404).json({ message: "Not found" });
      });
  } else if (req.method === "POST") {
    updateOne(req.query.costId, JSON.parse(req.body))
      .then((_) => {
        res.status(200).json({ message: "Updated Successfully" });
      })
      .catch((_) => {
        res.status(404).json({ message: "Not found" });
      });
  } else if (req.method === "DELETE") {
    removeOne(req.query.costId)
      .then((_) => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((_) => {
        res.status(404).json({ message: "Not found" });
      });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
