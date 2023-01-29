
export interface IStockRepository {
  getStockData(ticker: string): Promise<any>;
}