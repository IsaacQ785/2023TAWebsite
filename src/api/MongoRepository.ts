import { Response } from "express";
import { WithId } from "mongodb";
import { connectDB } from "./connect-db";
import { IEODPoint } from "./database-tasks/types/IEODPoint";
import { IMongoRepository } from "./IMongoRepository";

export class MongoRepository implements IMongoRepository {
  async getStockData(id: string, res: Response): Promise<WithId<IEODPoint>[]> {
    let db = await connectDB();
    let collection = db.collection("S&P500TickerData");
    let x = (await collection
      .find({ symbol: id })
      .toArray()) as WithId<IEODPoint>[];
    return x;
  }

  async getStockTickers(): Promise<string[]> {
    let db = await connectDB();
    let collection = db.collection("S&P500TickerData");
    return await collection.distinct("symbol");
  }
}
