import { useEffect, useState } from "react";
import { StockRepository } from "../../data/StockRepository";

type UseStockDataHook = (
  ticker: string
) => [boolean, string, any];

export const useStockData: UseStockDataHook = (ticker) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [repository] = useState(() => new StockRepository());

  useEffect(() => {
    repository
    .getStockData(ticker)
    .then((data: any) => {
      setData(data.data);
    })
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  return [loading, error, data];
}