import { useEffect, useState } from "react";
import { StockRepository } from "../../data/StockRepository";

type UseStockDataHook = (ticker: string) => [boolean, string, any];

type IStockPoint = {
  Date: string;
  High: string;
  Low: string;
  "Close/Last": string;
  Volume: string;
  Open: string;
};

export const useStockData: UseStockDataHook = (ticker) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [repository] = useState(() => new StockRepository());

  useEffect(() => {
    repository
      .getStockData(ticker)
      .then((data: any) => {
        const stockData = data.data
          .sort(
            (a: IStockPoint, b: IStockPoint) =>
              new Date(a.Date) > new Date(b.Date)
          )
          .map((dataPoint: IStockPoint) => {
            return {
              x: new Date(dataPoint.Date),
              y: [
                dataPoint.Open,
                dataPoint.High,
                dataPoint.Low,
                dataPoint["Close/Last"],
              ],
            };
          });
        setData(stockData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ticker]);

  return [loading, error, data];
};
