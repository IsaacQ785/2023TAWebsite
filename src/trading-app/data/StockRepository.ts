import { IStockRepository } from "./IStockRepository";

export class StockRepository implements IStockRepository {
  async getStockData(ticker: string): Promise<any> {
    return fetch(`http://localhost:8088/ticker/${ticker}`)
      .then((response: any) => {
        return response.json();
      })
      .catch((err) => {
        throw Error(err);
      });
  }
}
