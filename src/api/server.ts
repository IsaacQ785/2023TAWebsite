import express, { Request, Response, Application, Router } from "express";
import { AnyError, Collection } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoRepository } from "./MongoRepository";
const app: Application = express();
const PORT = process.env.PORT || 8088;
const router = Router();

app.use(cors(), bodyParser.json());
const repository = new MongoRepository();



router.get('/ticker/:id', async (req, res) => {
  console.log(`request for data on ticker: ${req.params.id} received`)
  const response = await repository.getStockData(req.params.id, res);
  res.status(200).send({data: response});

  return response;
})
app.use(router);


app.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
});