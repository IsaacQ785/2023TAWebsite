import { Response } from "express";
import { connectDB } from "./connect-db";
import { IMongoRepository } from "./IMongoRepository";

export class MongoRepository implements IMongoRepository {
  async getStockData(id: string, res: Response): Promise<any> {
    let db = await connectDB();
    let collection = db.collection(id);
    let stock_data = await collection.find({}).toArray();
    return stock_data;
  }

  async getStockTickers(): Promise<any> {
    let db = await connectDB();
    let tickers = await db.command({ listCollections: 1.0, nameOnly: true });
    return tickers;
  }
}
