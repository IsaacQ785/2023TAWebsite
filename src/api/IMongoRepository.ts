import { Response } from "express";

export interface IMongoRepository {
  getStockData(id: string, res: Response): Promise<any>;
  getStockTickers(): Promise<any>;
}
