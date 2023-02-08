import { WithId } from "mongodb";
import { IEODPoint } from "../../api/database-tasks/types/IEODPoint";
import { IStockRepository } from "./IStockRepository";

export class StockRepository implements IStockRepository {
  async getStockData(ticker: string): Promise<{ data: WithId<IEODPoint>[] }> {
    return fetch(`http://localhost:8088/ticker/${ticker}`)
      .then((response) => {
        return response.json() as unknown as { data: WithId<IEODPoint>[] };
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  async getStockTickers() {
    return fetch("http://localhost:8088/tickers")
      .then((response: Response) => {
        return response.json() as unknown as { data: string[] };
      })
      .catch((err) => {
        throw Error(err);
      });
  }
}
