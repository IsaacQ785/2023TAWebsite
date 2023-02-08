import { useEffect, useState } from "react";
import { StockRepository } from "../../data/StockRepository";
import { IStockDataPoint } from "./IStockDataPoint";

type UseStockDataHook = (
  ticker: string
) => [boolean, string, IStockDataPoint[]];

export const useStockData: UseStockDataHook = (ticker) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<IStockDataPoint[]>([]);
  const [repository] = useState(() => new StockRepository());

  useEffect(() => {
    repository
      .getStockData(ticker)
      .then((data) => {
        const stockData: IStockDataPoint[] = data.data
          .sort((a, b) => (a.date > b.date ? 1 : -1))
          .map((dataPoint) => [
            new Date(dataPoint.date).getTime(),
            dataPoint.open,
            dataPoint.high,
            dataPoint.low,
            dataPoint.close,
          ]);
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
