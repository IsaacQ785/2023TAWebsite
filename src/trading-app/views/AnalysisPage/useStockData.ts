import { useEffect, useState } from "react";
import { StockRepository } from "../../data/StockRepository";

type UseStockDataHook = (
  ticker: string
) => [boolean, string, [number, number, number, number, number][]];

type IStockPoint = {
  Date: string;
  High: number;
  Low: number;
  "Close/Last": number;
  Volume: number;
  Open: number;
};

export const useStockData: UseStockDataHook = (ticker) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<[number, number, number, number, number][]>(
    []
  );
  const [repository] = useState(() => new StockRepository());

  useEffect(() => {
    repository
      .getStockData(ticker)
      .then((data: any) => {
        const stockData: [number, number, number, number, number][] = data.data
          .sort(
            (a: IStockPoint, b: IStockPoint) =>
              new Date(a.Date) > new Date(b.Date)
          )
          .map((dataPoint: IStockPoint) => [
            new Date(dataPoint.Date).getTime(),
            Number(dataPoint.Open),
            Number(dataPoint.High),
            Number(dataPoint.Low),
            Number(dataPoint["Close/Last"]),
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
