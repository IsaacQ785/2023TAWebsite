export interface IStockRepository {
  getStockData(ticker: string): Promise<any>;
  getStockTickers(): Promise<any>;
}
